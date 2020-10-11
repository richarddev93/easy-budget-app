import React, { useEffect }  from 'react'
import { StyleSheet, Text, View,TextInput,KeyboardAvoidingView ,TouchableOpacity, Alert } from 'react-native'
import styles from './styles'
import {Feather,FontAwesome,FontAwesome5} from '@expo/vector-icons'
import { SearchBar,Image,Header  } from 'react-native-elements';

import settingImage from  '../../assets/gear.png';


import {initDB,cleanDatabases} from '../database/initdb';
const index = ({navigation}) => {

    // initDB();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.container} >
            <View style={styles.container}>
           <View style = {styles.headerStyle}>    
                <View style={styles.headerTop}>
                    <View >
                        <TouchableOpacity onPress={() => navigation.openDrawer()}>
                            <FontAwesome5 name= 'bars' size = {25} color={'#024059'} />
                        </TouchableOpacity>                      
                    </View> 
                    <TouchableOpacity onPress={()=>Alert.alert("Voltando")}>
                        <FontAwesome5 name= 'user-circle' size = {28} color={'#024059'} />                  
                    </TouchableOpacity>          
                </View>

                <View style = {styles.headerBottom}>
                    <TouchableOpacity onPress={()=>Alert.alert("Voltando")}>
                        <Text style = {styles.title}>Menu</Text>
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
            <View style={{flex:7}}>
               <View style= {styles.buttonContainer}>
                <TouchableOpacity  style= {styles.buttonDashboard} onPress={()=> navigation.navigate('Budget')}>
                    <Text style={styles.titleButton}>Orçamentos</Text>
                    <View style={styles.containerItem}>
                    <Image
                        source={require('../../assets/receipt.png')}
                        style={{ width: 75, height: 75 }}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style= {styles.buttonDashboard} onPress={()=>navigation.navigate('Clients')}>
                    <Text style={styles.titleButton}>Clientes</Text>
                    <View style={styles.containerItem}>
                    <Image
                        source={require('../../assets/member.png')}
                        style={{ width: 75, height: 75 }}
                        />
                    </View>
                </TouchableOpacity>
            </View>

               <View style= {styles.buttonContainer}>

                    <TouchableOpacity style= {styles.buttonDashboard} onPress={()=>navigation.navigate('Services')}>
                        <Text style={styles.titleButton}>Serviços</Text>
                        <View style={styles.containerItem}>
                            <Image
                                source={require('../../assets/trowel.png')}
                                style={{ width: 75, height: 75 }}
                                />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style= {styles.buttonDashboard} onPress={()=>navigation.navigate('Supplies')}>
                        <Text style={styles.titleButton}>Materiais</Text>
                        <View style={styles.containerItem}>
                        <Image
                            source={require('../../assets/tools.png')}
                            style={{ width: 75, height: 75 }}
                            />
                        </View>
                    </TouchableOpacity>
            </View>
            </View>
        </View>
        </KeyboardAvoidingView>
    )
}

export default index

