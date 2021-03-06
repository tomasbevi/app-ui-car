import React  from 'react';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux'
import { StatusBar,  View , SafeAreaView } from 'react-native';
import { AntDesign} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Container, BackgroundImg, MenuBar, Back, MainContent, TitleContent, Text, Divider, BottomContent, TextTitulo } from './HistorialScreenStyle';

import SwipeButtonCustom from '../components/itemhistorial';

import {solicitudes as SolicitudHistorial} from '../graphql/querys.gql';


const HistorialScreen = () => {
    const navigation = useNavigation();
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
                            <AntDesign onPress={() => navigation.goBack()} name="arrowleft" size={24}/>
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
                        <AntDesign onPress={() => navigation.goBack()} name="arrowleft" size={24}/>
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