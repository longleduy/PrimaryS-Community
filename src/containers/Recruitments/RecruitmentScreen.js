import React, { PureComponent } from 'react';
import { Surface } from 'react-native-paper'
import { View, Dimensions, TextInput, Text, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import RecruitmentForm from '../../components/Recruitments/RecruitmentForm'
import AppStyle from '../../theme/index'
let width = Dimensions.get('window').width
class RecruitmentScreen extends PureComponent {
    static navigationOptions = ({ navigation, screenProps }) => {
        return {
            headerTitle:
                <View style={AppStyle.StyleMain.flexViewCenter}>
                    <Surface
                        style={[AppStyle.StyleHeader.headerSearch2]}>
                        <TextInput placeholder='Tìm kiếm'
                            placeholderTextColor='#777'
                            style={[AppStyle.StyleHeader.headerSearch3TextInput]} />
                        <Icon name='search' size={width * (1 / 14)}
                            style={AppStyle.StyleHeader.headerSearch2Icon} />
                    </Surface>
                </View>,
            headerStyle: {
                borderBottomWidth: 0,
                elevation: 0,
                backgroundColor: 'transparent'
            },
            headerTransparent: true
        }
    }
    render() {
        return (
            <RecruitmentForm/>
        )
    }
}
export default RecruitmentScreen