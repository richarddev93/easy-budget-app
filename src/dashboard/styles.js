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
        fontSize:30,
        color:'#024059'
    },
    inputSearch :{
        flex: 1,
        marginTop:10,
        marginHorizontal:10,  
        marginBottom:10     
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
        backgroundColor:'#fff' ,     
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
        marginBottom:10

    },

    
})
