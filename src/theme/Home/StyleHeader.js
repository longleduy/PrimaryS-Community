import {
    StyleSheet, Dimensions
} from 'react-native';
import styleVariable from '../StyleVariable';

const StyleHeader = StyleSheet.create({
    headerView: {
        justifyContent: 'center',
        flex: 1,
        paddingLeft: 5,
        paddingRight: 10,
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    headerSearchView: { flex: 6, justifyContent: 'center' },
    headerSearchTextInput: { borderBottomColor: '#888', borderBottomWidth: .5, padding: 5, borderRadius: 4 },
    headerSearchIcon: { position: 'absolute', right: 5 },
    headerSearchAvatar: { flex: 1, alignItems: 'flex-end' },
    headerSearch2: {
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderWidth: 0, width: styleVariable.width100*.95,
        elevation:2,
        borderRadius: 4
    },
    
    headerSearch2View : { position: 'absolute', left: 0,zIndex:999},
    headerSearch2TextInput : { backgroundColor:'white',borderColor: '#eee', borderWidth: .5,paddingBottom:7,paddingTop:7, paddingLeft: 60,paddingRight:15, borderRadius: 4 },
    headerSearch2Icon : { position: 'absolute', right: 15 },
    headerSearch3TextInput : { backgroundColor:'white', borderColor: '#ddd', borderWidth: .5,paddingBottom:7,paddingTop:7, paddingLeft: 15,paddingRight:15, borderRadius: 4 },
});
export default StyleHeader;