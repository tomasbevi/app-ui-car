import React , {useEffect } from 'react';

import {setContext} from 'apollo-link-context'
import { gql , useQuery } from '@apollo/client';
import { useSelector } from 'react-redux'
import {StatusBar, Image, FlatList , View , SafeAreaView, TextInput , Button, Switch, TouchableWithoutFeedback, Alert} from 'react-native';
import  {AntDesign} from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import { Container, BackgroundImg, MenuBar, Back, MainContent, TitleContent, Text, Divider, BottomContent, Items, ContenedorHistorial, TextTitulo } from './HistorialScreenStyle';

import SwipeButtonCustom from '../components/itemhistorial';

import {solicitudes as SolicitudHistorial} from '../graphql/querys.gql';


const HistorialScreen = () => {
    

    const user = useSelector(state => state.user)
   
    const { data , loading, error } = useQuery(SolicitudHistorial,  {
        variables: { user }, pollInterval: 5
      })
      
   function verEstado(data){
       console.log(data)
   }
  
   if(data){
    return (
        <Container>
            <StatusBar barStyle='dark-content'></StatusBar>
            <BackgroundImg source={require('../assets/background.jpg')}>
                <SafeAreaView>
                    <MenuBar>
                        <Back>
                            <AntDesign onPress={Actions.pop} name="arrowleft" size={24}/>
                        </Back>
                    
                    </MenuBar>
                    <MainContent>
                        <TitleContent>
                            <TextTitulo title dark bold>Historial <AntDesign name="bars" size={20} /></TextTitulo>
                            <Divider/>
                            <Text dark smalllarge bold>Estas son tus ultimas solicitudes.</Text>
                        </TitleContent>
                    </MainContent>
                    <BottomContent>
                    <View>
                        <SwipeButtonCustom data={data}/>
                    </View>
                    </BottomContent>
                </SafeAreaView>
            </BackgroundImg>
        </Container>
    )}else{
       return ( 
        <Container>
        <StatusBar barStyle='dark-content'></StatusBar>
        <BackgroundImg source={require('../assets/background.jpg')}>
            <SafeAreaView>
                <MenuBar>
                    <Back>
                        <AntDesign onPress={Actions.pop} name="arrowleft" size={24}/>
                    </Back>
                
                </MenuBar>
                <MainContent>
                    <TitleContent>
                        <Text title dark >Historial <AntDesign name="bars" size={20} /></Text>
                        <Divider/>
                        <Text dark smalllarge>Estas son tus ultimas solicitudes.</Text>
                    </TitleContent>
                </MainContent>
                <BottomContent>
                <View>
                        <Text>Cargando...</Text>
                </View>
                </BottomContent>
            </SafeAreaView>
        </BackgroundImg>
    </Container>
       )
   }
}



export default HistorialScreen;