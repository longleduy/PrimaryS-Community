import React, { PureComponent } from 'react';
import { View, ProgressBarAndroid, Text } from 'react-native'
import CreateRecruitmentPostProvider from '../../components/Recruitments/CreateRecruitmentPost/CreateRecruitmentPostProvider';
import AppStyle from '../../theme/index'
class CreateRecruitmentPostScreen extends PureComponent {
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
                    <Text style={{ fontSize: 17, fontWeight: 'bold',color:'white' }}>Đăng tin tuyển dụng</Text>}
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
            <CreateRecruitmentPostProvider navigation={this.props.navigation} />
        )
    }
}
export default CreateRecruitmentPostScreen