import React  from 'react';
import {StyleSheet , TouchableOpacity , View, Platform} from 'react-native'
import { SwipeItem, SwipeButtonsContainer } from 'react-native-swipe-item';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { Text, ContenedorHistorial } from '../screens/HistorialScreenStyle';
import { useDispatch } from 'react-redux'
import { useMutation } from '@apollo/client';

/*

Tipo de estados de la solicitud

0 - Solicitada (Esperando confirmación)  Verde
1 - Aceptada (Aceptada, en camino) Verde 
2 - Finalizada (Cuando concluye) Amarillo
3 - Cancelada (Se cancela y no se completa) Rojo

;*/


const SwipeButtonCustom = (solicitudesItems) => {
    const navigation = useNavigation();

    function accionGet(id){
        navigation.navigate('YendoPartner',id)
    }

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
               disableSwipeIfNoButton={true}
              // leftButtons={leftButton(solicitud.id)} 
               >
               <TouchableOpacity onPress={() => accionGet(solicitud.id)}>
                   <ContenedorHistorial style={styles.contentitem}>  
                       <AntDesign style={styles.antLogo}  name="car" size={30} color="black" />
                       <View style={styles.contenedorTexto}>
                         <Text dark large style={styles.styletexto}>{solicitud.calle.substr(0 , 20)} {solicitud.altura.substr(0,25)} </Text>
                         <Text dark style={styles.date} >{date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+ " hs"}</Text>
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
              disableSwipeIfNoButton={true}
             /* leftButtons={leftButton(solicitud.id)} 
              rightButtons={rightButton(solicitud.id)}*/
              >
              <TouchableOpacity onPress={() => accionGet(solicitud.id)}>
                  <ContenedorHistorial style={styles.contentitem}>  
                      <AntDesign style={styles.antLogo}  name="car" size={24} color="black" />
                      <View style={styles.contenedorTexto}>
                         <Text dark large style={styles.styletexto}>{solicitud.calle.substr(0 , 20)} {solicitud.altura.substr(0,25)} </Text>
                         <Text dark style={styles.date} >{date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+ " hs"}</Text>
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
                         <Text dark large style={[styles.styletexto, {color:'#000'}]}>{solicitud.calle.substr(0 , 20)} {solicitud.altura.substr(0,25)} </Text>
                         <Text dark style={styles.date} >{date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+ " hs"}</Text>
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
                            <Text large style={[styles.styletexto , {color:"#a8a8a8"} ]}>{solicitud.calle.substr(0 , 20)} {solicitud.altura.substr(0,25)} </Text>
                            <Text dark style={styles.date} >{date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+ " hs"}</Text>
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
