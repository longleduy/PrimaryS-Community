import {Easing,Animated} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import HomeScreen from '../../containers/Index/HomeScreen';
import SearchScreen from '../../containers/Index/SearchScreen';
import CreatePostScreen from '../../containers/Index/CreatePostScreen';
import UserProfileScreen from '../../containers/Index/UserProfileScreen';
import CommentScreen from '../../containers/Index/CommentScreen';

export const HomeStackNavigator = createStackNavigator({
    Home: HomeScreen,
    HomeSearch: SearchScreen,
    CreatePost: CreatePostScreen,
    UserProfileStack: UserProfileScreen,
    CommentStack: CommentScreen
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
HomeStackNavigator.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
      tabBarVisible = false;
    }
    return {
      tabBarVisible,
    };
  };
