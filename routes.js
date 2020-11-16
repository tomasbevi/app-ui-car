import React , {useEffect, useState } from 'react';
import { Router, Scene , Stack, Drawer } from 'react-native-router-flux';
import { View} from 'react-native'
import { useSelector  } from 'react-redux'
import * as SecureStore from 'expo-secure-store';

import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import SolicitarScreen from './app/screens/SolicitarScreen';
import YendoScreen from './app/screens/YendoScreen';
import HistorialScreen from './app/screens/HistorialScreen';



const Routes = () => {


   var logged = useSelector(state => state.session)
   var user = useSelector(state => state.user)
   var token = useSelector(state => state.token)


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
   return (
      <Router>
         <Scene hideNavBar >
            <Stack key = "root" hideNavBar={true}>
               <Scene drawer={true} key = "solicitar" component = {SolicitarScreen} intial={true}  title = "Solicitar" />
                <Scene drawer={true} key = "yendo" component = {YendoScreen} title = "Yendo" />
               <Scene drawer={true} key = "historial" component = {HistorialScreen} title = "Historial" />
      
            </Stack>
         </Scene>
      </Router>

   )
   }else{
      return (
         <Router>
            <Scene key = "root" hideNavBar >
               <Stack hideNavBar={true}>
                     <Scene key = "login" component = {LoginScreen} title = "Login" intial={true} back={false} />
                     <Scene key = "register" component = {RegisterScreen} title = "Register" back={false}  />
               </Stack>
            </Scene>
         </Router>

      )
   }
 
}
export default Routes