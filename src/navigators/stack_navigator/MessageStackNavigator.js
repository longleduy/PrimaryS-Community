import {createStackNavigator} from 'react-navigation';
import MessageListUserScreen from '../../containers/Messages/MessageListUserScreen';
import ChatScreen from '../../containers/Messages/ChatScreen'

export const MessageStackNavigator = createStackNavigator({
    MessageStack: MessageListUserScreen,
    ChatStack: ChatScreen
})
MessageStackNavigator.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
      tabBarVisible = false;
    }
  
    return {
      tabBarVisible,
    };
  };