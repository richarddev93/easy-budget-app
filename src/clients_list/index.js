import React, { useState,useEffect } from 'react'
import { FlatList, Text, View,Alert,KeyboardAvoidingView ,TouchableOpacity,ToastAndroid } from 'react-native'
import {FontAwesome5} from '@expo/vector-icons'
import { SearchBar,Overlay,Button ,Divider} from 'react-native-elements';
import { FAB } from 'react-native-paper';
import { useWindowDimensions } from 'react-native';
import _ from 'lodash';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import InputCustom from '../components/input'
import * as Animatable from  'react-native-animatable';


import styles from './styles'
import {addData,findAll,updateById,deleteById} from '../database/controlDb';
import { showToastWithGravityAndOffset} from '../utils/functions';
const Tab = createMaterialTopTabNavigator();

//Quando pesquisar na api usar o debounce
//usar o list Footer component

const index = ({navigation}) => {


    const [clients,setClients] = useState();
    const [data,setData] = useState([]);
    const [search,setSearch] = useState('');
    const [visible, setVisible] = useState(false);
    const [isUpdate,setIsUpdate] = useState(false);
    
    const [newName,setNewName] = useState('');
    const [newAlias,setNewAlias] = useState('');
    const [newPhone,setNewPhone] = useState('');
    const [newEmail,setNewEmail] = useState('');
    const [newDesc,setNewDesc] = useState('');
    const [newIsOpen,setNewIsOpen] = useState(false);
    const [idUser,setIdUser] = useState(null);

    const [count,setCount] = useState(4)


    const windowWidth = useWindowDimensions().width;

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const cleanState = ()=>{
        setNewName('');
        setNewEmail('');
        setNewPhone('');
        setNewDesc('');
        setNewAlias('');
        setIdUser(null);
    }

    const handleSearch = (text) =>{
        const formattedQuery = text//.toLowerCase();
        const dataaux = _.filter(data, cliente => {
            if(cliente.alias.includes(formattedQuery)) {
                return true
            }
            return false
        });
        setSearch(text);
        setData(dataaux);
    }

   
    
    const _handleCLient = (clientaux) => {
        console.log(clientaux)
        setNewName(clientaux.name);
        setNewEmail(clientaux.email);
        setNewPhone(clientaux.phone);
        setNewDesc(clientaux.desc);
        setNewAlias(clientaux.alias);
        setIdUser(clientaux.id);//usado para alterar e deletar o item do array

        setIsUpdate(true);
        setVisible(true);
    }

    async function updateClients() {

        let dataAux = [
            {
                field : 'name',
                value : `${newName}`
            },
            {
                field : 'alias',
                value : `${newAlias}`
            },
            {
                field : 'phone',
                value : `${newPhone}`
            },
            {
                field : 'email',
                value :`${newEmail}`
            },
            {
                field : 'desc',
                value : `${newDesc}`
            },
            {
                field : 'isOpen',
                value : 0
            },
        ]
        console.log("updateClients");

        try {
            isSucess =  await updateById('clients',dataAux,idUser)

            if (isSucess) {
                cleanState();
                setVisible(false);
                showToastWithGravityAndOffset("Alterado com Sucesso !");
                const clientsAux = await findAll('clients');
                setData(clientsAux);
            }else {
                Alert.alert("Erro ao Salvar");
            }
            
        } catch (error) {
            console.log('result',error);
            
        }
       
    }

    async function removeClient() {
        console.log(idUser)
        try {
            isSucess =  await deleteById('clients',idUser)

            if (isSucess) {
                cleanState();
                setVisible(false);
                showToastWithGravityAndOffset("Deletado com Sucesso !");
                const clientsAux = await findAll('clients');
                setData(clientsAux);
            }else {
                Alert.alert("Erro ao deletar");
            }
            
        } catch (error) {
            console.log('result',error);
            
        }
        setVisible(false)

    }

    const addClient = async ()  =>{
        //Mudar para api
       let isSucess = null; 
       let dataAux = [
            {
                field : 'name',
                value : `${newName}`
            },
            {
                field : 'alias',
                value : `${newAlias}`
            },
            {
                field : 'phone',
                value : `${newPhone}`
            },
            {
                field : 'email',
                value :`${newEmail}`
            },
            {
                field : 'desc',
                value : `${newDesc}`
            },
            {
                field : 'isOpen',
                value : 0
            },
        ]
        try {
            isSucess =  await addData('clients',dataAux);

            if (isSucess) {
                cleanState();
                setVisible(false);
                showToastWithGravityAndOffset("Sucesso !");
                const clientsAux = await findAll('clients');
                setData(clientsAux);
            }else {
                Alert.alert("Erro ao Salvar");
            }
            
        } catch (error) {
            console.log('result',error);
            
        }
    }

    const  handleCollapseItem = (client) =>{
        
        const newData = data.map( item => {
            if (client.id == item.id) {
                item.isOpen = !item.isOpen
                return item;
            }
            return item;
        })
        setData(newData)
    }  

    const _renderItem = (client,index) => {

        return (
            <TouchableOpacity  style = {styles.containerItem} onPress ={() => { setIsUpdate(true); _handleCLient(client,index)}}>
                <View style ={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                    <View  style={styles.clientDescContainer}>
                        <Text style = {styles.clientName}>{client.alias || client.name}</Text>
                        <Text style ={styles.clientEmail}>{client.email}</Text>
                        <Text style ={styles.clientTel}>{client.phone}</Text>
                    </View>
                    <View  style={styles.clientDescObs}>
                        <Text style = {styles.clientDescTitle}>OBS.:</Text>
                        <Text style = {styles.clientDesc}>{client.desc}</Text>
                    </View>
                    <View  style={styles.clientDescBudgets}>
                            <TouchableOpacity  onPress = {() => handleCollapseItem(client)} style = {{alignItems : 'center'}}>
                                <Text style={styles.clientDescTitle}>Orçamentos <FontAwesome5  name ={client.isOpen ? 'angle-up' : 'angle-down'} size ={15} /> </Text>
                            </TouchableOpacity>
                            <Text style = {styles.clientNumBudget}>12 </Text> 
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

    const modalAddClient = () =>(
      <Animatable.View 
          animation='fadeInUp'
      
      >
        <Overlay overlayStyle={{backgroundColor:'#E8ECF5',borderRadius:10}} isVisible={visible} onBackdropPress={toggleOverlay}>
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"} >
            <View   >
             <Text style={{textAlign:'center',fontSize:20,fontWeight:'900',color:'#024059'}}>{isUpdate ? 'Alterando': 'Novo Cliente'}</Text>
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
                    {isUpdate ?
                        <Button
                        containerStyle ={{padding:5}}
                        buttonStyle = {{backgroundColor:'#F25050',borderWidth:1,borderColor:'#F25050',width:100,borderRadius:10}}
                        title="Apagar"
                        onPress={()=> {setVisible(!visible); removeClient(); }}
                        />
                        : null }
                    <Button
                        containerStyle ={{padding:5}}
                        buttonStyle = {{borderColor:'#024059',borderWidth:1,width:100,borderRadius:10}}
                        titleStyle={{color:'#024059'}}
                        title="Cancelar"
                        type={'outline'}
                        onPress={()=> setVisible(!visible)}
                        />
                    <Button
                        containerStyle ={{padding:5}}
                        buttonStyle = {{backgroundColor:'#23cf5c',borderWidth:1,borderColor:'#23cf5c',width:100,borderRadius:10}}
                        title={isUpdate ? "Alterar" :"Adicionar"}
                        onPress= {() =>  {

                            if (isUpdate){
                                updateClients();                                
                            }else{
                                addClient();
                            }
                        }
                        }
                        />
                </View>
            </View>
        </KeyboardAvoidingView>
    </Overlay>
    </Animatable.View>
    );

    const getClients  = async ()=>{
        let dataaux = await findAll('clients');
        setData(dataaux);
    }
    
    useEffect(() => {
        getClients();
    }, []);

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
                    onPress={() => { cleanState(); setIsUpdate(false);  setVisible(true);}}
                />
             {modalAddClient()}
            </View>
        </KeyboardAvoidingView>
    )
}

export default index;

