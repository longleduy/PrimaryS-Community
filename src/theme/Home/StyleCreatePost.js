import {
    StyleSheet
} from 'react-native';
import StyleVariable from '../StyleVariable';
let postRoleButton = {
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 4,

}
const StyleCreatePost = StyleSheet.create({
    postRoleView: {
        flexDirection: 'row',
        width: StyleVariable.width100 * 0.75,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    postRoleButtonNotActive: {
        ...postRoleButton,
        backgroundColor: 'rgba(204, 204, 204, .2)'
    },
    postRoleButtonActive: {
        ...postRoleButton,
        backgroundColor: 'rgba(0, 128, 0, .2)'
    },
    postRoleButtonText : {
        color: '#757575',
        fontWeight:'bold'
    },
    postRoleButtonTextActv : {
        color: 'green',
        fontWeight:'bold'
    }
});
export default StyleCreatePost;