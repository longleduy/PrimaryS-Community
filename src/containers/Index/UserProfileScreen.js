import React, { PureComponent } from 'react';
import { IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ripple from 'react-native-material-ripple';
//Todo: Styles
import AppStyle from '../../theme/index';
//Todo: Components
import UserProfileForm from '../../components/Index/UserProfileForm';

class UserProfileScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        const {profileData} = navigation.state.params;
        return {
            headerLeft: <IconButton color='white' icon='navigate-before' size={AppStyle.StyleMain.width100 * (1 / 12)}
                onPress={() => navigation.goBack()} />,
            headerRight: <Ripple style={{marginRight:15}} onPress={async () => {
                 await AsyncStorage.setItem('@token','SIGN_OUT');
                navigation.navigate('Sign')
            }}>
                <Icon name='exit-to-app' color='white' size={AppStyle.StyleMain.width100 * (1 / 14)} />
            </Ripple>,
            headerTransparent: true
        }
    }
    render() {
        return (
            <UserProfileForm navigation={this.props.navigation} />
        )
    }
}
export default UserProfileScreen