import {Easing,Animated} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import QRCodeScreen from '../../containers/QRCode/QRCodeScreen';
import ScannerScreen from '../../containers/QRCode/ScannerScreen';


export const QRCodeStackNavigator = createStackNavigator({
    QRCode: QRCodeScreen,
    Scanner: ScannerScreen
},{
  transitionConfig: () => ({
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
  })
})
QRCodeStackNavigator.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
      tabBarVisible = false;
    }
    return {
      tabBarVisible,
    };
  };
