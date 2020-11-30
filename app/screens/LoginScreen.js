import React, {useState , useEffect } from 'react';
import {StatusBar, SafeAreaView, StyleSheet} from 'react-native';
import  BotonCustom  from '../components/Botton';
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { Container, BackgroundImg, MainContent, ImagenLogo, BottomContent, Text, DividerEmpty, TextoInput, Boton1 } from './LoginScreenStyle';
import { Feather } from '@expo/vector-icons'; 
import {  useFormik  } from 'formik';
import * as Yup from 'yup';

import * as SecureStore from 'expo-secure-store';

import SpinnerC from "../components/Spineer"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useMutation } from '@apollo/client';


import {login as LOGIN_MUTATION} from '../graphql/mutations.gql';

const LoginScreen = () => {

    const navigation = useNavigation();
 
    const dispatch = useDispatch()

    const [mensaje , setMensaje] = useState(null)

    const [ login_usuario ] = useMutation(LOGIN_MUTATION);

    const mostrarMensaje = () =>{
        return(
            <Text>
                <Feather name="alert-circle" size={24} color="red" />
                <Text style={{color:'red'}}>{mensaje}</Text>
            </Text>
        )
    }

    const formik = useFormik({
        initialValues:  {
            email:'',
             contrasena:'',
        },
        validationSchema: Yup.object({
                email: Yup.string().email('Email invalido.').required('El email es obligatoria.'),
                contrasena: Yup.string().required('La contraseña es obligatoria.').min(6, 'La contraseña tiene que tener al menos 6 caracteres.'),
        }),
        onSubmit: async values => {
            dispatch({type: 'set', spinner: true })

            const password = values.contrasena 
            const slug = values.email
   
            try { 
                const resultados = await login_usuario({
                    variables: { 
                       slug , password
                      }
                 })
                const token = await resultados.data.login.jwt
                const user = await resultados.data.login.user.id
                const partner = await resultados.data.login.user.partner
                const ciudades = await resultados.data.login.user.ciudade.id
                partner==false ? dispatch({type: 'set', partner: 'false' }) : dispatch({type: 'set', partner: 'true' })
                dispatch({type: 'set', userdata: resultados.data.login.user })
                dispatch({type: 'set', user: user })
                dispatch({type: 'set', token: token })
                dispatch({type: 'set', ciudades: ciudades })
                await SecureStore.setItemAsync('token',token);

                //REDIRECCION A SOLIOCITAR
                //navigation.reset()
                dispatch({type: 'set', session: 'true' })
                formik.resetForm()
                setMensaje(null)
                dispatch({type: 'set', spinner: false })
                
                  
            } catch (error) {
                setMensaje("Verifique si los campos son correctos.")
                console.log(error)
                dispatch({type: 'set', spinner: false })
                setTimeout(() =>{
                    setMensaje(null)
                }, 2500)
            }
         },
       });

    return (
        <Container>
            <SpinnerC></SpinnerC>
            <StatusBar barStyle='dark-content'></StatusBar>
            <BackgroundImg source={require('../assets/background.jpg')}>
                <SafeAreaView>
                    <MainContent style={styles.scrollView1}>
                        <ImagenLogo source={require('../assets/logo.png')} />
                    </MainContent>
                    <BottomContent style={styles.scrollView2}>
                      <KeyboardAwareScrollView style={{paddingRight:13}}>
                            <Text dark smalllarge>Email * <Text style={{color:'red' , fontSize:13}}>{formik.errors.email ?formik.errors.email:""}</Text></Text>
                            <DividerEmpty x1/>
                            <TextoInput id="email" name="email"  dark large
                             onChangeText={formik.handleChange('email')} 
                             onBlur={formik.handleBlur('email')} 
                             value={formik.values.email}
                             style={formik.errors.email ?{borderWidth:0.8 , borderColor:'red'}:""}
                            />
                            <DividerEmpty x1/>
                            <Text dark smalllarge>Contraseña * <Text style={{color:'red' , fontSize:13}}>{formik.errors.contrasena ?formik.errors.contrasena:""}</Text></Text>
                            <DividerEmpty x1/>
                            <TextoInput secureTextEntry={true} dark large id="contrasena" name="contrasena"   
                            value={formik.values.contrasena} 
                            onChangeText={formik.handleChange('contrasena')} 
                            secureTextEntry={true}
                            style={formik.errors.contrasena ?{borderWidth:0.8 , borderColor:'red'}:""}
                            />
                            {mensaje && mostrarMensaje()}
                            <DividerEmpty x2/>
                            <BotonCustom title="Ingresar" onPress={formik.handleSubmit}></BotonCustom>
                            <DividerEmpty x1/>
                            <BotonCustom title="Registrar" onPress={() => navigation.push('Register')}></BotonCustom>
                            <DividerEmpty x1/>
                            {/*}
                            <BotonCustom title="Notification" onPress={async () => await sendNotifications()}></BotonCustom>
                            <DividerEmpty x1/>
                            {*/}
                            </KeyboardAwareScrollView>
                    </BottomContent>
                </SafeAreaView>
            </BackgroundImg>
        </Container>
    );
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

export default LoginScreen;