import React from 'react'
import { StyleSheet } from 'react-native'
import { Input } from 'react-native-elements';
import { set } from 'react-native-reanimated';


const index = ({label,placeholder,value,setText,errorMessage,isError,multiline,numLine,keyboardType}) => {

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
            errorStyle={{ color: 'red' }}
            errorMessage={errorMessage}
            renderErrorMessage={isError}
            multiline = {multiline}
            numberOfLines={numLine}
            keyboardType={keyboardType}
            autoCompleteType='off'
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
        fontSize:17,
        paddingHorizontal:10
    },
    inputContainerStyle :{
        backgroundColor:'#fff',
        borderRadius:10,
        paddingHorizontal:10,paddingVertical:8,
        shadowColor: "#024059",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 1, 
    },
    labelStyle :{
        marginBottom:5,
        marginLeft:3
    }
})
