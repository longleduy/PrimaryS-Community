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
