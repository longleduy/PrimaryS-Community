import {Easing,Animated} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import ChatMessageNotificationScreen from '../../containers/Messages/ChatMessageNotificationScreen';
import ChatMessageScreen from '../../containers/Messages/ChatMessageScreen'

export const MessageStackNavigator = createStackNavigator({
  ChatMessageNotificationStack: ChatMessageNotificationScreen,
  ChatMessageStack: ChatMessageScreen
},
{transitionConfig: () => ({
    transitionSpec: {
      duration: 300,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const { index } = scene;
      const width = layout.initWidth;
      const translateX = position.interpolate({
        inputRange: [index - 1, index],
        outputRange: [width, 0],
      })
      return {transform: [{ translateX }] };
    },
  }),
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