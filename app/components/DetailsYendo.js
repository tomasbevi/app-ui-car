import React from 'react'
import { ScrollView , Alert} from 'react-native';
import {  Text,  DividerEmpty } from '../screens/YendoScreenStyle';
import  {AntDesign} from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import { useDispatch } from 'react-redux'
import { useMutation } from '@apollo/client';
import {updateSolicitude as UPDATE_SOLICITUD} from '../graphql/mutations.gql';


const DetailsYendo = (data) => {
    data = data.data;
    const dispatch = useDispatch()

    const [ updateSolicitud ] = useMutation(UPDATE_SOLICITUD);

    async function acciones(solicitudid , estado){
      dispatch({type: 'set', spinner: true })
     const resultado = await updateSolicitud({
          variables: { 
              input: 
              {
                where:  {
                  id: solicitudid 
                },
                data: { 
                   estado: estado 
                }
                }
           }, pollInterval: 5
      }).then(() => {
          dispatch({type: 'set', spinner: false })
      })
  }

    const botonLlego = () =>
    Alert.alert(
      "Ya llego?",
      "Avisanos si ya te pasaron a buscar!",
      [
        {
          text: "No",
          onPress: () => console.log("Nada"),
          style: "cancel"
        },
        { text: "Si", onPress: () => acciones(data.id , "2") }
      ],
      { cancelable: false }
    );

    const botonCancelar = () =>
    Alert.alert(
      "Cancelar Auto",
      "Estas seguro que queres cancelar?",
      [
        {
          text: "No",
          onPress: () => console.log("No Cancelo!"),
          style: "cancel"
        },
        { text: "Si", onPress: () => acciones(data.id , "3")  }
      ],
      { cancelable: false }
    );

    
    switch (data.estado){
                            case "0":
                                return(
                                  <ScrollView onScroll={() => Actions.refresh()}>
                                  <Text dark smalllarge>Te vamos a ir a buscar a la dirección</Text>
                                  <DividerEmpty x1/>
                                  <Text dark large><AntDesign name="check" size={15} /> {data.calle} {data.altura} - Dolores</Text>
                                  <DividerEmpty x2/>
                                  <BotonCustom title="Quiero Cancelar" onPress={botonCancelar}></BotonCustom>
                                  </ScrollView>
                                )
                              break;
                              case "1":
                                return(
                                  <ScrollView onScroll={() => () => Actions.refresh()}>
                                  <Text dark smalllarge>Te estámos yendo a buscar a la dirección</Text>
                                  <DividerEmpty x1/>
                                  <Text dark large><AntDesign name="check" size={15} /> {data.calle} {data.altura} - Dolores</Text>
                                  <DividerEmpty x2/>
                                  <BotonCustom title="Ya llego!" onPress={botonLlego}></BotonCustom>
                                  <DividerEmpty x1/>
                                  <BotonCustom title="Quiero Cancelar" onPress={botonCancelar}></BotonCustom>
                                  </ScrollView>
                                )
                              break;
                              case "2":
                                return(
                                  <ScrollView onScroll={() => () => Actions.refresh()}>
                                  <Text dark smalllarge>El siguente viaje se registro a la dirección:</Text>
                                  <DividerEmpty x1/>
                                  <Text dark large><AntDesign name="check" size={15} /> {data.calle} {data.altura} - Dolores</Text>
                                  <DividerEmpty x2/>
                                  </ScrollView>
                                )
                              break;
                              case "3":
                                return(
                                  <ScrollView onScroll={() => () => Actions.refresh()}>
                                  <Text dark smalllarge>El siguiente viaje se registro a la dirección: </Text>
                                  <DividerEmpty x1/>
                                  <Text dark large><AntDesign name="check" size={15} /> {data.calle} {data.altura} - Dolores</Text>
                                  <DividerEmpty x2/>
                                  </ScrollView>
                                )
                              break;
                                }
}
export default DetailsYendo