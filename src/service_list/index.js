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
    title:'Diária',
    unit: 'Dia',
    valor: "R$ 785,00"
  },
  {
    title:'Diária',
    unit: 'Dia',
    valor: "R$ 785,00"
  },
  {
    title:'Diária',
    unit: 'Dia',
    valor: "R$ 785,00"
  },
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
            keyExtractor={budget => String(budget.index)}
            showsVerticalScrollIndicator = {false}
            renderItem ={ ({item:budget}) =>(
                <TouchableOpacity onPress ={() => Alert.alert()}>
                   <View  style={styles.itemContainer}>
                       <Text style = {styles.itemDesc}>{budget.title}</Text>
                       <Text style ={styles.itemValor}> {budget.valor}/{budget.unit}</Text>
                   </View>
                </TouchableOpacity>
            )}
        />
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
                        <Text style = {styles.title}>Serviços</Text>
                    </TouchableOpacity>  
                    <TouchableOpacity onPress={()=>Alert.alert("Voltando")}>
                      <FontAwesome5 name= 'filter' size = {20} color={'#024059'} />                  
                    </TouchableOpacity>  

                </View>

            </View>


                <View style={styles.inputSearch}>
                <SearchBar
                    placeholder="Buscar serviços..." 
                    lightTheme = {true}
                    round ={true}
                    underlineColorAndroid ={'transparent'}
                    containerStyle ={{backgroundColor:'#E8ECF5',borderTopWidth:0,borderBottomWidth:0,padding:0,}}
                    inputContainerStyle ={{backgroundColor:'#fff'}}/>

                </View>
                <View style={{flex:8}}>
                  {Pendentes()}
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default index

