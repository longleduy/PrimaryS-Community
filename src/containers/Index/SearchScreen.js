import React, { PureComponent } from 'react';
import { IconButton, Surface } from 'react-native-paper'
import { View, Dimensions, TextInput,Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchForm from '../../components/Index/SearchForm'
import AppStyle from '../../theme/index'
let width = Dimensions.get('window').width
class SearchScreen extends PureComponent {
    static navigationOptions = ({ navigation, screenProps }) => {
        return {
            headerLeft: <View style={[AppStyle.StyleMain.flexViewCenter, { width }]}><Surface
                style={AppStyle.StyleHeader.headerSearch2}>
                <View style={AppStyle.StyleHeader.headerSearch2View}>
                    <IconButton icon='navigate-before' size={width * (1 / 12)}
                        onPress={() => navigation.goBack()} />
                </View>
                <TextInput placeholder='Tìm kiếm'
                    placeholderTextColor='#777'
                    style={AppStyle.StyleHeader.headerSearch2TextInput} />
                <Icon name='search' size={width * (1 / 14)}
                    style={AppStyle.StyleHeader.headerSearch2Icon} />
            </Surface></View>,
            headerStyle: {
                borderBottomWidth: 0,
                elevation: 0,
                backgroundColor:'transparent',
            }
            ,
            headerTransparent: true
        }
    }
    render() {
        return (
            <SearchForm navigation={this.props.navigation} />
        )
    }
}
export default SearchScreen