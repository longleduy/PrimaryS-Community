import React, { memo, Fragment, useState } from 'react';
import { View, Text, TextInput, Picker } from 'react-native';
import { Kohana } from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CreateRecruitmentPostContext } from './CreateRecruitmentPostProvider';
import AppStyle from '../../../theme';
export const RecruitmentPostForm4 = memo(() => {
    return (
        <CreateRecruitmentPostContext.Consumer>
            {context => (
                <Fragment>
                    <View style={{ paddingHorizontal: 15, marginVertical: 10, flex: 1 }}>
                        <View>
                            <TextInput
                                placeholder='Ghi chú...'
                                value={context.recruitmentPostData.postContent}
                                multiline={true} style={{
                                    paddingVertical: 10,
                                    borderWidth: context.emptyInput === 'postContent' ?1.5:.5,
                                    borderColor: context.emptyInput === 'postContent'?'red':'#ccc',
                                    borderRadius: 4,
                                    paddingHorizontal: 10
                                }}
                                numberOfLines={5} textAlignVertical='top' 
                                onChangeText={e => context._onHandleTextInput('postContent', e)}/>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                            <Kohana
                                label='Email liên hệ...'
                                value={context.recruitmentPostData.emailAddress}
                                keyboardType='email-address'
                                iconClass={Icon}
                                iconName='contact-mail'
                                iconColor={AppStyle.styleVariable.actionButtonColor}
                                inputStyle={{ color: '#666', fontSize: 15 }}
                                inputPadding={14}
                                style={{
                                    borderWidth: context.emptyInput === 'emailAddress' ?1.5:.5,
                                    borderColor: context.emptyInput === 'emailAddress' ? 'red' : '#ccc',
                                    borderRadius: 5, marginVertical: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                labelStyle={{ color: context.emptyInput === 'emailAddress' ?'red':'#aaa', fontSize: 15 }}
                                useNativeDriver
                                onChangeText={e => context._onHandleTextInput('emailAddress', e)}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                            <Kohana
                                label='Số điện thoại liên hệ...'
                                value={context.recruitmentPostData.phoneNumber}
                                keyboardType='numeric'
                                iconClass={Icon}
                                iconName='contact-phone'
                                iconColor={AppStyle.styleVariable.actionButtonColor}
                                inputStyle={{ color: '#666', fontSize: 15 }}
                                inputPadding={14}
                                style={{
                                    borderWidth: context.emptyInput === 'phoneNumber' ?1.5:.5,
                                    borderColor: context.emptyInput === 'phoneNumber' ? 'red' : '#ccc',
                                    borderRadius: 5, marginVertical: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                labelStyle={{ color: '#aaa', fontSize: 15 }}
                                useNativeDriver
                                onChangeText={e => context._onHandleTextInput('phoneNumber', e)}
                            />
                        </View>
                    </View>
                </Fragment>
            )}
        </CreateRecruitmentPostContext.Consumer>
    )

})