import React, { useState,useEffect } from 'react'
import { FlatList, Text, View,Alert,KeyboardAvoidingView ,TouchableOpacity } from 'react-native'
import styles from './styles'
import {FontAwesome5} from '@expo/vector-icons'
import { SearchBar,Overlay,Button ,Divider} from 'react-native-elements';
import { FAB } from 'react-native-paper';
import { useWindowDimensions } from 'react-native';
import _ from 'lodash';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import InputCustom from '../components/input'

const Tab = createMaterialTopTabNavigator();

//Quando pesquisar na api usar o debounce
//usar o list Footer component
const lista = [
  {

    id:1,
    name:'Turica',
    alias: 'Tuquinhas',
    telefone: '1198174385',
    email :'tucs@gmail.com'
    
  },
  {
    id:2,
    name:'Pugs',
    alias: 'puguinhos',
    telefone: '1198795955',
    email :'pugs@gmail.com'
  },
  {
    id:3,
    name:'Boco',
    alias: 'Matheus',
    telefone: '11989899999',
    email :'boco@gmail.com'
  }
]


const index = ({navigation}) => {

    const [clients,setClients] = useState(lista);
    const [data,setData] = useState(clients);
    const [search,setSearch] = useState('');
    const [visible, setVisible] = useState(false);

    const [newName,setNewName] = useState('');
    const [newAlias,setNewAlias] = useState('');
    const [newPhone,setNewPhone] = useState('');
    const [newTel,setNewTel] = useState('');
    const [newEmail,setNewEmail] = useState('');
    const [newDesc,setNewDesc] = useState('');

    const windowWidth = useWindowDimensions().width;

    const toggleOverlay = () => {
        setVisible(!visible);
    };
    
    const addClient = () => {
        return Alert.alert('Adicionando Cliente')
    }
    const handleSearch = (text) =>{
       const formattedQuery = text//.toLowerCase();
       const data = _.filter(clients, cliente => {
           if(cliente.alias.includes(formattedQuery)) {
               return true
           }
           return false
       });
       setSearch(text);
       setData(data);
   }

   const _renderItem = (client,index) => {
        return (
            <TouchableOpacity  style = {styles.containerItem} onPress ={() => Alert.alert()}>
            <View style ={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                <View  style={styles.clientDescContainer}>
                    <Text style = {styles.clientName}>{client.alias || client.name}</Text>
                    <Text style ={styles.clientEmail}>{client.email}</Text>
                    <Text style ={styles.clientTel}>{client.telefone}</Text>
                </View>
                <View  style={styles.clientDescObs}>
                    <Text style = {styles.clientDescTitle}>OBS.:</Text>
                    <Text style = {styles.clientDesc}>Clientes caloteiros</Text>
                </View>
                <View  style={styles.clientDescBudgets}>
                    <Text style={styles.clientDescTitle}>Orçamentos :{false ?  <Text style ={{color:'#262626',fontWeight:'bold'}}>12</Text>: null}</Text>
                        {/* <TouchableOpacity  onPress = {() => updateClients(client, index)} style = {{alignItems : 'center'}}> */}
                        <TouchableOpacity  onPress = {() => handleEditItem(client)} style = {{alignItems : 'center'}}>
                            <Text style = {styles.clientNumBudget}>12 <FontAwesome5  name ={client.isOpen ? 'arrow-up' : 'arrow-down'} size ={20} /></Text> 
                        </TouchableOpacity>
                    </View>
            </View>
            { client.isOpen ? (
                <View>
                        <Text>Orçamentos</Text>
                        <Divider style={{ marginBottom:5,marginTop :5,backgroundColor: 'gray' }} />
                        <View style ={{flex:1,flexDirection:'row',justifyContent:'space-between',paddingBottom:10}}>
                                <Text style = {styles.clientBudgetsAproved}><FontAwesome5  name ={'check'} color = {'green'} size ={18} />  aprovados : 2</Text>
                                <Text style ={styles.clientBudgetsPenden}><FontAwesome5  name ={'exclamation'} color = {'yellow'} size ={18} />     pendentes : 0</Text>
                                <Text style ={styles.clientBudgetsReprov}><FontAwesome5  name ={'times'} color = {'red'} size ={18} />   reprovados: 10</Text>
                            
                        </View>
                    </View>    
                    ) : null }
            </TouchableOpacity>
            
        )
   }

   function updateClients(target, index) {

        const itensCopy = Array.from(clients);
        
        itensCopy.splice(index, 1, {
            "alias": target.alias,
            "email": target.email,
            "id": target.id,
            "isOpen": !target.isOpen,
            "name": target.name,
            "telefone": target.telefone });

        setClients(itensCopy);
   }

   const  handleEditItem = (client) =>{
        
        const newData = clients.map( item => {
            if (client.id == item.id) {
                item.isOpen = !item.isOpen
                return item;
            }
            return item;
        })
        setClients(newData)
    }  

    const addControlCollapse= () =>{
        let aux = [];
        clients.map(client =>{         
            return aux.push(Object.assign(client, {isOpen:false}))
        })
        setClients(aux);
    };
    
    useEffect(() => {
        addControlCollapse()
    }, [])
    
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
                            <Text style = {styles.title}>Clientes</Text>
                        </TouchableOpacity>  
                        <TouchableOpacity onPress={()=>Alert.alert("Voltando")}>
                        <FontAwesome5 name= 'filter' size = {20} color={'#024059'} />                  
                        </TouchableOpacity>  
                    </View>
                </View>

                <View style={styles.inputSearch}>
                <SearchBar
                    placeholder="Buscar Clientes..." 
                    lightTheme = {true}
                    round ={true}
                    underlineColorAndroid ={'transparent'}
                    containerStyle ={{backgroundColor:'#E8ECF5',borderTopWidth:0,borderBottomWidth:0,padding:0,}}
                    inputContainerStyle ={{backgroundColor:'#fff'}}
                    onChangeText = {handleSearch}
                    value={search}
                    showLoading={false}/>

                </View>
                <View style={{ flex: 8}}>
                    <FlatList
                            data ={data}
                            style = {styles.list}
                            keyExtractor={client => String(client.id)}
                            showsVerticalScrollIndicator = {false}
                            renderItem ={ ({item:client,index}) =>(
                                _renderItem(client,index)
                                )}
                        />
                </View>
                <FAB
                    style={styles.fab}
                    icon="plus"
                    onPress={() => setVisible(true)}
                />
                <Overlay overlayStyle={{backgroundColor:'#E8ECF5',borderRadius:10}} isVisible={visible} onBackdropPress={toggleOverlay}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS == "ios" ? "padding" : "height"} >
                        <View >
                            <Text style={{textAlign:'center',fontSize:20,fontWeight:'900',color:'#024059'}}>Adicionar Cliente</Text>
                            <InputCustom 
                                label={'Nome'}
                                placeholder={'Paulo'}
                                value={newName}
                                setText={setNewName}
                            />
                            <View style={{flexDirection:'row',width:windowWidth/2.2}}>
                                <InputCustom 
                                    label={'Apelido'}
                                    placeholder={'Seu Paulo'}
                                    value={newAlias}
                                    setText={setNewAlias}
                                />

                                <InputCustom 
                                    label={'Telefone'}
                                    placeholder={'11981743885'}
                                    value={newPhone}
                                    setText={setNewPhone}
                                />
                            </View>
                            <InputCustom 
                                label={'Email'}
                                placeholder={'seupaulo@email.com.br'}
                                value={newEmail}
                                setText={setNewEmail}
                            />
                            <InputCustom 
                                label={'Obs.'}
                                placeholder={'Ótimo Cliente'}
                                value={newDesc}
                                setText={setNewDesc}
                            />
                            
                            <View style={styles.buttonGroup}>
                                <Button
                                    containerStyle ={{padding:5}}
                                    buttonStyle = {{backgroundColor:'#F25050',width:100,borderRadius:10}}
                                    title="Cancelar"
                                    />
                                <Button
                                    containerStyle ={{padding:5}}
                                    buttonStyle = {{backgroundColor:'#2C33BF',width:100,borderRadius:10}}
                                    title="Adicionar"
                                    />
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </Overlay>
            </View>
        </KeyboardAvoidingView>
    )
}

export default index

