import styled from 'styled-components';
export const Container = styled.View`
    flex:1;
    background-color: #FFD740
`;
export const Text = styled.Text`
    color: ${(props) => props.dark ? "#000" : "#FFF"};
    font-weight:bold;
    ${({ title, large, small, smalllarge }) => {
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
export const BackgroundImg = styled.ImageBackground`
    width:100%;
`;
export const ImagenLogo = styled.Image`
    width:100%;
    height:150px;
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
export const MainContent = styled.View`
    padding: 0 29%;
    margin: 3% 0 2% 0;
   
`;
export const BottomContent = styled.View`
    background-color: #FFD740;
    padding: 20px 20px 0px 20px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    
`;
const Divider = styled.View`
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
export const Boton1 = styled.Button`
    background-color: #30F9BB;
    height:100px;
`;
export const TextoInput = styled.TextInput`
    background-color:#fff;
    height:40px;
    border-radius:10px;
    padding-left:10px;
    padding-right:10px;
`;

