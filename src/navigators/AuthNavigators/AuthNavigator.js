import { createSwitchNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import { createFluidNavigator } from 'react-navigation-fluid-transitions'
import LoadingScreen from '../../containers/AuthScreens/LoadingScreen';
import SignInScreen from '../../containers/AuthScreens/SignInScreen';
import SignUpScreen from '../../containers/AuthScreens/SignUpScreen'
import { HomeTabNavigator } from '../tab_navigator/HomeTabNavigator'
import { HomeDrawerNavigator } from '../drawer_navigator/HomeDrawerNavigator'
import {QRCodeTabNavigator} from '../tab_navigator/QRCodeTabNavigator';

const SignSwitchNavigator = createSwitchNavigator({
    SignIn: {
        screen: SignInScreen
    },
    SignUp: {
        screen: SignUpScreen
    },
})
const HomeSwitchNavigator = createSwitchNavigator({
    Sign: SignSwitchNavigator,
    Index: HomeTabNavigator,
    QRCode: QRCodeTabNavigator
}
)
const AuthSwitchNavigator = createFluidNavigator({
    Loading: {
        screen: LoadingScreen
    },
    Home: HomeSwitchNavigator,
    
})
export default createAppContainer(AuthSwitchNavigator);