import React , {useEffect,  } from 'react';
import {StatusBar, Image, FlatList , View , SafeAreaView, TextInput , Button, Switch, TouchableWithoutFeedback, Alert} from 'react-native';
import styled from 'styled-components';
import  {AntDesign} from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';


const historialsolicitudes = 
(
        [
            {   
                id: '1',
                estado: 2,
                direccion: 'Ollavarria',
                altura: '1422',
                mensaje: 'Tocame bocina dos veces y salgo.',
                fecha: "14/10/2020"
            },
            {
                id: '2',
                estado: 1,
                direccion: 'Pellegrini',
                altura: '121',
                mensaje: '',
                fecha: "13/10/2020"
            },
            {
                id: '3',
                estado: 1,
                direccion: 'Buenos Aires',
                altura: '544',
                mensaje: 'Al lado de UDEM.',
                fecha: "11/10/2020"
            },
            {
                id: '4',
                estado: 1,
                direccion: 'Pellegrini',
                altura: '899',
                mensaje: '',
                fecha: "09/10/2020"
            }
        ]      
);

function HistorialScreen() {

    useEffect(() =>{
        
    }, []);
  
  
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
                            <FlatList
                                data={historialsolicitudes}
                                renderItem={({item}) => <Items type={item.estado}>
                                    <ContenedorHistorial>  
                                        <AntDesign style={{paddingTop:20}} name="infocirlce" size={24} color="black" />
                                        <Text dark large style={{marginLeft:10}}>{item.direccion} {item.altura} </Text>
                                    </ContenedorHistorial>
                                        <Text dark style={{marginLeft:35}}>{item.fecha}</Text>
                                    </Items>}
                            />
                    </View>
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

const ContenedorHistorial = styled.View`
    flex-direction: row;
    align-items: center;
`;

const Items = styled.View`
    margin-bottom:5px;
    margin-top:5px;
    padding-bottom:7px;
    padding-left:10px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    background-color: ${ props =>{
        switch (props.type) {
            case 1:
                return `#1F8933;`;
            case 2:
                return `#FBC02D;`;
            case 3:
                return `red;`;
        }
    }}
`;

export default HistorialScreen;