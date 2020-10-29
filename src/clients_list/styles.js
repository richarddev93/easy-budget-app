import { StyleSheet} from 'react-native'
import Constants from 'expo-constants';


export default styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#E8ECF5'

    },
    header :{
        height:50,
        backgroundColor: '#fff',
        marginTop:20
    },
    title :{
        fontSize:20,
        color:'#024059'
    },
    inputSearch :{
        flex: 1,
        marginHorizontal:10,     
    },
    buttonContainer :{
        flex:3,
        flexDirection: 'row',
        alignContent: 'space-between',
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    buttonDashboard :{
        flex:1,
        backgroundColor:'#fff',
        borderRadius : 10,
        borderColor :'gray',
        shadowColor: "#024059",
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal:10,
       
        
    },titleButton :{
        marginTop:5,
        color:'#024059',
        fontSize:20,
    },
    containerItem :{
        flex:1,
        flexDirection: 'column',
        paddingTop:10 ,
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        borderColor :'gray'
        
        
    },
    containerInput :{
        backgroundColor:'#fff',
        borderRadius : 10,
        borderColor :'gray',
        shadowColor: "#2A2AC0",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 3, 
        padding:5,
        fontSize:17,

    },
    headerStyle: {
        marginTop: 1,
        alignContent:'flex-start',
        marginTop:Constants.statusBarHeight,
        marginBottom : 10,   
    },
    headerTop:{                
        flexDirection:'row',            
        justifyContent:'space-between',
        marginVertical:5,
        paddingHorizontal:10
    },
    headerBottom: {
        flexDirection:'row', 
        justifyContent:'space-between',
        paddingHorizontal:15,
        alignItems:"center",
        marginBottom:10,
        marginTop:10
        
    },
    list: {
        padding: 10,
    },
    clientName :{
      fontSize:18,
      fontWeight :'bold'  ,
      color:'#262626',
      fontStyle:'italic',
    //   textDecorationLine : 'underline'
    },
    clientEmail :{
        flex:1,
        flexWrap: 'wrap',
        fontSize:15,
    },
    clientTel :{
        color :'#009a2d'
    },
    clientDescContainer :{
        flex:1.5,
        justifyContent: 'flex-start',
        
    },   
    clientDescObs:{
        flex:1,
        justifyContent: 'flex-start',
    },
    clientDescBudgets :{
        flex:1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingRight: 10,
    },   
    clientDescTitle :{
        color :'gray',
        fontSize:15,        
        fontWeight : '700'
    },
    itemAlterar :{
        color :'#2A2AC0',
        fontSize:16,
    },
    clientNumBudget : {
        fontSize :25,
        fontWeight:'bold'
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#2A2AC0',
      },
      buttonGroup :{
          justifyContent: 'flex-end',
          flexDirection: 'row',
          alignContent: 'space-between',
      },
      FormAddClient :{
          justifyContent: 'center',
          height:'100%' ,
      },
     

    
})
