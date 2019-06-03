import { Dimensions } from 'react-native';
import { createDrawerNavigator } from 'react-navigation'
import { HomeTabNavigator } from '../tab_navigator/HomeTabNavigator'
import SideMenuScreen from '../../containers/Drawers/SideMenuScreen'
let width = Dimensions.get('window').width

export const HomeDrawerNavigator = createDrawerNavigator({
    HomeDrawer: HomeTabNavigator,
},
    {
        contentComponent: SideMenuScreen,
        drawerWidth: width
    });
