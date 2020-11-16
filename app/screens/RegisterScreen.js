import React , {useEffect, useState} from 'react';
import {StatusBar, Image, View , SafeAreaView , ScrollView , StyleSheet, Platform} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, BackgroundImg, MainContent, ImagenLogo, BottomContent, Text, DividerEmpty, TextoInput, Boton1  } from './RegisterScreenStyle';

import {  useFormik  } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SpinnerC from "../components/Spineer"

import { useMutation } from '@apollo/client';

import {register as UP_REGISTER} from '../graphql/mutations.gql';


const RegisterScreen = () => {
    const dispatch = useDispatch()

    const [mensaje , setMensaje] = useState(null)

    const [ nuevoUsuario ] = useMutation(UP_REGISTER);

    const mostrarMensaje = () =>{
        return(
            <Text>{mensaje}</Text>
        )
    }
    
    const formik = useFormik({
            initialValues:  {
                username:'',
                email:'',
                password:'',
                recontrasena:''
            },
            validationSchema: Yup.object({
                    email: Yup.string().email('Email invalido.'),
                    username: Yup.string().required('El nombre de usuario es obligatorio.'),
                    password: Yup.string().required('La contraseña es obligatoria.').min(6, 'La contraseña tiene que tener al menos 6 caracteres.'),
                    recontrasena: Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas deben ser iguales.')
            }),
            onSubmit: async values => {
                dispatch({type: 'set', spinner: true })
                const {email , username , password } = values

                try { 
                    //setMensaje("Se genero con exito!")
                    await nuevoUsuario({
                        variables:{
                            email, password,username
                        }
                     })
                    setTimeout(() =>{
                        setMensaje(null)
                    }, 2500)
                    //REDIRECCION A LOGIN
                    formik.resetForm()
                    Actions.login()
                    dispatch({type: 'set', spinner: false })
                    
                } catch (error) {
                    dispatch({type: 'set', spinner: false })
                    setMensaje("Ocurrio un Error")
                    setTimeout(() =>{
                        setMensaje(null)
                    }, 2500)
                }
             },
           });
return(
        <Container>
             <SpinnerC></SpinnerC>
            <StatusBar barStyle='dark-content'></StatusBar>
            <BackgroundImg source={require('../assets/background.jpg')}>
                <SafeAreaView>
                    <MainContent style={styles.scrollView1}>
                        <ImagenLogo source={require('../assets/logo.png')} />
                    </MainContent>
                    <BottomContent style={styles.scrollView2}>
                      <KeyboardAwareScrollView>
                                <Text dark >Nombre de usuario</Text>
                                <DividerEmpty x1/>
                                <TextoInput tabIndex="-1" id="username" name="username"
                                 onChangeText={formik.handleChange('username')} onBlur={formik.handleBlur('username')} value={formik.values.username} dark large
                                 style={formik.errors.email ?{borderWidth:0.8 , borderColor:'red'}:""}
                                 />
                                <DividerEmpty x1/>
                                <Text dark >Email</Text>
                                <DividerEmpty x1/>
                                <TextoInput tabIndex="1" id="email" name="email"
                                 onChangeText={formik.handleChange('email')}  value={formik.values.email} dark large
                                 style={formik.errors.email ?{borderWidth:0.8 , borderColor:'red'}:""}
                                  />
                                <DividerEmpty x1/>
                                <Text dark >Contraseña</Text>
                                <DividerEmpty x1/>
                                <TextoInput tabIndex="2" id="password" name="password" useRef="password"  value={formik.values.password} onChangeText={formik.handleChange('password')} secureTextEntry={true} dark large 
                                style={formik.errors.password ?{borderWidth:0.8 , borderColor:'red'}:""}
                                />
                                <DividerEmpty x1/>
                                <Text dark >Repetir Contraseña</Text>
                                <DividerEmpty x1/>
                                <TextoInput tabIndex="3" id="recontrasena" name="recontrasena" value={formik.values.recontrasena} onChangeText={formik.handleChange('recontrasena')} secureTextEntry={true} dark large
                                style={formik.errors.recontrasena ?{borderWidth:0.8 , borderColor:'red'}:""}
                                />
                                <DividerEmpty x2/>
                                {mensaje && mostrarMensaje()}
                                <BotonCustom title="Registrar" onPress={formik.handleSubmit}></BotonCustom>
                                 <DividerEmpty x1/>
                                <BotonCustom title="Login" onPress={() => Actions.login()}></BotonCustom>
                        </KeyboardAwareScrollView>
                    </BottomContent>
                      
                </SafeAreaView>
            </BackgroundImg>
        </Container>
)
    
}
//FIX SCROLL VIEW ANDROID IOS
const styles = StyleSheet.create({
    ...Platform.select({
        'android':{
            scrollView1: {
                height: '25%',
                width: '100%'
              },
              scrollView2: {
                  height: '75%',
                  width: '100%',
                  paddingBottom: 100
                }
        },
        'ios':{
            scrollView1: {
                height: '20%',
                width: '100%'
              },
              scrollView2: {
                  height: '80%',
                  width: '100%'
                }
        }
    })   
  });
export default RegisterScreen;