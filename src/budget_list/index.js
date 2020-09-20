import React from 'react'
import { FlatList, Text, View,Alert,KeyboardAvoidingView ,TouchableOpacity } from 'react-native'
import styles from './styles'
import {Feather,FontAwesome,FontAwesome5} from '@expo/vector-icons'
import { SearchBar,Image,Header  } from 'react-native-elements';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';


const Tab = createMaterialTopTabNavigator();

const list = [
    {
      id: 15550,
      title:'Banheiro Completo',
      desc: 'Vice President',
      valor: "R$ 785,00"
    },
    {
      id: 16895,
      title:'parede garagem',
      cliente: 'Alguem 3',
      valor: "R$ 3605,00"
    },
    {
      id: 23546,
      title:'Casa Completo',
      cliente: 'Vizinho 2',
      valor: "R$ 7444,00"
    },
    {
      id: 23131568,
      title:'Encanamento',
      cliente: 'Vizinho',
      valor: "R$ 470,00"
    },
    {
      id: 2111234565,
      title:'Encanamento',
      cliente: 'Vizinho',
      valor: "R$ 470,00"
    },
    {
      id: 23231,
      title:'Encanamento',
      cliente: 'Vizinho',
      valor: "R$ 470,00"
    },
    {
      id: 211635,
      title:'Encanamento',
      cliente: 'Vizinho',
      valor: "R$ 470,00"
    },
    {
      id: 88906,
      title:'Encanamento',
      cliente: 'Vizinho',
      valor: "R$ 470,00"
    },
    {
      id: 998,
      title:'Encanamento',
      cliente: 'Vizinho',
      valor: "R$ 470,00"
    },
    {
      id: 7866,
      title:'Encanamento',
      cliente: 'Vizinho',
      valor: "R$ 470,00"
    },
    {
      id: 6532,
      title:'Encanamento',
      cliente: 'Vizinho',
      valor: "R$ 470,00"
    },
    {
      id: 45678,
      title:'Encanamento',
      cliente: 'Vizinho',
      valor: "R$ 470,00"
    },
    {
      id: 886,
      title:'Encanamento',
      cliente: 'Vizinho',
      valor: "R$ 470,00"
    },
    {
      id: 89790,
      title:'Encanamento',
      cliente: 'Vizinho',
      valor: "R$ 470,00"
    },
    {
      id: 76548,
      title:'Encanamento',
      cliente: 'Vizinho',
      valor: "R$ 470,00"
    },
    {
      id: 9887656,
      title:'Encanamento',
      cliente: 'Vizinho',
      valor: "R$ 470,00"
    },
    {
      id: 10,
      title:'Algum Titulo',
      cliente: 'Ana',
      valor: "R$ 2000,00"
    },
    {
      id: 15,
      title:'Reboco fachada',
      cliente: 'Alguem',
      valor: "R$ 5500,00"
    },
    {
      id: 1566899,
      title:'Quarto',
      cliente: 'Seu Paulo',
      valor: "R$ 350,00"
    }
  ]
const getCurrentDate=()=>{

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return date + '/' + month + '/' + year;//format: dd-mm-yyyy;
}
function Pendentes() {

    
    return (
      <View style={{ flex: 1, }}>
       <FlatList
            data ={list}
            style = {styles.list}
            keyExtractor={budget => String(budget.id)}
            showsVerticalScrollIndicator = {false}
            renderItem ={ ({item:budget}) =>(
                <TouchableOpacity onPress ={() => Alert.alert()}>
                   <View  style={styles.itemContainer}>
                     <View style ={styles.containerInfo}>
                       <Text style ={styles.itemTitle}>{budget.id} • {budget.cliente} </Text>
                       <Text style = {styles.itemDesc}>{budget.title}</Text>
                       <Text style ={styles.itemValor}> {budget.valor}</Text>
                     </View>

                     <View style={styles.containerButtons}>
                       <Text style ={styles.itemDateTitle} >{getCurrentDate()}</Text>
                       <TouchableOpacity>
                         <Text style ={styles.itemEnviar}><FontAwesome5  name={'share-alt-square'} size = {18} color ={'#2A2AC0'}/> Enviar </Text>
                       </TouchableOpacity>
                       {/* <TouchableOpacity>
                         <Text style ={styles.itemAlterar}><FontAwesome5  name={'pen'} size = {18} color ={'#2A2AC0'}/> Status</Text>
                       </TouchableOpacity> */}

                     </View>

                   </View>
                </TouchableOpacity>
            )}
        />
      </View>
    );
}

function Aprovados() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Aprovados!</Text>
      </View>
    );
}
function Reprovados() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Reprovados!</Text>
      </View>
    );
  }

const index = ({navigation}) => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.container} >
            <View style={styles.container}>
                <View style = {styles.headerStyle}>    
                <View style={styles.headerTop}>
                    <View >
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <FontAwesome5 name= 'chevron-left' size = {25} color={'#024059'} />
                        </TouchableOpacity>                      
                    </View> 
                    <TouchableOpacity onPress={()=>Alert.alert("Voltando")}>
                        <FontAwesome5 name= 'user-circle' size = {28} color={'#024059'} />                  
                    </TouchableOpacity>          
                </View>

                <View style = {styles.headerBottom}>
                    <TouchableOpacity onPress={()=>Alert.alert("Voltando")}>
                        <Text style = {styles.title}>Orçamentos</Text>
                    </TouchableOpacity>  
                </View>

            </View>


                <View style={styles.inputSearch}>
                <SearchBar
                    placeholder="Buscar orçamentos..." 
                    lightTheme = {true}
                    round ={true}
                    underlineColorAndroid ={'transparent'}
                    containerStyle ={{backgroundColor:'#E8ECF5',borderTopWidth:0,borderBottomWidth:0,padding:0,}}
                    inputContainerStyle ={{backgroundColor:'#fff'}}/>

                </View>
                <View style={{flex:8}}>
                {/* <NavigationContainer> */}
                    <Tab.Navigator 
                        tabBarOptions={{
                            labelStyle: { fontSize: 12 },
                            style: { backgroundColor: '#E8ECF5',borderWidth:0 },
                        }}
                    >
                        <Tab.Screen name="Pendentes" component={Pendentes} />
                        <Tab.Screen name="Aprovados" component={Aprovados} />
                        <Tab.Screen name="Reprovados" component={Reprovados} />
                    </Tab.Navigator>
                {/* </NavigationContainer> */}
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default index

