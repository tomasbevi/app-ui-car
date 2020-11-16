import styled from 'styled-components';

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
`;
export const MenuBar = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding:16px;
`;
export const Back = styled.View`
    flex-direction: row;
    align-items: center;
`;
export const MainContent = styled.View`
    padding: 0px 3%;
    margin: 1% 0 5% 0;
`;
export const TitleContent = styled.View``;
export const BottomContent = styled.View`
    background-color: #FFD740;
    padding: 20px 20px 0px 20px;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    
`;
export const Divider = styled.View`
    border-bottom-color: #000;
    border-bottom-width: 2px;
    width:150px;
    margin:8px 0;
`;
const DividerEmpty = styled.View`
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
export const ContenedorHistorial = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const SwipeItem = styled.View`
    margin-bottom:5px;
    margin-top:5px;
    padding-bottom:7px;
    padding-left:10px;
    justify-content: center;
    align-items: center;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    background-color: ${props => {
        switch (props.type) {
            case "1":
                return `#1F8933;`;
            case "2":
                return `#FBC02D;`;
            case "0":
                return `red;`;
        }
    }}
`;

