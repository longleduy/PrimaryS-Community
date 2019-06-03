import {
    StyleSheet
} from 'react-native';
import styleVariable from './StyleVariable';

const StyleCommon = StyleSheet.create({
    viewMain: {
        padding: 20
    },
    button1: {
        backgroundColor: styleVariable.mainColor,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontWeight: 'bold'
    }
});
export default StyleCommon;