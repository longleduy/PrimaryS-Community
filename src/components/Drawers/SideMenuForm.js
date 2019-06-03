import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { IconButton, Button } from 'react-native-paper';
import {withApollo} from 'react-apollo'
import PropTypes from 'prop-types';
import {  View, Image, Text, Dimensions, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import AppStyle from '../../theme/index'
let width = Dimensions.get('window').width
class SideMenuForm extends React.Component {
    render() {
        let userInfo;
        try {
            userInfo = this.props.navigation.state.params.userInfo
        } catch (error) {}
        return (
            <View style={{ flex: 1, alignItems: "center" }} >
                <ImageBackground source={require('../../assets/wallpaper.png')} style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <IconButton icon='keyboard-backspace'
                        size={40}
                        color='white'
                        style={AppStyle.StyleHomeDrawer.backButton}
                        onPress={() => this.props.navigation.closeDrawer()} />
                    <View style={{ flex: 1.1, width, alignItems: 'center' }}>
                    </View>
                    <View style={AppStyle.StyleHomeDrawer.mainContent}>
                        <IconButton icon='exit-to-app'
                            style={AppStyle.StyleHomeDrawer.logOutButton}
                            size={35}
                            color='#666'
                            onPress={async () => {
                                const removeItemAsync = AsyncStorage.removeItem('@token');
                                const resetStoreAsync = this.props.client.resetStore();
                                await removeItemAsync;
                                await resetStoreAsync;
                                this.props.navigation.navigate('Sign')
                            }} />
                        <View style={AppStyle.StyleHomeDrawer.childContentView}>
                            <Image
                                source={userInfo && userInfo.data ? { uri: userInfo.data.queryUserInfo.avatar } : { uri: null }}
                                style={AppStyle.StyleHomeDrawer.avatar}
                            />
                            <View style={{ alignItems: 'center' }}>
                                <Text style={AppStyle.StyleHomeDrawer.userName}>{userInfo && userInfo.data ?  userInfo.data.queryUserInfo.avatar :  null}</Text>
                                <Text style={AppStyle.StyleHomeDrawer.address}>Hà Nội, Việt Nam</Text>
                            </View>
                            <View style={AppStyle.StyleHomeDrawer.buttonView}>
                                <Button
                                    icon={() => <View style={AppStyle.StyleHomeDrawer.iconButtonView}><Icon name="settings" size={25} /></View>}
                                    mode="text"
                                    contentStyle={AppStyle.StyleHomeDrawer.actionButtonContent}
                                    color='#666'
                                    style={AppStyle.StyleHomeDrawer.actionButton}
                                    onPress={() => console.log('Pressed')}>
                                    <Text style={AppStyle.StyleHomeDrawer.textButton}>Cài đặt</Text>
                                </Button>
                                <Button
                                    icon={() => <View style={AppStyle.StyleHomeDrawer.iconButtonView}><Icon name="create" size={25} /></View>}
                                    mode="text"
                                    contentStyle={AppStyle.StyleHomeDrawer.actionButtonContent}
                                    style={AppStyle.StyleHomeDrawer.actionButton}
                                    color='#666'
                                    onPress={() => console.log('Pressed')}>
                                    <Text style={AppStyle.StyleHomeDrawer.textButton}>Thay đổi thông tin</Text>
                                </Button>
                                <Button
                                    icon={() => <View style={AppStyle.StyleHomeDrawer.iconButtonView}><Icon name="security" size={25} /></View>}
                                    mode="text"
                                    contentStyle={AppStyle.StyleHomeDrawer.actionButtonContent}
                                    color='#666'
                                    style={AppStyle.StyleHomeDrawer.actionButton}
                                    onPress={() => console.log('Pressed')}>
                                    <Text style={AppStyle.StyleHomeDrawer.textButton}>Tài khoản & bảo mật</Text>
                                </Button>
                                <Button
                                    icon={() => <View style={AppStyle.StyleHomeDrawer.iconButtonView}><Icon name="error-outline" size={25} /></View>}
                                    mode="text"
                                    contentStyle={AppStyle.StyleHomeDrawer.actionButtonContent}
                                    color='#666'
                                    style={AppStyle.StyleHomeDrawer.actionButton}
                                    onPress={() => console.log('Pressed')}>
                                    <Text style={AppStyle.StyleHomeDrawer.textButton}>Thông tin về ứng dụng</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}
SideMenuForm.propTypes = {
    navigation: PropTypes.object
}
export default withApollo(SideMenuForm);