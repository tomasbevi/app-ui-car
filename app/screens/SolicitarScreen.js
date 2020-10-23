import React , {useEffect, useRef} from 'react';
import {StatusBar, Image, View , SafeAreaView, TextInput , Button, Switch, ScrollView, Alert} from 'react-native';
import styled from 'styled-components';
import  {AntDesign} from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Actions } from 'react-native-router-flux';

function SolicitarScreen() {

    const firstDireccionRef = useRef(null);
    const firstAlturaRef = useRef(null);


    useEffect(() =>{
        firstDireccionRef.current.focus();
    }, []);

   

    const botonSolicitar = () =>
    Alert.alert(
      "Solicitar Auto",
      "Estas seguro que queres enviar un auto a la dirección " ,
      [
        {
          text: "No",
          onPress: () => console.log("Cancelo!"),
          style: "cancel"
        },
        { text: "Si", onPress: () => Actions.yendo() }
      ],
      { cancelable: false }
    );
  
    return (
        <Container>
            <StatusBar barStyle='dark-content'></StatusBar>
            <BackgroundImg source={require('../assets/background.jpg')}>
                <SafeAreaView>
                    <MenuBar>
                        <FontAwesome5 onPress={Actions.historial} name="bars" size={24}/>
                    </MenuBar>
                    <MainContent>
                        <TitleContent>
                            <Text title dark >Solicitar Auto <AntDesign name="check" size={20} /></Text>
                            <Divider/>
                            <Text dark smalllarge>Completá los datos y te enviamos un auto</Text>
                        </TitleContent>
                    </MainContent>
                    <BottomContent>
                        <ScrollView>
                                <Text dark smalllarge>Calle *</Text>
                                <DividerEmpty x1/>
                                <TextoInput dark large ref={firstDireccionRef}></TextoInput>
                                <DividerEmpty x1/>
                                <Text dark smalllarge >Altura *</Text>
                                <DividerEmpty x1/>
                                <TextoInput dark large ref={firstAlturaRef}></TextoInput>
                                <DividerEmpty x1/>
                                <Text dark smalllarge>Comentario Extra</Text>
                                <DividerEmpty x1/>
                                <TextoInput dark large></TextoInput>
                                <DividerEmpty x2/>
                                <Boton1 onPress={botonSolicitar} title="Solicitar"/>
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
    flex-direction: row-reverse;
    justify-content: space-between;
    padding:16px;
`;

const Back = styled.View`
    flex-direction: row;
    align-items: center;
`;

const MainContent = styled.View`
    padding: 0 32px;
    margin: 10px 0 20px 0;
`;

const TitleContent = styled.View``;

const BottomContent = styled.View`
    background-color: #FFD740;
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

const TextoInput = styled.TextInput`
    background-color:#fff;
    height:40px;
    border-radius:40px;
    padding-left:10px;
    padding-right:10px;
`;

export default SolicitarScreen;