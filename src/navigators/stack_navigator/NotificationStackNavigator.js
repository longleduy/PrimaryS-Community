import {createStackNavigator} from 'react-navigation';
import NotificationListScreen from '../../containers/Notifications/NotificationListScreen';

export const NotificationStackNavigator = createStackNavigator({
    NotificationStack: NotificationListScreen
})