import React  from 'react';
import {StyleSheet , TouchableOpacity , View, Platform} from 'react-native'
import { SwipeItem, SwipeButtonsContainer } from 'react-native-swipe-item';
import { Actions } from 'react-native-router-flux';
import { AntDesign } from '@expo/vector-icons';
import { Text, ContenedorHistorial } from '../screens/HistorialScreenStyle';
import { useDispatch } from 'react-redux'
import { useMutation } from '@apollo/client';
import {updateSolicitude as UPDATE_SOLICITUD} from '../graphql/mutations.gql';
/*

Tipo de estados de la solicitud

0 - Solicitada (Esperando confirmación)  Verde
1 - Aceptada (Aceptada, en camino) Verde 
2 - Finalizada (Cuando concluye) Amarillo
3 - Cancelada (Se cancela y no se completa) Rojo

;*/


const SwipeButtonCustom = (solicitudesItems) => {

    const dispatch = useDispatch()

    const [ updateSolicitud ] = useMutation(UPDATE_SOLICITUD);

    function accionGet(id){
       Actions.yendo(id)
    }

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
            Actions.yendo(solicitudid)
        })
    }
    
 
    const leftButton = (id) =>(
        <SwipeButtonsContainer
            style={{
                alignSelf: 'center',
                aspectRatio: 1,
                flexDirection: 'column',
                padding: 10,
                height: 70,
                backgroundColor: 'red',
                borderRadius: 4,
            }}
            
        >
            <TouchableOpacity
                onPress={() => acciones(id , "3")}
            >   
            <View style={{marginTop:5}} >
                 <AntDesign style={{textAlign:"center"}}  name="dislike1" size={24} color="white" />
                <Text style={styles.botonacciones}>Cancelar</Text>
            </View>
            </TouchableOpacity>
            
        </SwipeButtonsContainer>
    );
    const rightButton = (id) =>(
        <SwipeButtonsContainer
            style={{
                alignSelf: 'center',
                aspectRatio: 1,
                flexDirection: 'column',
                padding: 10,
                height: 70,
                backgroundColor: 'green',
                borderRadius: 4,
            }}
            
        >
            <TouchableOpacity
                onPress={() => acciones(id , "2")}
            >
            <View style={{marginTop:5}} >
                <AntDesign style={{textAlign:"center"}} name="check" size={24} color="white" />
                <Text style={styles.botonacciones} >LLegó!</Text>
             </View> 
            </TouchableOpacity>
        </SwipeButtonsContainer>
    );

    const arregloitemsS = Object.values(solicitudesItems);
    if(arregloitemsS){
    return (
        <View>
        {arregloitemsS[0].solicitudes.map((solicitud) => {
            var date = new Date(solicitud.createdAt)
               switch (solicitud.estado){
                case "0": 
               // 0 - Solicitada (Esperando confirmación)  Verde
               return (
               <SwipeItem key={solicitud.id} type={solicitud.estado}
               useNativeDriver={false}
               style={styles.button} 
               swipeContainerStyle={[styles.swipeContentContainerStyle , {backgroundColor:'#67cc1f' , borderLeftColor:'#3f870b'}]} 
               leftButtons={leftButton(solicitud.id)} 
               >
               <TouchableOpacity onPress={() => accionGet(solicitud.id)}>
                   <ContenedorHistorial style={styles.contentitem}>  
                       <AntDesign style={styles.antLogo}  name="car" size={30} color="black" />
                       <View style={styles.contenedorTexto}>
                         <Text dark large style={styles.styletexto}>{solicitud.calle} {solicitud.altura} </Text>
                         <Text dark style={styles.date} >{date.getFullYear()+"/"+date.getMonth()+"/"+date.getDate()+" "+date.getHours()+":"+date.getMinutes() }</Text>
                        </View>
                   </ContenedorHistorial>
               </TouchableOpacity>
               </SwipeItem>
               )
                break;
                case "1": 
              //  1 - Aceptada (Aceptada, en camino) Verde 
              return (
              <SwipeItem key={solicitud.id} type={solicitud.estado}
              useNativeDriver={false}
              style={styles.button } 
              swipeContainerStyle={[styles.swipeContentContainerStyle , {backgroundColor:'#67cc1f' , borderLeftColor:'#3f870b'}]} 
              leftButtons={leftButton(solicitud.id)} 
              rightButtons={rightButton(solicitud.id)}
              >
              <TouchableOpacity onPress={() => accionGet(solicitud.id)}>
                  <ContenedorHistorial style={styles.contentitem}>  
                      <AntDesign style={styles.antLogo}  name="car" size={24} color="black" />
                      <View style={styles.contenedorTexto}>
                         <Text dark large style={styles.styletexto}>{solicitud.calle} {solicitud.altura} </Text>
                          <Text dark style={styles.date} >{date.getFullYear()+"/"+date.getMonth()+"/"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()}</Text>
                        </View>
                  </ContenedorHistorial>
              </TouchableOpacity>
              </SwipeItem>
              )
                break;
                case "2": 
               // 2 - Finalizada (Cuando concluye) Amarillo
               return (
               <SwipeItem key={solicitud.id} type={solicitud.estado}
               useNativeDriver={false}
               style={styles.button } 
               disableSwipeIfNoButton={true}
               swipeContainerStyle={[styles.swipeContentContainerStyle , {backgroundColor:'#FBC02D' , borderLeftColor:'#bf9426'}]} 
               >
               <TouchableOpacity onPress={() => accionGet(solicitud.id)}>
                   <ContenedorHistorial style={styles.contentitem}>  
                       <AntDesign style={styles.antLogo}  name="car" size={24} color="black" />
                       <View style={styles.contenedorTexto}>
                         <Text dark large style={[styles.styletexto, {color:'#000'}]}>{solicitud.calle} {solicitud.altura} </Text>
                          <Text dark style={styles.date} >{date.getFullYear()+"/"+date.getMonth()+"/"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()}</Text>
                        </View>
                   </ContenedorHistorial>
               </TouchableOpacity>
               </SwipeItem> 
               )
                break;
                case "3": 
                //3 - Cancelada (Se cancela y no se completa) Rojo
                return (
                <SwipeItem key={solicitud.id} type={solicitud.estado}
                useNativeDriver={false}
                style={styles.button } 
                disableSwipeIfNoButton={true}
                swipeContainerStyle={[styles.swipeContentContainerStyle , {backgroundColor:'#d4d4d4' , borderLeftColor:'#9c9a9a'  }]} 
                >
                <TouchableOpacity onPress={() => accionGet(solicitud.id)}>
                    <ContenedorHistorial style={styles.contentitem}>  
                        <AntDesign style={styles.antLogo}  name="car" size={30} color="#a8a8a8" />
                        <View style={styles.contenedorTexto}>
                            <Text large style={[styles.styletexto , {color:"#a8a8a8"} ]}>{solicitud.calle} {solicitud.altura} </Text>
                            <Text style={styles.date} >{date.getFullYear()+"/"+date.getMonth()+"/"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()}</Text>
                        </View>
                    </ContenedorHistorial>
                </TouchableOpacity>
                </SwipeItem>
                )
                break;
            }
           
            })}
            </View>
    )}
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 75,
        alignSelf: 'center',
        marginVertical: 5,
        ...Platform.select({
            'android':{
                height: 70,
            }
        })
    },
    swipeContentContainerStyle: {
        borderRadius: 8,
        borderLeftWidth:10,
        borderWidth: 0,
        backgroundColor: '#FBC02D',
        fontSize:10
    },
    contentitem:{
       width:"100%",
       marginLeft:10,
       marginRight:10,
       padding:10
    },
    antLogo:{
        width:'23%',
        fontSize:35
    },
    contenedorTexto:{
        width:"90%",
       
    },
    styletexto:{
        color:'#000',
        fontWeight:'500', 
        ...Platform.select({
            'android':{
                fontSize:16
            },
            'ios':{
                fontSize:22
            }
        })
    },
    date:{
        
        ...Platform.select({
            'android':{
                fontSize:11
            },
            'ios':{
                fontSize:17
            }
        })
    },
    botonacciones:{
        textAlign:'center',
        ...Platform.select({
            'android':{
                fontSize: 9
            },
            'ios':{
                fontSize:11
            }
        })
    }
});
export default SwipeButtonCustom
