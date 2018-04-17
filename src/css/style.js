import {StyleSheet} from "react-native";


export default StyleSheet.create({

    topContainer:{
        flex:0.2,
        alignItems:'center',
        backgroundColor:'#607D8B',
    },

    bottomContainer:{
        marginTop:'5%',
        width:'100%',
        height:'100%',
        position: 'absolute',alignItems:'center',justifyContent:'center'
    },

    cardView:{
        width:'90%',
        height:'90%',
        position: 'absolute',
        backgroundColor:'white',

        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity:1,
        shadowRadius: 2,
        elevation: 5,


    },

    malfunctionsCardView:{
        width:'90%',
        height:400,
        backgroundColor:'white',
        margin:20,

        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity:1,
        shadowRadius: 2,
        elevation: 5,
    },

    personsCardView:{
        width:'90%',
        height:200,
        backgroundColor:'white',
        margin:20,

        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity:1,
        shadowRadius: 2,
        elevation: 5,
    },

    textTitle:{
        fontSize:26,
        marginTop:20,
        marginLeft:14,
        fontWeight:'bold',
    },
    textMessage:{
        fontSize:16,
        marginTop:10,
        marginLeft:14,
    },

    textInput:{
        marginLeft:20,
        marginRight:20,
        marginTop:20,
        padding:20,
        fontSize:18,
    },

    button:{
        flex:1,
        fontSize:19,
        fontWeight:"bold",
        height:50,
        marginTop:20,
        backgroundColor:'#FF000000',
        marginHorizontal:50,
        color:'#607D8B'
    }

});
