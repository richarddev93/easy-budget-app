import React, { useState,useEffect ,useRef } from 'react'
import { FlatList, Text, View,Alert,KeyboardAvoidingView ,TouchableOpacity,ToastAndroid } from 'react-native'
import {FontAwesome5} from '@expo/vector-icons'
import { SearchBar,Overlay,Button ,Divider} from 'react-native-elements';
import { FAB } from 'react-native-paper';
import { useWindowDimensions } from 'react-native';
import _ from 'lodash';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import InputCustom from '../components/input'
import * as Animatable from  'react-native-animatable';
import { Modalize } from 'react-native-modalize';
import TextInputMask from 'react-native-text-input-mask';
import {Assets, Colors, Image, Toast} from 'react-native-ui-lib';





import {
    DotIndicator,
  } from 'react-native-indicators';



import styles from './styles'
import {addData,findAll,updateById,deleteById} from '../database/controlDb';
import { showToastWithGravityAndOffset} from '../utils/functions';
import ValidationFunction from '../services/validateForm';

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
    const [showToast,setshowToast] = useState(false);
    const [idUser,setIdUser] = useState(null);
    
    //array para mapear campos errados          |name |email|alias|phone|desc
    const [errorArray,setErrorArray] = useState([true,true,true,true,true]);
    const [fabVisible, setfabVisible] = useState(true);


    const [isLoadingSpinner,setIsLoadingSpinner] = useState(false);
    const [isLoadingButton,setIsLoadingButton] = useState(false);
    
    const modalizeRef = useRef(null);
    

    const onOpen = () => {
        // console.log("abrindo modalize")
        setfabVisible(false)
        modalizeRef.current?.open();
    };

    const onClose =()=>{
        // console.log("fechando modalize");
        setfabVisible(true);
        modalizeRef.current?.close();

    }

    const dismissBottomToast = () => {
       setshowToast(false);
      }


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
        onOpen();
    }
    
    const validateClient = (field,value) =>{

        let result = [true,true,true,true,true];

        if ( (!newName && !newAlias) || ( newName && newName.length <=1) ||( newEmail && newEmail.length <= 1 ) ){
           result[0]   = false;
        }

        if ( !newEmail || !ValidationFunction(newEmail,"EMAIL")) {
            result[2] = false;
        }
        if (!ValidationFunction(newPhone,"PHONE")) {
            console.log(newPhone)
            result[3] = false;
        }

       return result;

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
           let isSucess =  await updateById('clients',dataAux,idUser)

            if (isSucess) {
                cleanState();
                onClose()
                // showToastWithGravityAndOffset("Alterado com Sucesso !");
                setshowToast(true);

                // const clientsAux = await findAll('clients');
                // setData(clientsAux);
                getClients();
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
           let isSucess =  await deleteById('clients',idUser)

            if (isSucess) {
                cleanState();
                onClose();
                // showToastWithGravityAndOffset("Deletado com Sucesso !");
                setshowToast(true);
                // const clientsAux = await findAll('clients');
                // setData(clientsAux);
                getClients();

            }else {
                Alert.alert("Erro ao deletar");
            }
            
        } catch (error) {
            console.log('result',error);
            
        }
        onClose();

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
         
        // setErrorArray()
        //Validation-> altera o errotArray validando dados do client
        let result = validateClient();

        console.log(result);

        let auxValidate = result.reduce((sum, next) => sum && next, true);
        
        // console.log(auxValidate)
        if (auxValidate){
            try {
                isSucess =  await addData('clients',dataAux);

                if (isSucess) {
                    setIsLoadingButton(false);
                    cleanState();
                    onClose();
                    // showToastWithGravityAndOffset("Sucesso !");
                    setshowToast(true);

                    // const clientsAux = await findAll('clients');
                    // setData(clientsAux);
                    getClients();
                }else {
                    Alert.alert("Erro ao Salvar");
                }
                
            } catch (error) {
                console.log('result',error);
                
            }
            setIsLoadingButton(false);
            setErrorArray([true,true,true,true,true])
        }
        else {
            setIsLoadingButton(false);
            setErrorArray(result);
        }
        setIsLoadingButton(false);
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
    
    const newModalHandleClient = () =>(
        <Modalize ref={modalizeRef} 
         onClose={()=> setfabVisible(true)}
         modalStyle={{backgroundColor:'#E8ECF5'}}
         >
        {/* <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"} > */}
        
            <View   >
             <Text style={{marginTop : 5,textAlign:'center',fontSize:20,fontWeight:'900',color:'#024059'}}>{isUpdate ? 'Alterando': 'Novo Cliente'}</Text>
                <InputCustom 
                    label={'Nome'}
                    placeholder={'Paulo'}
                    value={newName}
                    setText={setNewName}
                    renderErrorMessage ={!errorArray[0]}
                    errorMessage={ errorArray[0] ? '' :"Digite o nome ou um Apelido Válido"}
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
                        renderErrorMessage ={!errorArray[3]}
                        errorMessage={errorArray[3] ? '':"Informe um telefone válido"}
                        keyboardType={'phone-pad'}
                        />

                </View>
                <InputCustom 
                    label={'Email'}
                    placeholder={'seupaulo@email.com.br'}
                    value={newEmail}
                    setText={setNewEmail}
                    renderErrorMessage ={!errorArray[2]}
                    errorMessage={errorArray[2] ?'':"Preencha um e-mail válido"}
                    keyboardType={'email-address'}
                    />
                <InputCustom 
                    label={'Obs.'}
                    placeholder={'Ótimo Cliente'}
                    value={newDesc}
                    setText={setNewDesc}
                    multiline={true}
                    numLine={4}
                    />
                
                <View style={styles.buttonGroup}>
                    {isUpdate ?
                        <Button
                        containerStyle ={{padding:5}}
                        buttonStyle = {{backgroundColor:'#F25050',borderWidth:1,borderColor:'#F25050',width:100,borderRadius:10}}
                        title="Apagar"
                        onPress={()=> { removeClient(); }}
                        />
                        : null }
                    <Button
                        containerStyle ={{padding:5}}
                        buttonStyle = {{borderColor:'#024059',borderWidth:1,width:100,borderRadius:10}}
                        titleStyle={{color:'#024059'}}
                        title="Cancelar"
                        type={'outline'}
                        onPress={()=> {setErrorArray([true,true,true,true,true]) ; onClose()}}
                        />
                    <Button
                        containerStyle ={{padding:5}}
                        buttonStyle = {{backgroundColor:'#23cf5c',borderWidth:1,borderColor:'#23cf5c',width:100,borderRadius:10}}
                        title={isUpdate ? "Alterar" :"Adicionar"}
                        loading={isLoadingButton}
                        onPress= {() =>  {
                            setIsLoadingButton(true);
                            setTimeout(() => {
                                if (isUpdate){
                                    updateClients();                                
                                }else{
                                    addClient();
                                }
                              }, 1000);
                        }
                        }
                        />
                </View>
            </View>
        {/* </KeyboardAvoidingView> */}
        </Modalize>

    );
  

    const getClients  = async ()=>{
        setIsLoadingSpinner(true);
        let dataaux = await findAll('clients');
        setData(dataaux);
        setTimeout(() => {
            setIsLoadingSpinner(false);
          }, 300);
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
                                <FontAwesome5 name= 'chevron-left' size = {35} color={'#024059'} />
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
                    {isLoadingSpinner ? 
                         <DotIndicator color='white' />
                    :

                        <FlatList
                            data ={data}
                            style = {styles.list}
                            keyExtractor={client => String(client.id)}
                            showsVerticalScrollIndicator = {false}
                            renderItem ={ ({item:client,index}) =>(
                                
                                _renderItem(client,index)
                                )}
                        />
                    }
                </View>
             {newModalHandleClient()}
            </View>
                <FAB
                    style={styles.fab}
                    visible={fabVisible}
                    icon="plus"
                    // onPress={() => { cleanState(); setIsUpdate(false);  setVisible(true);}}
                    onPress={() => { cleanState(); setIsUpdate(false); onOpen() ;}}
                />
                <Toast
                    // renderAttachment={this.renderBelowToast}
                    visible={showToast}
                    position={'bottom'}
                    backgroundColor={Colors.green30}
                    message="Toast with two lines of text. Toast with two lines of text"
                    onDismiss={dismissBottomToast}
                    // autoDismiss={3000}
                    showDismiss={true}
                    // action={{iconSource: Assets.icons.x, onPress: () => console.log('dismiss')}}
                    />
        </KeyboardAvoidingView>
    )
}

export default index;

