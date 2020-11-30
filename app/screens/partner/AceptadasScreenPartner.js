import React , {useEffect} from 'react';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux'
import { StatusBar, Image, FlatList , View , SafeAreaView, TextInput , Button, Switch, TouchableWithoutFeedback, Alert} from 'react-native';
import  {AntDesign} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Container, BackgroundImg, MenuBar, Back, MainContent, TitleContent, Text, Divider, BottomContent, Items, ContenedorHistorial, TextTitulo } from './AceptadasScreenPartnerStyle';


import SwipeButtonCustom from '../../components/itemhistorialPartner';
import {solicitudesByPartnerAcepted} from '../../graphql/querys.gql';


const AceptadasScreen = () => {
    const navigation = useNavigation();

    //const estado = ['1', '2' , '3']
    var acceptedby = useSelector(state => state.user)
    var ciudade = useSelector(state => state.ciudades)
   
    const { data , loading, error } = useQuery(solicitudesByPartnerAcepted,  {
        variables: { "acceptedby": acceptedby}, pollInterval: 5
      })
    

   if(data){
    return (
        <Container>
            <StatusBar barStyle='dark-content'></StatusBar>
            <BackgroundImg source={require('../../assets/background.jpg')}>
                <SafeAreaView>
                    <MenuBar>
                        
                        
                        
                    </MenuBar>
                    <MainContent>
                        <TitleContent>
                            <TextTitulo title dark bold>Solicitudes Aceptadas <AntDesign name="bars" size={20} /></TextTitulo>
                            <Divider/>
                            <Text dark >Listado de las ultimas solicitudes que aceptaste</Text>
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
        <BackgroundImg source={require('../../assets/background.jpg')}>
            <SafeAreaView>
                <MenuBar>
                    <Back>
                        <AntDesign onPress={() => navigation.goBack()} name="arrowleft" size={24}/>
                    </Back>
                
                </MenuBar>
                <MainContent>
                        <TitleContent>
                            <TextTitulo title dark bold>Solicitudes Aceptadas <AntDesign name="bars" size={20} /></TextTitulo>
                            <Divider/>
                            <Text dark >Listado de las ultimas solicitudes que aceptaste</Text>
                        </TitleContent>
                </MainContent>
                <BottomContent>
                <View>  
                         <Text dark bold  >Todo muy tranquilo</Text>
                        <Text dark >Todavia no aceptaste ninguna solicitud.</Text>
                </View>
                </BottomContent>
            </SafeAreaView>
        </BackgroundImg>
    </Container>
       )
   }
}



export default AceptadasScreen;