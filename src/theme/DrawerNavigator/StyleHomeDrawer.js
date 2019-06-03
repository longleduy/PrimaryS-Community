import {
    StyleSheet, Dimensions
} from 'react-native';
let width = Dimensions.get('window').width
const StyleHomeDrawer = StyleSheet.create({
    backButton :{ position: 'absolute', left: 5, top: 0 },
    logOutButton : {position: 'absolute',  bottom: 30 ,width:70},
    mainContent :{
        //marginBottom: 15,
        flex: 4,
        width: width,
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: '#ffffffb3',
        elevation: 4,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "grey",
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    avatar :{
        width: width * 0.3,
        height: width * 0.3,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: 'white'
    },
    userName:{ fontWeight: 'bold', fontSize: 25 },
    address:{ fontSize: 14 },
    buttonView : { width: width * 0.9,marginTop:50,alignItems:'stretch' },
    iconButtonView:{width:width * 0.3,marginRight:30},
    actionButtonContent: {padding:5,justifyContent:'flex-start'},
    actionButton : {borderBottomWidth:.5,borderBottomColor:'white'},
    textButton: {fontSize:20,padding:15},
    childContentView :{ position: 'absolute', top: -width * 0.3 * 0.5, alignItems: 'center' }
});
export default StyleHomeDrawer;