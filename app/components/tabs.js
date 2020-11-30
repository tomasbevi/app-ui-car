import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


//IMPORT SCREENS
import HistorialScreen from '../screens/HistorialScreen';
import SolicitudScreen from '../screens/SolicitarScreen';
import DrawerContent from './drawer'

const Tab = createMaterialBottomTabNavigator();

 const Tabs = () => {

  return (
    <Tab.Navigator
      initialRouteName="Solicitudes"
      shifting={true}
      sceneAnimationEnabled={true}
      activeColor="#f0edf6"
      inactiveColor="#7C6724"
      barStyle={{ backgroundColor: '#D8BD39' }}
    >
      <Tab.Screen
        name="Perfil"
        component={DrawerContent}
        options={{
          tabBarIcon: 'account',
        }}
      />
      
      <Tab.Screen
        name="Solicitudes"
        component={SolicitudScreen}
        options={{
          tabBarIcon: 'book-plus',
        }}
      />

    <Tab.Screen
        name="Historial"
        component={HistorialScreen}
        options={{
          tabBarIcon: 'book-search',
        }}
      />
    </Tab.Navigator>
  );
};
export default Tabs