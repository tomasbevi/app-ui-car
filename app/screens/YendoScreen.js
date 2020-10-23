import React , {useState , useEffect} from 'react';
import {StatusBar, Image, View , SafeAreaView, TextInput , Button, Switch, ScrollView, Alert} from 'react-native';
import styled from 'styled-components';
import  {AntDesign} from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Actions } from 'react-native-router-flux';
const solicitud = 
(               
    {id: '1',
    estado: 2,
    direccion: 'Ollavarria',
    altura: '1422',
    mensaje: 'Tocame bocina dos veces y salgo.',
    fecha: "14/10/2020"}
);

function YendoScreen(props) {
    
    let [colorfondo , changecolor] = useState("#1F8933");
    
    const botonLlego = () =>
    Alert.alert(
      "Ya llego?",
      "Avisanos si ya te pasaron a buscar!",
      [
        {
          text: "No",
          onPress: () => console.log("Nada"),
          style: "cancel"
        },
        { text: "Si", onPress: () => Actions.solicitar() }
      ],
      { cancelable: false }
    );

    const botonCancelar = () =>
    Alert.alert(
      "Cancelar Auto",
      "Estas seguro que queres cancelar?",
      [
        {
          text: "No",
          onPress: () => console.log("No Cancelo!"),
          style: "cancel"
        },
        { text: "Si", onPress: () => Actions.solicitar()  }
      ],
      { cancelable: false }
    );

    
    return (
        <Container style={{backgroundColor:colorfondo}}>
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
                            <Text onPress={() => changecolor(colorfondo = "#FBC02D")} title dark >En Camino <AntDesign name="check" size={20} /></Text>
                            <Divider/>
                            <Text dark smalllarge>Llega en aproximadamente 20 minutos</Text>
                        </TitleContent>
                    </MainContent>
                    <BottomContent style={{backgroundColor:colorfondo}}>
                    <ScrollView onScroll={console.log("test")}>
                            <Text dark smalllarge>Te estámos yendo a buscar a la dirección</Text>
                            <DividerEmpty x1/>
                             <Text dark large><AntDesign name="check" size={15} /> {solicitud.direccion} {solicitud.altura} - Dolores</Text>
                            <DividerEmpty x2/>
                            <Boton1  onPress={botonLlego} title="Ya Llego!"/>
                            <DividerEmpty x1/>
                            <Boton1  onPress={botonCancelar} title="Quiero Cancelar"/>
                    </ScrollView>
                    </BottomContent>
                </SafeAreaView>
            </BackgroundImg>
        </Container>
    );
}


const Container = styled.View`
    flex:1;
    background-color: #FFD740
`;
const Text = styled.Text`
    color: ${(props) => props.dark ? "#000" : "#FFF"};

   
    ${({title , large , small , smalllarge}) =>{
        switch (true) {
            case title:
                return `font-size:30px;`;
            case large:
                return `font-size:20px;`;
            case smalllarge:
                return `font-size:15px;`;
            case small:
                return `font-size:13px;`;
        }
    }}
`;
const BackgroundImg = styled.ImageBackground`
    width:100%;
`;

const MenuBar = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding:16px;
`;

const Back = styled.View`
    flex-direction: row;
    align-items: center;
`;

const MainContent = styled.View`
    padding: 0 32px;
    margin: 200px 0 30px 0;
`;

const TitleContent = styled.View``;

const BottomContent = styled.View`
        padding: 40px 20px 0px 20px;
        border-top-left-radius: 40px;
        border-top-right-radius: 40px;
`;

const Divider = styled.View`
    border-bottom-color: #000;
    border-bottom-width: 2px;
    width:150px;
    margin:8px 0;
`;
const DividerEmpty = styled.View`
${({x1 , x2 , x3}) =>{
    switch (true) {
        case x1:
            return `margin:5px;`;
        case x2:
            return `margin:10px;`;
        case x3:
            return `margin:15px;`;
    }
}}
    
`;

const Boton1 = styled.Button`
    background-color: #30F9BB;
    height:100px;
`;



export default YendoScreen;