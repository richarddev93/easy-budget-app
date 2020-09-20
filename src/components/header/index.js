import React, { useState } from 'react'
import {  Text, View,Alert,TouchableOpacity } from 'react-native'
import styles from './styles'
import {Feather,FontAwesome,FontAwesome5} from '@expo/vector-icons'


    
    
const index = ({navigation},title) => {

    const [clients,setClients] = useState(lista);

    return (

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
                <Text style = {styles.title}>{title}</Text>  
                <TouchableOpacity onPress={()=>Alert.alert("Voltando")}>
                    <FontAwesome5 name= 'filter' size = {20} color={'#024059'} />                  
                </TouchableOpacity>  
            </View>

        </View>
    )
}

export default index

