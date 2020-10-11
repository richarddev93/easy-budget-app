import React from 'react'
import { StyleSheet } from 'react-native'
import { Input } from 'react-native-elements';
import { set } from 'react-native-reanimated';


const index = ({label,placeholder,value,setText}) => {

    return (
        <Input
            label={label}
            placeholder={placeholder}
            value={value}
            onChangeText={(item)=>setText(item)}
            containerStyle={styles.containerStyle}
            style={styles.styleInput}
            inputContainerStyle={styles.inputContainerStyle}
            labelStyle={styles.labelStyle}
            />
    )
}

export default index

const styles = StyleSheet.create({
    containerStyle:{
        backgroundColor:'#E8ECF5',
    },
    styleInput :{
        width:'95%',
        marginBottom:0,
    },
    inputContainerStyle :{
        backgroundColor:'#fff',
        borderRadius:10,
        paddingHorizontal:8,paddingVertical:8,
        shadowColor: "#024059",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 3, 
    },
    labelStyle :{
        marginBottom:5,
        marginLeft:3
    }
})
