import React , {useEffect} from 'react';
import { View, StyleSheet} from 'react-native';
import {DrawerItem,DrawerContentScrollView} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { useTheme, Avatar,TextInput, Title, Caption, Paragraph, Drawer, Text, TouchableRipple,Switch} from 'react-native-paper';
import RNPickerSelect  from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import { useSelector , useDispatch  } from 'react-redux'
import { useMutation , useQuery } from '@apollo/client';
import  BotonCustom  from '../components/Botton';
import {  useFormik  } from 'formik';
import * as Yup from 'yup';

import {updateUser as USER_UPDATE} from '../graphql/mutations.gql';
import {user as USER_QUERY} from '../graphql/querys.gql';
import {ciudades as CIUDADES_QUERY} from '../graphql/querys.gql';

//import { useIsFocused } from '@react-navigation/native'

const EditarPerfil = (props) => {
  
  // const isFocused = useIsFocused()
  const dispatch = useDispatch()
  const navigation = useNavigation();

  let data = useQuery(CIUDADES_QUERY)
  let ciudadesarray = []
  if(data){
      let arreglo = data.data.ciudades
      arreglo.map((ciudad)=>
          ciudadesarray.push({label: ciudad.nombreCiudad, value: ciudad.id})
      )
  }

  var userdata = useSelector(state => state.userdata)
  var user = useSelector(state => state.user)
  
  const [ updateduser ] = useMutation(USER_UPDATE);

  data = useQuery(USER_QUERY,  {
    variables: {  user }
  })
  let { username , email } = data.data.user;
  const ciudade = data.data.user.ciudade.id;
  /*useEffect(() => {
    console.log('entro')
} , [isFocused])
*/
const formik = useFormik({
  initialValues:  {
      ciudade,
      username,
      email,
  },
  validationSchema: Yup.object({
          username: Yup.string().required('El nombre de usuario es obligatorio.'),
          email: Yup.string().email('Email invalido.'),
  }),
  onSubmit: async values => {
      dispatch({type: 'set', spinner: true })
      const {email , username , ciudade } = values
      try { 
          //setMensaje("Se genero con exito!")
         const resultado = await updateduser({
              variables:{
                input: {
                  data: {
                    email, username, ciudade
                  },
                  where: {
                    id: user
                  }
                }
              }
           })
          
          dispatch({type: 'set', userdata:resultado.data.updateUser.user})  
           
        //  setTimeout(() =>{
            //  setMensaje(null)
       //   }, 2500)
          //REDIRECCION A LOGIN
          navigation.goBack()
          dispatch({type: 'set', spinner: false })
          
      } catch (error) {
          console.log(error)
          dispatch({type: 'set', spinner: false })
          //setMensaje("Ocurrio un Error")
          //setTimeout(() =>{
              //setMensaje(null)
        //  }, 2500)
      }
   },
 });

 const envioUpdate = () => {
  formik.handleSubmit()
 }

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
       
        <View style={styles.userInfoSection}>
         
         <Title style={styles.title}>Editar mis datos</Title>
        
        </View>
        <Drawer.Section style={styles.drawerSection}>
        <TextInput 
              id="username"
              name="username"
              label="Usuario"
              onChangeText={formik.handleChange('username')} 
              onBlur={formik.handleBlur('username')} 
              value={formik.values.username}
              style={[styles.textinput , formik.errors.username ?{borderWidth:0.8 , borderColor:'red'}:""]}
              />
          <TextInput 
              id="email"
              name="email"
              label="Email"
              onChangeText={formik.handleChange('email')} 
              onBlur={formik.handleBlur('email')} 
              value={formik.values.email}
              style={[styles.textinput , formik.errors.email ?{borderWidth:0.8 , borderColor:'red'}:""]}
              />
          <RNPickerSelect
             id="ciudade"
             name="ciudade"
             placeholder={{}}
              items={ciudadesarray}
              onValueChange={formik.handleChange('ciudade')}
              value={formik.values.ciudade}
              Icon={() => {
                  return <Ionicons  name="md-arrow-down" size={24} color="dark" />;
              }}
              style={{
                  ...pickerSelectStyles,
                  iconContainer: {
                    top: 15,
                    right: 10
                  },
                  placeholder: {
                    color: '#000',
                    fontSize: 12,
                    fontWeight: 'bold',
                  },
                  
                }}
               useNativeAndroidPickerStyle={false}
              
                            />
                                {/*}
        <TextInput dark large 
              id="password"
              name="password"
              label="Password"
              secureTextEntry={true}
              onChangeText={formik.handleChange('password')} 
              onBlur={formik.handleBlur('password')} 
              value={formik.values.password}
              style={[styles.textinput , formik.errors.password ?{borderWidth:0.8 , borderColor:'red'}:""]}
              />
                                    {*/}

        </Drawer.Section>
        

    
        <Drawer.Section>
            <BotonCustom onPress={() => envioUpdate()} style={{marginRight:20, marginLeft:20, marginBottom:5}} title="Guardar"></BotonCustom>
            <BotonCustom onPress={() => navigation.goBack()} style={{marginRight:20, marginLeft:20, marginBottom:5}} title="Volver"></BotonCustom>
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  textinput:{
   
  },
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
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      backgroundColor: '#e7e7e7',
      fontSize: 16, 
      color: '#6c6c6c',
      height:60,
      paddingLeft:13,
      borderBottomColor:'#6c6c6c',
      borderBottomWidth:0.5
  },
  inputAndroid: {
      backgroundColor: '#f1f1f1',
      fontSize: 16, 
      color: 'black',
      height:40,
      borderRadius:10,
      paddingLeft:10,
      marginBottom:10 // to ensure the text is never behind the icon
  },
});
export default EditarPerfil