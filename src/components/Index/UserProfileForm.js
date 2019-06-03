import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { Avatar, Surface } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ripple from 'react-native-material-ripple';
//Todo: Styles
import AppStyle from '../../theme/index';

class UserProfileForm extends PureComponent {
    render() {
        const profileData = this.props.navigation.getParam('profileData', 'NONE');
        return (
            <View style={AppStyle.StyleMain.flexViewCenter}>
                <View style={AppStyle.StyleUserProfile.redZone}>
                    <View style={AppStyle.StyleUserProfile.profileNameView}>
                        <Text style={AppStyle.StyleUserProfile.profileNameText}>{profileData.userInfo.profileName}</ Text>
                        <View style={AppStyle.StyleUserProfile.addressView}>
                            <Text style={AppStyle.StyleUserProfile.addressText}>Hải Dương, Việt Nam</Text>
                            <Text style={AppStyle.StyleUserProfile.genderText}>
                                {profileData.userInfo.gender === 'M' ? 'Nam' : 'Nữ'}
                            </Text>
                        </View>
                    </View>
                    <Surface style={AppStyle.StyleUserProfile.avatarView}>
                        <Avatar.Image size={AppStyle.styleVariable.width100 / 3.5} source={{ uri: profileData.userInfo.avatar }} />
                    </Surface>
                    <View style={AppStyle.StyleUserProfile.buttonView}>
                        <Ripple onPress={() => false} style={AppStyle.StyleUserProfile.buttonStyle}>
                            <MaterialIcon color='white' name='apple' size={AppStyle.StyleMain.width100 / 3.5 / 4} />
                        </Ripple>
                        <Ripple onPress={() => false} style={AppStyle.StyleUserProfile.buttonStyle}>
                            <MaterialIcon color='white' name='google-play' size={AppStyle.StyleMain.width100 / 3.5 / 4} />
                        </Ripple>
                        <Ripple onPress={() => false} style={AppStyle.StyleUserProfile.buttonStyle}>
                            <MaterialIcon color='white' name='github-face' size={AppStyle.StyleMain.width100 / 3.5 / 4} />
                        </Ripple>
                    </View>
                </View>
                <View style={{ flex: 5, width: AppStyle.styleVariable.width100,justifyContent:'space-between' }}>
                    <View>
                        <View style={AppStyle.StyleUserProfile.userInfoView}>
                            <View style={AppStyle.StyleUserProfile.userInfoViewChild}>
                                <MaterialIcon name='cake-layered'
                                    size={AppStyle.StyleMain.width100 / 3.5 / 5}
                                    style={AppStyle.StyleUserProfile.userInfoIcon} />
                                <Text style={AppStyle.StyleUserProfile.userInfoText}>
                                    {profileData.userInfo.dateOfBirth}
                                </Text>
                            </View>
                            <View style={AppStyle.StyleUserProfile.userInfoViewChild}>
                                <MaterialIcon name='calendar-star'
                                    size={AppStyle.StyleMain.width100 / 3.5 / 5}
                                    style={AppStyle.StyleUserProfile.userInfoIcon} />
                                <Text style={AppStyle.StyleUserProfile.userInfoText}>
                                    27/09/2016
                            </Text>
                            </View>
                        </View>
                        <View style={AppStyle.StyleUserProfile.userInfoView}>
                            <View style={AppStyle.StyleUserProfile.userInfoViewChild}>
                                <MaterialIcon name='briefcase'
                                    size={AppStyle.StyleMain.width100 / 3.5 / 5}
                                    style={AppStyle.StyleUserProfile.userInfoIcon} />
                                <Text style={AppStyle.StyleUserProfile.userInfoText}>
                                    Developers
                            </Text>
                            </View>
                            <View style={AppStyle.StyleUserProfile.userInfoViewChild}>
                                <MaterialIcon name='nodejs'
                                    size={AppStyle.StyleMain.width100 / 3.5 / 4.5}
                                    style={AppStyle.StyleUserProfile.userInfoIcon} />
                                <MaterialIcon name='react'
                                    size={AppStyle.StyleMain.width100 / 3.5 / 4.5}
                                    style={AppStyle.StyleUserProfile.userInfoIcon} />
                                <MaterialIcon name='graphql'
                                    size={AppStyle.StyleMain.width100 / 3.5 / 4.5}
                                    style={AppStyle.StyleUserProfile.userInfoIcon} />
                                <MaterialIcon name='language-java'
                                    size={AppStyle.StyleMain.width100 / 3.5 / 4.5}
                                    style={AppStyle.StyleUserProfile.userInfoIcon} />
                            </View>
                        </View>
                        <View style={AppStyle.StyleUserProfile.userInfoView}>
                            <View style={AppStyle.StyleUserProfile.userInfoViewChild}>
                                <MaterialIcon name='seal'
                                    size={AppStyle.StyleMain.width100 / 3.5 / 5}
                                    style={AppStyle.StyleUserProfile.userInfoIcon} />
                                <Text style={AppStyle.StyleUserProfile.userInfoText}>
                                    Front-end, Back-end
                            </Text>
                            </View>
                        </View>
                        <View style={AppStyle.StyleUserProfile.userInfoView}>
                            <View style={[AppStyle.StyleUserProfile.userInfoViewChild, { flexWrap: 'wrap' }]}>
                                <Text>
                                    <Text style={AppStyle.StyleUserProfile.userInfoTextTitle}>
                                        {`Tốt nghiệp:  `}
                                    </Text>
                                    <Text style={{ marginLeft: 5 }}>
                                        Đại học công nghiệp Hà Nội
                            </Text>
                                </Text>
                            </View>
                        </View>
                        <View style={AppStyle.StyleUserProfile.userInfoView}>
                            <View style={[AppStyle.StyleUserProfile.userInfoViewChild, { flexWrap: 'wrap' }]}>
                                <Text>
                                    <Text style={AppStyle.StyleUserProfile.userInfoTextTitle}>
                                        {`Nơi làm việc hiện tại:  `}
                                    </Text>
                                    <Text>
                                        Công Ty Cổ Phần CNTT Đông Nam Á
                                </Text>
                                </Text>
                            </View>
                        </View>
                        <View style={[AppStyle.StyleUserProfile.userInfoView, { justifyContent: 'space-between', marginTop: 15 }]}>
                            <View style={AppStyle.StyleUserProfile.friendImage}>
                                <Avatar.Image
                                    size={(AppStyle.styleVariable.width100 - 100) / 6}
                                    source={{ uri: 'https://res.cloudinary.com/seatechit/image/upload/v1553588356/oqyvdgpoyeebdcjosxtr.jpg' }}
                                />
                            </View>
                            <View style={AppStyle.StyleUserProfile.friendImage}>
                                <Avatar.Image
                                    size={(AppStyle.styleVariable.width100 - 100) / 6}
                                    source={{ uri: null }}
                                />
                            </View>
                            <View style={AppStyle.StyleUserProfile.friendImage}>
                                <Avatar.Image
                                    size={(AppStyle.styleVariable.width100 - 100) / 6}
                                    source={{ uri: 'https://res.cloudinary.com/seatechit/image/upload/v1553588536/ndobruoq4odpuktjjncw.jpg' }}
                                />
                            </View>
                            <View style={AppStyle.StyleUserProfile.friendImage}>
                                <Avatar.Image
                                    size={(AppStyle.styleVariable.width100 - 100) / 6}
                                    source={{ uri: 'https://res.cloudinary.com/seatechit/image/upload/v1557462630/y8epxrb4dz1i7qcijl7x.png' }}
                                />
                            </View>
                            <View style={AppStyle.StyleUserProfile.friendImage}>
                                <Avatar.Image
                                    size={(AppStyle.styleVariable.width100 - 100) / 6}
                                    source={{ uri: 'https://res.cloudinary.com/seatechit/image/upload/v1557370393/g75ni2vbjm0jkdc0ccu7.jpg' }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={AppStyle.StyleUserProfile.userInfoOptionView}>
                        <Ripple rippleColor='#e42865cc' onPress={() => false} style={AppStyle.StyleUserProfile.userInfoOptionButton}>
                            <MaterialIcon color={AppStyle.styleVariable.mainColor} name='cogs' size={AppStyle.StyleMain.width100 / 3.5 / 4} />
                        </Ripple>
                        <Ripple rippl onPress={() => false} style={AppStyle.StyleUserProfile.userInfoOptionButton}>
                            <MaterialIcon color={AppStyle.styleVariable.mainColor} name='file-document-outline' size={AppStyle.StyleMain.width100 / 3.5 / 4} />
                        </Ripple>
                        <Ripple onPress={() => false} style={AppStyle.StyleUserProfile.userInfoOptionButton}>
                            <MaterialIcon color={AppStyle.styleVariable.mainColor} name='account-edit' size={AppStyle.StyleMain.width100 / 3.5 / 4} />
                        </Ripple>
                        <Ripple onPress={() => false} style={AppStyle.StyleUserProfile.userInfoOptionButton}>
                            <MaterialIcon color={AppStyle.styleVariable.mainColor} name='currency-eth' size={AppStyle.StyleMain.width100 / 3.5 / 4} />
                        </Ripple>
                    </View>
                </View>
            </View>
        )
    }
}
export default UserProfileForm;