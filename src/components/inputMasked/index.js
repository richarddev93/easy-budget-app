import React ,{ forwardRef }from 'react'
import { StyleSheet } from 'react-native'
import { Input } from 'react-native-elements';
import { MaskedInput} from 'react-native-ui-lib';


const Index = ({label,placeholder,value,setText,errorMessage,isError,multiline,numLine,keyboardType,maskedRender,onChange}) => {
  
   const Maskedinputaux = () => {
        return (
            <MaskedInput
                placeholder={placeholder}
                renderMaskedText={maskedRender}
                keyboardType={keyboardType}
                // onChangeText={(item) =>  setText(item) }
               onChange={onChange}
                containerStyle ={
                    {
                        width:'100%',
                        paddingHorizontal:10  ,
                        paddingVertical:1                   
                    }
                }
                value={value}
                />
        )
   }

   
    return (
      
        <Input
            label={label}
            //  onChangeText ={(item)=>handleText(item)}
            // onChange = {onChange}
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
            InputComponent = {
              forwardRef(Maskedinputaux)
            }
            // value={value}
            
            />
    )
}

export default Index;

const styles = StyleSheet.create({
    containerStyle:{
        flex:1,
        backgroundColor:'#E8ECF5',
        marginVertical:1
        
        
    },
    styleInput :{
        width:'95%',
        marginBottom:0,
        fontSize:17,
        paddingHorizontal:10,
        
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
        paddingVertical:12,
    },
    labelStyle :{
        marginBottom:5,
        marginLeft:3
    }
})
