import React , {useState } from 'react';
import {StatusBar, SafeAreaView, } from 'react-native';
import  {AntDesign} from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Actions } from 'react-native-router-flux';
import { Container, BackgroundImg, MenuBar, Back, MainContent, TitleContent, Text, Divider, BottomContent , TextTitulo} from './YendoScreenStyle';
import { useQuery } from '@apollo/client';
import { useDispatch } from 'react-redux'
import DetailsYendo from "../components/DetailsYendo"

import {solicitudesById as RESULTADOS_SOLICITUDE} from '../graphql/querys.gql';

/*

Tipo de estados de la solicitud

0 - Solicitada (Esperando confirmación)  Verde / Quiero Cancelar
1 - Aceptada (Aceptada, en camino) Verde / LLego y Quiero Cancealr
3 - Finalizada (Cuando concluye) Amarillo / 0 botones
4 - Cancelada (Se cancela y no se completa) Rojo / 0 botones

;*/


const YendoScreen = (props) => {
  const dispatch = useDispatch()
  const id = props.data
  !id ? Actions.solicitar() : ''
  const { data , loading, error } = useQuery(RESULTADOS_SOLICITUDE,  {
    variables: { id }, pollInterval: 5
  })

    loading ? dispatch({type: 'set', spinner: true }) :  dispatch({type: 'set', spinner: false })

    let [colorfondo , changecolor] = useState("#1F8933");
    

    if(data){
    const variable = data.solicitudes[0].estado;
    let {color, tituloestado, texto}=""
    switch (variable) {
      case "0":
        color="#449e44";
        tituloestado="Esperando Confirmación";
        texto="Su solicitud fue enviada, a la espera de confirmación.";
      break;
      case "1":
        color="#449e44";
        tituloestado="En Camino";
        texto="Llega aproximadamente en 20 minutos.";
      break;
      case "2":
        color="#FBC02D";
        tituloestado="Finalizado";
        texto="Este viaje finalizo.";
      break;
      case "3":
        color="#d4d4d4";
        tituloestado="Cancelado";
        texto="El viaje fue cancelado.";
      break;
    }
    return (
        <Container style={{backgroundColor:color}}>
            <StatusBar barStyle='dark-content'></StatusBar>
            <BackgroundImg source={require('../assets/background.jpg')}>
                <SafeAreaView>
                    <MenuBar>
                        <Back>
                            <AntDesign onPress={Actions.pop} name="arrowleft" size={24}/>
                        </Back>
                        <FontAwesome5 onPress={Actions.historial} name="bars" size={24}/>
                    </MenuBar>
                    <MainContent>
                        <TitleContent>
                            <TextTitulo bold dark >{tituloestado} <AntDesign name="check" size={20} /></TextTitulo>
                            <Divider/>
                            <Text dark smalllarge>{texto}</Text>
                        </TitleContent>
                    </MainContent>
                    <BottomContent style={{backgroundColor:color}}>
                      <DetailsYendo
                      data={data.solicitudes[0]}
                      />
                    </BottomContent>
                </SafeAreaView>
            </BackgroundImg>
        </Container>
    );
    }else{
      return ( <Container style={{backgroundColor:colorfondo}}>
        <StatusBar barStyle='dark-content'></StatusBar>
        <BackgroundImg source={require('../assets/background.jpg')}>
            <SafeAreaView>
                <MenuBar>
                    <Back>
                        <AntDesign onPress={Actions.pop} name="arrowleft" size={24}/>
                    </Back>
                    <FontAwesome5 onPress={Actions.historial} name="bars" size={24}/>
                </MenuBar>
                <MainContent>
                    <TitleContent>
                        <Text onPress={() => changecolor(colorfondo = "#FBC02D")} title dark >Cargando... <AntDesign name="check" size={20} /></Text>
                        <Divider/>
                        <Text dark smalllarge>Cargando...</Text>
                    </TitleContent>
                </MainContent>
                <BottomContent style={{backgroundColor:colorfondo}}>
                
                </BottomContent>
            </SafeAreaView>
        </BackgroundImg>
    </Container>)
    }
}


export default YendoScreen;