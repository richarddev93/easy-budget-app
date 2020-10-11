import React from 'react'
import { FlatList, Text, View,Alert,KeyboardAvoidingView ,TouchableOpacity ,ToastAndroid} from 'react-native'

export const getCurrentDate=()=>{

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return date + '/' + month + '/' + year;//format: dd-mm-yyyy;
}

// function updateClients() {
         

//     const itensCopy = Array.from(data);
//     itensCopy.splice(index, 1, {
//         "alias": newAlias,
//         "email": newEmail,
//         "id": index+1,
//         "isOpen": false,
//         "name": newName,
//         "telefone": newPhone });

//      setData(itensCopy);
//      setVisible(false)
// }
// function removeClient() {
     
//     const itensCopy = Array.from(data);
//     itensCopy.splice(index, 1);
//     setData(itensCopy);
// }

   // const addControlCollapse= () =>{
    //     let aux = [];
    //     clients.map(client =>{         
    //         return aux.push(Object.assign(client, {isOpen:false}))
    //     })
    //     setClients(aux);
    // };

//TOAST
export const showToastWithGravityAndOffset = (msg) => {
    ToastAndroid.showWithGravityAndOffset(
       msg,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
}