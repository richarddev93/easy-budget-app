import React,{useState,useEffect}from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { AsyncStorage ,View,ActivityIndicator} from 'react-native';

// Telas
import budgetList from './src/budget_list'
import clients from './src/clients_list'
import dashboard from './src/dashboard'
import servicesList from './src/service_list'
import supplies from './src/budget_list'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


function Routes() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
   

//   const  _retrieveData = async () => {
//     let tokenUser = null
//      try {
//        let value = await AsyncStorage.getItem('dados_usuario');
//        if (value !== null) {
           
//            tokenUser = JSON.parse(value)
//           //  console.log('value',tokenUser.token)
//          setUserToken(tokenUser.token)
//          api.defaults.headers.common['Authorization'] = `Token ${tokenUser.token}`
//        }

//        return tokenUser;

//      } catch (error) {
//        console.log("34 - _retrieveData() - routes",error)
//      }
//    }
    
  useEffect(   ()=> {
    // _retrieveData();
    setTimeout( ()=>{
      setIsLoading(false);
    },1000);

  }, []);

   
  if (isLoading){
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large" color="#F9AA33"/>
      </View>
    )
  }else {
    
    return (
      <NavigationContainer >
        <Drawer.Navigator initialRouteName="Dashboard">
          <Drawer.Screen name="Dashboard" component={dashboard} />
          <Drawer.Screen name="Budget" component={budgetList} />
          <Drawer.Screen name = "Clients" component ={clients}/>
          <Drawer.Screen name = "Supplies" component ={supplies}/>               
          <Drawer.Screen name = "Services" component ={servicesList}/>   

        </Drawer.Navigator>
        
          {/* <RootStackScreen />
         <Stack.Navigator initialRouteName ={ "Dashboard" } screenOptions = {{ headerShown: false  }}>
            <Stack.Screen name = "Dashboard"  component ={dashboard}/>
            <Stack.Screen name = "Clients" component ={clients}/>
            <Stack.Screen name = "Budget" component ={budgetList}/>               
            <Stack.Screen name = "Supplies" component ={supplies}/>               
            <Stack.Screen name = "Services" component ={servicesList}/>               
        </Stack.Navigator> */}
      
     </NavigationContainer>
   );
  }
}

export default Routes;

