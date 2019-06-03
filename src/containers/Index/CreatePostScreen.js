import React, { PureComponent } from 'react';
import { IconButton, Surface } from 'react-native-paper'
import { View, Dimensions, ProgressBarAndroid, Text } from 'react-native'
import CreatePostProvider from '../../components/Index/CreatePost/CreatePostProvider'
import AppStyle from '../../theme/index'
class CreatePostScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        let _isHiddenHeaderBar;
        try {
            _isHiddenHeaderBar = navigation.state.params._isHiddenHeaderBar;
        } catch (error) { }
        return {
            headerTitle: <View style={{ flex: 1 }}>

                {_isHiddenHeaderBar ? <ProgressBarAndroid styleAttr="Horizontal"
                    color={AppStyle.styleVariable.mainColor}
                /> :
                    <Text style={{ fontSize: 17, fontWeight: 'bold',color:'white' }}>Đăng bài viết</Text>}
            </View>,
            headerTintColor: 'white',
            headerTitleStyle: { color: 'white' },
            headerStyle: {
                backgroundColor: AppStyle.styleVariable.mainColor,
                color: 'white'
            }
            //headerTransparent: true
        }
    }
    render() {
        return (
            <CreatePostProvider navigation={this.props.navigation} />
        )
    }
}
export default CreatePostScreen