import styled from 'styled-components';
import {Platform} from 'react-native'
export const Container = styled.View`
    flex:1;
    background-color: #FFD740
`;
export const TextTitulo = styled.Text`
    color: ${(props) => props.dark ? "#000" : "#FFF"};
    font-weight: ${(props) => props.bold ? "bold" : "normal"};
    ${Platform.select({
        'ios':{
            fontSize:30
        }, 
        'android':{
            fontSize:20
        }
    })}
`;
export const Text = styled.Text`
    color: ${(props) => props.dark ? "#000" : "#FFF"};
    font-weight: ${(props) => props.bold ? "bold" : "normal"};
    ${Platform.select({
        'ios':{
            fontSize:20
        }
    })}
`;

export const BackgroundImg = styled.ImageBackground`
    width:100%;
    top:0;
    left:0
`;
export const MenuBar = styled.View`
    flex-direction: row-reverse;
    justify-content: space-between;
    padding:16px;
`;
const Back = styled.View`
    flex-direction: row;
    align-items: center;
`;
export const MainContent = styled.View`
    padding: 0 4%;
    margin: 3% 0 4% 0;
`;
export const TitleContent = styled.View`
margin-top:-10%
font-size:10px
`;
export const BottomContent = styled.View`
    background-color: #FFD740;
    padding: 30px 20px 0px 20px;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    
`;
export const Divider = styled.View`
    border-bottom-color: #000;
    border-bottom-width: 2px;
    width:150px;
    margin:8px 0;
`;
export const DividerEmpty = styled.View`
${({ x1, x2, x3 }) => {
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
export const Boton1 = styled.View`
    background-color: #30F9BB;
    margin-bottom:4px;
    height:50px;
`;
export const TextoInput = styled.TextInput`
    background-color:#fff;
    height:40px;
    border-radius:10px;
    padding-left:10px;
    padding-right:10px;
`;
