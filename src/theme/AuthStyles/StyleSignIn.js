import {
    StyleSheet, Dimensions
} from 'react-native';
import styleVariable from '../StyleVariable';

const StyleSignIn = StyleSheet.create({
    logoIcon: { marginTop: 50 },
    loginTextInput: { width: styleVariable.width100 * 0.9, borderColor: '#ddd', borderWidth: 1, borderRadius: 5, paddingLeft: 10,color:'#333' },
    loginTextInput2: { width: styleVariable.width100 * 0.45 - 3, borderColor: '#ddd', borderWidth: 1, borderRadius: 5, paddingLeft: 10 },
    loginTextInputError: {borderColor:styleVariable.mainColor},
    loginButton: { width: styleVariable.width100 * 0.9, borderColor: styleVariable.mainColor },
    loginInputForm: { width: styleVariable.width100 * 0.9, flex: 2, alignItems: 'center' },
    loginForgotView: {
        flexDirection: 'row', justifyContent: 'center',
        alignItems: 'center', marginTop: 10, paddingLeft: 5, paddingRight: 5
    },
    loginSocial : {width: styleVariable.width100 * 0.9,justifyContent: 'center',flexDirection:'row',marginTop:15},
    loginSocialIconFb: {width: styleVariable.width100 * 0.1,height: styleVariable.width100 * 0.1,borderWidth:1,borderColor:'blue',borderRadius:50,padding:0},
    loginFingerprint: {width: styleVariable.width100 * 0.1,height: styleVariable.width100 * 0.1,borderWidth:1,borderColor:'green',borderRadius:50,padding:0},
    loginSocialIconGg: {width: styleVariable.width100 * 0.1,height: styleVariable.width100 * 0.1,borderWidth:1,borderColor:'red',borderRadius:50,padding:0},
    signErrorView : {flexDirection:'row',alignItems:'center',width: styleVariable.width100 * 0.9,padding:5}
});
export default StyleSignIn;