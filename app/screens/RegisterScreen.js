import React , {useEffect, useState} from 'react';
import {StatusBar, Image, View , SafeAreaView , ScrollView , StyleSheet, Platform} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container, BackgroundImg, MainContent, ImagenLogo, BottomContent, Text, DividerEmpty, TextoInput, Boton1  } from './RegisterScreenStyle';
import RNPickerSelect  from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';

import {  useFormik  } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SpinnerC from "../components/Spineer"

import { useMutation , useQuery } from '@apollo/client';

import {register as UP_REGISTER} from '../graphql/mutations.gql';
import {ciudades as CIUDADES_QUERY} from '../graphql/querys.gql';


const RegisterScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const [mensaje , setMensaje] = useState(null)
    const  {data , loading, error}  = useQuery(CIUDADES_QUERY)
    let ciudadesarray = []
    if(data){
        const arreglo = data.ciudades
        arreglo.map((ciudad)=>
            ciudadesarray.push({label: ciudad.nombreCiudad, value: ciudad.id})
        )
    }
    

    const [ nuevoUsuario ] = useMutation(UP_REGISTER);

    const mostrarMensaje = () =>{
        return(
            <Text>{mensaje}</Text>
        )
    }
    
    const formik = useFormik({
            initialValues:  {
                ciudade:'',
                username:'',
                email:'',
                password:'',
                recontrasena:''
            },
            validationSchema: Yup.object({
                    ciudade: Yup.string().required('Por Favor selecciona ciudad.'),
                    email: Yup.string().email('Email invalido.'),
                    username: Yup.string().required('El nombre de usuario es obligatorio.'),
                    password: Yup.string().required('La contraseña es obligatoria.').min(6, 'La contraseña tiene que tener al menos 6 caracteres.'),
                    recontrasena: Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas deben ser iguales.')
            }),
            onSubmit: async values => {
                dispatch({type: 'set', spinner: true })
                const {email , username , password, ciudade } = values
                try { 
                    //setMensaje("Se genero con exito!")
                    await nuevoUsuario({
                        variables:{
                            email, password,username,ciudade
                        }
                     })
                    setTimeout(() =>{
                        setMensaje(null)
                    }, 2500)
                    //REDIRECCION A LOGIN
                    formik.resetForm()
                    navigation.push('Login')
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
                <SafeAreaView >
                    <MainContent style={styles.scrollView1}>
                        <ImagenLogo source={require('../assets/logo.png')} />
                    </MainContent>
                    <BottomContent style={styles.scrollView2}>
                      <KeyboardAwareScrollView style={{paddingRight:10}}>
                                {console.log(formik.errors)}
                                <Text dark >Ciudad * <Text style={{color:'red' , fontSize:13}}>{formik.errors.ciudade ?formik.errors.ciudade:""}</Text></Text>
                                <DividerEmpty x1/>
                                <RNPickerSelect
                                    placeholder={{label: 'Selecciona tu Ciudad', value:''}}
                                    Icon={() => {
                                        return <Ionicons  name="md-arrow-down" size={24} color="dark" />;
                                    }}
                                    style={{
                                        ...pickerSelectStyles,
                                        iconContainer: {
                                          top: 8,
                                          right: 10
                                        },
                                        placeholder: {
                                          color: '#000',
                                          fontSize: 12,
                                          fontWeight: 'bold',
                                        },
                                        
                                      }}
                                    useNativeAndroidPickerStyle={false}
                                    name="ciudade"
                                    id="ciudade" 
                                    onValueChange={formik.handleChange('ciudade')}
                                    items={ciudadesarray}
                                />
                                <Text dark >Nombre de usuario * <Text style={{color:'red' , fontSize:13}}>{formik.errors.username ?formik.errors.username:""}</Text></Text>
                                <DividerEmpty x1/>
                                <TextoInput tabIndex="-1" id="username" name="username"
                                 onChangeText={formik.handleChange('username')} onBlur={formik.handleBlur('username')} value={formik.values.username} dark large
                                 style={formik.errors.username ?{borderWidth:0.8 , borderColor:'red'}:""}
                                 />
                                <DividerEmpty x1/>
                                <Text dark >Email * <Text style={{color:'red' , fontSize:13}}>{formik.errors.email ?formik.errors.email:""}</Text></Text>
                                <DividerEmpty x1/>
                                <TextoInput tabIndex="1" id="email" name="email"
                                 onChangeText={formik.handleChange('email')}  value={formik.values.email} dark large
                                 style={formik.errors.email ?{borderWidth:0.8 , borderColor:'red'}:""}
                                  />
                                <DividerEmpty x1/>
                                <Text dark >Contraseña * <Text style={{color:'red' , fontSize:13}}>{formik.errors.password ?formik.errors.password:""}</Text></Text>
                                <DividerEmpty x1/>
                                <TextoInput tabIndex="2" id="password" name="password" useRef="password"  value={formik.values.password} onChangeText={formik.handleChange('password')} secureTextEntry={true} dark large 
                                style={formik.errors.password ?{borderWidth:0.8 , borderColor:'red'}:""}
                                />
                                <DividerEmpty x1/>
                                <Text dark >Repetir Contraseña * <Text style={{color:'red' , fontSize:13}}>{formik.errors.recontrasena ?formik.errors.recontrasena:""}</Text></Text>
                                <DividerEmpty x1/>
                                <TextoInput tabIndex="3" id="recontrasena" name="recontrasena" value={formik.values.recontrasena} onChangeText={formik.handleChange('recontrasena')} secureTextEntry={true} dark large
                                style={formik.errors.recontrasena ?{borderWidth:0.8 , borderColor:'red'}:""}
                                />
                                <DividerEmpty x2/>
                                {mensaje && mostrarMensaje()}
                                <BotonCustom title="Registrar" onPress={formik.handleSubmit}></BotonCustom>
                                 <DividerEmpty x1/>
                                <BotonCustom title="Login" onPress={() => navigation.push('Login')}></BotonCustom>
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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        backgroundColor: '#f1f1f1',
        fontSize: 16, 
        color: 'black',
        height:40,
        borderRadius:10,
        paddingLeft:10,
        marginBottom:10,
    },
    inputAndroid: {
        backgroundColor: '#f1f1f1',
        fontSize: 16, 
        color: 'black',
        height:40,
        borderRadius:10,
        paddingLeft:10,
        marginBottom:10 // to ensure the text is never behind the icon
    },
  });
export default RegisterScreen;