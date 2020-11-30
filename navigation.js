import React from 'react';
import { useSelector  } from 'react-redux'
import * as SecureStore from 'expo-secure-store';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';


//MENUES TABS
import BottomTabs from './app/components/tabsPartner'
import Tabs from './app/components/tabs'

//PANTALLAS
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import YendoScreen from './app/screens/YendoScreen';
import EditarPerfil from './app/screens/EditarPerfil';

//PARTNER IMPORT
import YendoScreenPartner from './app/screens/partner/YendoScreenPartner';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const RootNavigator = () => {

    var logged = useSelector(state => state.session)
    var user = useSelector(state => state.user)
    var token = useSelector(state => state.token)
    var partner = useSelector(state => state.partner)
    var ciudade = useSelector(state => state.ciudades)
    var userdata = useSelector(state => state.userdata)
   // console.log(userdata)

    if(logged=='false' || logged==false || logged==null){
        async function resetToken(){
              try {
              //VACIO EL TOKEN EN EL LOCAL STORAGE
                 await SecureStore.deleteItemAsync('token')
              } catch(e) {
              console.log(e)
              }
           }
        resetToken()
   }

   if(logged=='true') {
    if(partner == 'true') {
          //USUARIO PARTNER LOGEADO         
          return (
            <PaperProvider>
                <NavigationContainer>
                            <Stack.Navigator initialRouteName="BottomTabs" screenOptions={{ headerShown: false}}>
                                <Stack.Screen name="BottomTabs" component={BottomTabs}/>
                                <Stack.Screen name="YendoPartner" component={YendoScreenPartner}/>
                                <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
                            </Stack.Navigator>
                </NavigationContainer>
            </PaperProvider>
          )
    }else{
          //USUARIO NORMAL LOGEADO
          return (
            <PaperProvider>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="BottomTabs" screenOptions={{ headerShown: false}}>
                        <Stack.Screen name="BottomTabs" component={Tabs}/>
                        <Stack.Screen name="Yendo" component={YendoScreen} />
                        <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
                    </Stack.Navigator>
                </NavigationContainer>
            </PaperProvider>
          )
    }
 }else{
     //CUANDO NO ESTA LOGEADO
    return (
        <PaperProvider>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false}}>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    )
 }

}
export default RootNavigator

