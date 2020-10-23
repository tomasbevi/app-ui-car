import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import LoginScreen from './app/screens/LoginScreen';
import SolicitarScreen from './app/screens/SolicitarScreen';
import YendoScreen from './app/screens/YendoScreen';
import HistorialScreen from './app/screens/HistorialScreen';

const Routes = () => (
   <Router>
      <Scene key = "root" hideNavBar>
         <Scene key = "login" component = {LoginScreen} title = "Login" intial={true}  />
         <Scene key = "solicitar" component = {SolicitarScreen} title = "Solicitar" />
         <Scene key = "yendo" component = {YendoScreen} title = "Yendo" />
         <Scene key = "historial" component = {HistorialScreen} title = "Historial" />
      </Scene>
   </Router>
)
export default Routes