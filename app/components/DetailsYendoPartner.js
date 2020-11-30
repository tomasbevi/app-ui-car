import React from 'react'
import { ScrollView , Alert} from 'react-native';
import {  Text,  DividerEmpty } from '../screens/partner/YendoScreenStylePartner';
import  {AntDesign} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch , useSelector} from 'react-redux'
import { useMutation } from '@apollo/client';
import {updateSolicitudePartner as UPDATE_SOLICITUD_PARTNER} from '../graphql/mutations.gql';


const DetailsYendo = (infoprevia) => {
  const navigation = useNavigation();
  const info = infoprevia.data;
  const [ updateSolicitudPartner ] = useMutation(UPDATE_SOLICITUD_PARTNER);
  const dispatch = useDispatch()
  var userlogged = useSelector(state => state.user)
  
  
  async function acciones(solicitudid , estado){
    dispatch({type: 'set', spinner: true })
    const resultadoaccion =  await updateSolicitudPartner({
          variables: { 
            input: 
            {
              where:  {
                id: solicitudid 
              },
              data: { 
                estado: estado ,
                acceptedby: userlogged
                    }
              }
            }
        }).then(() => {
            dispatch({type: 'set', spinner: false })
          //console.log('termino')
           //console.log(resultadoaccion)
        })
  }

    const botonTomar = () => Alert.alert(
      "Queres tomar el pedido?",
      "Esto hara que te comprometas con la siguiente orden",
      [
        {
          text: "No",
          onPress: () => console.log("Nada"),
          style: "cancel"
        },
        { text: "Si", onPress: () => acciones(info.id , "1") }
      ],
      { cancelable: false }
    );

    const botonLlego = () => Alert.alert(
      "Marcar el pedido completado",
      "Esto siginifica que ya finalizaste la solicitud",
      [
        {
          text: "No",
          onPress: () => console.log("Nada"),
          style: "cancel"
        },
        { text: "Si", onPress: () => acciones(info.id , "2") }
      ],
      { cancelable: false }
    );

    const botonCancelar = () => Alert.alert(
      "Cancelar Auto",
      "Estas seguro que queres cancelar?",
      [
        {
          text: "No",
          onPress: () => console.log("No Cancelo!"),
          style: "cancel"
        },
        { text: "Si", onPress: () => acciones(info.id , "3")  }
      ],
      { cancelable: false }
    );

    
    switch (info.estado){
                            case "0": //SOLICITUD BUSCANDO ASIGNACION
                                return(
                                  <ScrollView>
                                  <Text dark smalllarge>Alguien solicito un pedido a la siguiente dirección</Text>
                                  <DividerEmpty x1/>
                                  <Text dark large><AntDesign name="check" size={15} /> {info.calle} {info.altura} - {info.ciudades.nombreCiudad}</Text>
                                  <DividerEmpty x2/>
                                  <BotonCustom title="Quiero Tomarlo" onPress={botonTomar}></BotonCustom>
                                  </ScrollView>
                                )
                              break;
                              case "1": //CUANDO FUE ACEPTADO
                                return(
                                  <ScrollView>
                                  <Text dark bold>Aceptaste la solicitud!</Text>
                                  <DividerEmpty x1/>
                                  <Text dark smalllarge>Dirigete a la siguiente dirección:</Text>
                                  <DividerEmpty x1/>
                                  <Text dark large><AntDesign name="check" size={15} /> {info.calle} {info.altura} - {info.ciudades.nombreCiudad}</Text>
                                  <DividerEmpty x2/>
                                  <BotonCustom title="Marcar como Completada" onPress={botonLlego}></BotonCustom>
                                  <DividerEmpty x1/>
                                  <BotonCustom title="Quiero Cancelar" onPress={botonCancelar}></BotonCustom>
                                  </ScrollView>
                                )
                              break;
                              case "2": //CUANDO FUE FINALIZADO
                                return(
                                  <ScrollView>
                                  <Text dark smalllarge bold>La solicitud ya finalizo</Text>
                                  <DividerEmpty x1/>
                                  <Text dark smalllarge >Se realizo a la siguiente dirección</Text>
                                  <DividerEmpty x1/>
                                  <Text dark large><AntDesign name="check" size={15} /> {info.calle} {info.altura} - {info.ciudades.nombreCiudad}</Text>
                                  <DividerEmpty x2/>
                                  <BotonCustom title="Buscar nuevas" onPress={()=> navigation.navigate('Solicitudes')}></BotonCustom>
                                  </ScrollView>
                                )
                              break;
                              case "3":
                                return(
                                  <ScrollView>
                                  <Text dark smalllarge>El siguiente viaje se registro a la dirección: </Text>
                                  <DividerEmpty x1/>
                                  <Text dark large><AntDesign name="check" size={15} /> {info.calle} {info.altura} - {info.ciudades.nombreCiudad}</Text>
                                  <DividerEmpty x2/>
                                  </ScrollView>
                                )
                              break;
                                }
}
export default DetailsYendo