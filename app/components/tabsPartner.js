import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


//PARTNER IMPORT
import HistorialScreenPartner from '../screens/partner/HistorialScreenPartner';
import AceptadasScreenPartner from '../screens/partner/AceptadasScreenPartner';
import DrawerContent from './drawerPartner'

const Tab = createMaterialBottomTabNavigator();

 const BottomTabs = () => {

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
        component={HistorialScreenPartner}
        options={{
          tabBarIcon: 'book-search',
        }}
      />

    <Tab.Screen
        name="Aceptadas"
        component={AceptadasScreenPartner}
        options={{
          tabBarIcon: 'book-plus',
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomTabs