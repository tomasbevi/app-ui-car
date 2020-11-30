import React from 'react';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux'
import { StatusBar, Image, FlatList , View , SafeAreaView, TextInput , Button, Switch, TouchableWithoutFeedback, Alert} from 'react-native';
import  {AntDesign} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Container, BackgroundImg, MenuBar, Back, MainContent, TitleContent, Text, Divider, BottomContent, Items, ContenedorHistorial, TextTitulo } from './HistorialScreenPartnerStyle';


import SwipeButtonCustom from '../../components/itemhistorialPartner';
import {solicitudesByPartner} from '../../graphql/querys.gql';


const HistorialScreen = () => {
    const navigation = useNavigation();

    const estado = '0'
    var ciudade = useSelector(state => state.ciudades)
   
    const { data , loading, error } = useQuery(solicitudesByPartner,  {
        variables: {  "input": estado , "ciudades": ciudade}, pollInterval: 5
      })
      

   if(data){
    return (
        <Container>
            <StatusBar barStyle='dark-content'></StatusBar>
            <BackgroundImg source={require('../../assets/background.jpg')}>
                <SafeAreaView>
                    <MenuBar>
                        {/*}
                        <Back>
                            <AntDesign onPress={() => navigation.goBack()} name="arrowleft" size={24}/>
                        </Back>
                        {*/}
                    </MenuBar>
                    <MainContent>
                        <TitleContent>
                            <TextTitulo title dark bold>Solicitudes <AntDesign name="bars" size={20} /></TextTitulo>
                            <Divider/>
                            <Text dark  >Listado de solicitudes generadas por los usuarios.</Text>
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
                       <TextTitulo title dark bold>Solicitudes <AntDesign name="bars" size={20} /></TextTitulo>
                            <Divider/>
                            <Text dark  >Listado de solicitudes generadas por los usuarios.</Text>
                    </TitleContent>
                </MainContent>
                <BottomContent>
                <View>  
                         <Text dark bold  >Todo muy tranquilo</Text>
                        <Text dark >Parece que no hay usuarios que necesiten nada.</Text>
                </View>
                </BottomContent>
            </SafeAreaView>
        </BackgroundImg>
    </Container>
       )
   }
}



export default HistorialScreen;