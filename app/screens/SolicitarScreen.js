import React , {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {StatusBar,SafeAreaView, StyleSheet} from 'react-native';
import  {AntDesign} from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { Container, BackgroundImg, MenuBar, MainContent, TitleContent, Text, Divider, BottomContent, DividerEmpty, TextoInput, TextTitulo, Boton1 } from './SolicitarScreenStyle';

import {  useFormik  } from 'formik';
import * as Yup from 'yup';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SpinnerC from "../components/Spineer"
import { useMutation } from '@apollo/client';
import {createSolicitude as SOLICITUD_MUTATION} from '../graphql/mutations.gql';

const SolicitarScreen = () => {
  const navigation = useNavigation();
  const [mensaje , setMensaje] = useState(null)
  
  const mostrarMensaje = () =>{
    return(
        <Text>{mensaje}</Text>
    )
}

  const [ solicitud ] = useMutation(SOLICITUD_MUTATION);
  
  const dispatch = useDispatch()
 
    const user = useSelector(state => state.user)
    const ciudades = useSelector(state => state.ciudades)
  
    const formikSolicitud = useFormik({
      initialValues:  {
          calle:'',
           altura:'',
           comentario:''
      },
      validationSchema: Yup.object({
              calle: Yup.string().required('Necesitamos la Calle'),
              altura: Yup.string().required('Necesitamos saber el número.'),
              comentario: Yup.string()
      }),
      onSubmit: async values => { 
             dispatch({type: 'set', spinner: true })
              const {calle , altura , comentario } = values
              try { 
                 //setMensaje("solicitando...")
                  const resultados = await solicitud({
                      variables: {
                        input:{
                            data:{
                              calle , altura , comentario, user , ciudades
                            }
                        }
                        }
                   })
                  const id = await resultados.data.createSolicitude.solicitude.id;
                  
                  setTimeout(() =>{
                    setMensaje(null)
                  }, 2500)
                  //REDIRECCION A SOLIOCITAR
                    dispatch({type: 'set', spinner: false })
                    formikSolicitud.resetForm()
                    navigation.navigate('Yendo',id)
                
              } catch (error) {
                  dispatch({type: 'set', spinner: false })
                  console.log(error)
                  console.log(error.message)
                  setMensaje("Ocurrio un Error")
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
                <SafeAreaView >
                    <MenuBar>
                      {/*}
                        <FontAwesome5 onPress={() => navigation.push("Historial")} name="bars" size={24}/>
                      {*/}
                    </MenuBar>
                    <MainContent style={styles.scrollView1}>
                        <TitleContent>
                            <TextTitulo dark bold>Solicitar Auto <AntDesign name="check" size={22} /></TextTitulo>
                            <Divider/>
                            <Text dark  bold>Completá los datos y te enviamos un auto</Text>
                        </TitleContent>
                    </MainContent>
                    <BottomContent style={styles.scrollView2}>
                      <KeyboardAwareScrollView>
                                <Text dark  bold>Calle * <Text style={{color:'red' , fontSize:13}}>{formikSolicitud.errors.calle ?formikSolicitud.errors.calle:""}</Text></Text>
                                <DividerEmpty x1/>
                                <TextoInput dark large 
                                id="calle"
                                name="calle"
                                onChangeText={formikSolicitud.handleChange('calle')} 
                                onBlur={formikSolicitud.handleBlur('calle')} 
                                value={formikSolicitud.values.calle}
                                style={formikSolicitud.errors.calle ?{borderWidth:0.8 , borderColor:'red'}:""}
                                />
                                
                                <DividerEmpty x1/>
                                <Text dark  bold>Altura * <Text style={{color:'red' , fontSize:13 }}>{formikSolicitud.errors.altura ?formikSolicitud.errors.altura:""}</Text></Text>
                                <DividerEmpty x1/>
                                <TextoInput dark large 
                                id="altura"
                                name="altura"
                                onChangeText={formikSolicitud.handleChange('altura')} 
                                onBlur={formikSolicitud.handleBlur('altura')} 
                                value={formikSolicitud.values.altura}
                                style={formikSolicitud.errors.altura ?{borderWidth:0.8 , borderColor:'red'}:""}
                                />
                                
                                <DividerEmpty x1/>
                                <Text dark  bold>Comentario Extra</Text>
                                <DividerEmpty x1/>
                                <TextoInput dark large
                                id="comentario"
                                name="comentario"
                                onChangeText={formikSolicitud.handleChange('comentario')} 
                                onBlur={formikSolicitud.handleBlur('comentario')}
                                value={formikSolicitud.values.comentario}
                                />
                                <DividerEmpty x2/>
                                  <BotonCustom onPress={formikSolicitud.handleSubmit} title="Solicitar" ></BotonCustom>
                                 <DividerEmpty x1/>
                                 
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
              paddingTop:40,
              height: '10%',
              width: '100%'
            },
            scrollView2: {
                height: '90%',
                width: '100%',
                paddingBottom: 200
              }
      },
      'ios':{
          scrollView1: {
              height: '8%',
              width: '100%'
            },
            scrollView2: {
                height: '92%',
                width: '100%'
              }
      }
  })   
});

export default SolicitarScreen;