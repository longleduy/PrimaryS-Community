import {
    StyleSheet
} from 'react-native';
import StyleVariable from '../StyleVariable';

const StyleUserProfile = StyleSheet.create({
    redZone: {
        justifyContent: 'space-around',
        alignItems: 'center',
        flex: 4,
        backgroundColor: styleVariable.mainColor,
        width: styleVariable.width100
    },
    profileNameView: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileNameText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 25
    },
    addressView: {
        marginTop: 5,
        alignItems: 'center',
        flexDirection: 'column'
    },
    addressText: { color: 'white' },
    genderText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
    },
    avatarView: {
        elevation: 10,
        borderColor: "white",
        borderRadius: 100,
        borderWidth: 2
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: styleVariable.width100 * 0.6
    },
    buttonStyle: {
        borderWidth: 1,
        borderColor: '#ffffff80',
        borderRadius: 100,
        backgroundColor: '#ffffff33',
        padding: 7
    },
    userInfoView: {
        flexDirection: 'row',
        paddingRight: 15,
        paddingLeft: 15,
        paddingTop: 10,
        paddingBottom: 10
    },
    userInfoViewChild: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    userInfoIcon: {
        marginRight: 10,
        color: StyleVariable.mainColor
    },
    userInfoText: {
        fontSize: 15,
        //color: StyleVariable.mainColor,
        //fontWeight: 'bold'
    },
    userInfoTextTitle : {
        fontSize: 15,
        color: StyleVariable.mainColor,
        fontWeight: 'bold'
    },
    friendImage : {
        borderWidth:1,
         borderColor: StyleVariable.mainColor,
         borderRadius:100
    },
    userInfoOptionView: {padding:10,
        flexDirection:'row',
        justifyContent:'center'
    },
    userInfoOptionButton : {
        marginRight:7, 
        marginLeft:7,
        borderRadius: 4,
        padding:2
    },
    userInfoOptionIcon : {
        
    }
});
export default StyleUserProfile;