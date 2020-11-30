import React from 'react';
import { View, StyleSheet} from 'react-native';
import {DrawerItem,DrawerContentScrollView} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { useTheme, Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple,Switch} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector , useDispatch  } from 'react-redux'
import * as SecureStore from 'expo-secure-store';


const DrawerContent = (props) => {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  var userdata = useSelector(state => state.userdata)


  const removeValue = async () => {
    try {
      //VACIO EL TOKEN EN EL LOCAL STORAGE
       await SecureStore.deleteItemAsync('token')
       //VACIO EL STORE
       dispatch({type: 'set', session: 'false' })
       dispatch({type: 'set', user: '' })
       dispatch({type: 'set', token: '' })
       dispatch({type: 'set', ciudades: '' })
       dispatch({type: 'set', partner: 'false' })
       dispatch({type: 'set', userdata: {} })
    } catch(e) {
      console.log(e)
    }
  }


  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
        <Title style={styles.title}>{userdata?.username}</Title>
          <Caption style={styles.caption}>{userdata?.email}</Caption>
          <Caption style={styles.caption}>{userdata?.ciudade?.nombreCiudad}  /  {!userdata?.partner==true?"Estado: Cliente":"Estado: Partner"}</Caption>
        </View>
        <Drawer.Section style={styles.drawerSection} title="Menú">
          <DrawerItem icon={({ color, size }) => (
              <MaterialCommunityIcons name="book-search"
                color={color}
                size={size}
              />
            )}
            label="Busqueda Solicitudes"
            onPress={() => navigation.navigate('Solicitudes')}
          />
          
          <DrawerItem icon={({ color, size }) => (
              <MaterialCommunityIcons name="book-plus" color={color} size={size} />
            )}
            label="Solicitudes Aceptadas"
            onPress={() => navigation.navigate('Aceptadas')}
          />
          
        </Drawer.Section>
        <Drawer.Section title="Perfil">

        <DrawerItem icon={({ color, size }) => (
              <MaterialCommunityIcons name="account-edit" color={color} size={size} />
            )}
            label="Editar mis datos"
            onPress={() => navigation.navigate('EditarPerfil')}
          />
          {/*}
          <TouchableRipple onPress={() => {}}>
            <View style={styles.preference}>
              <Text>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch value={false} />
              </View>
            </View>
          </TouchableRipple>
          {*/}
        </Drawer.Section>
        <Drawer.Section>
        <DrawerItem icon={({ color, size }) => (
              <MaterialCommunityIcons name="logout" color={color} size={size} />
            )}
            label="Salir"
            onPress={() => removeValue()}
          />
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );

}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default DrawerContent