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
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 3,         
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal:10,
       
        
    },titleButton :{
        marginTop:5,
        color:'#024059',
        fontSize:20,
    },
    containerItem :{
        paddingTop:30 ,
        justifyContent: 'flex-start',
        
        
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
    itemDateTitle :{
        color : 'gray',
        fontSize:14,
    },
    itemTitle :{
      fontSize:16,
      fontWeight :'bold'  ,
      color:'#202320'
    },
    itemDesc :{
        fontSize:15,

    },
    itemValor :{
        color :'#009a2d'
    },
    itemContainer :{
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderColor :'#E8ECF5'
    },
    containerInfo :{
        flex:1,
        padding: 5,
    },
    containerButtons :{
        justifyContent: 'space-between',
        padding: 5,
        
    },
    itemEnviar :{
        color :'#2A2AC0',
        fontSize:16,
    },
    itemAlterar :{
        color :'#2A2AC0',
        fontSize:16,
    },
    
})
