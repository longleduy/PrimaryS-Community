import React, { memo, Fragment, useState } from 'react';
import { View, Text, Picker } from 'react-native';
import { Kohana } from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CreateRecruitmentPostContext } from './CreateRecruitmentPostProvider';
import AppStyle from '../../../theme';
export const RecruitmentPostForm = memo(() => {
    return (
        <CreateRecruitmentPostContext.Consumer>
            {context => (
                <Fragment>
                    <View style={{ marginTop: 5, paddingHorizontal: 15, paddingVertical: 10, flex: 1 }}>
                        <View style={{ flexDirection: 'column', height: 120 }}>
                            {/* <Text style={{ fontWeight: 'bold' }}>Công ty: </Text> */}
                            <Kohana
                                label='Công ty, doanh nghiệp'
                                value={context.recruitmentPostData.company}
                                iconClass={Icon}
                                iconName='business-center'
                                iconColor={AppStyle.styleVariable.actionButtonColor}
                                inputStyle={{ color: '#666', fontSize: 15 }}
                                inputPadding={14}
                                style={{
                                    borderWidth: context.emptyInput === 'company' ?1.5:.5,
                                    borderColor: context.emptyInput === 'company' ? 'red' : '#ccc',
                                    borderRadius: 5, marginVertical: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                labelStyle={{ color: context.emptyInput === 'company' ?'red':'#aaa', fontSize: 15 }}
                                useNativeDriver
                                onChangeText={e => context._onHandleTextInput('company', e)}
                            />
                            <Kohana
                                label='Địa chỉ'
                                value={context.recruitmentPostData.address}
                                iconClass={Icon}
                                iconName='room'
                                iconColor={AppStyle.styleVariable.actionButtonColor}
                                inputStyle={{ color: '#666', fontSize: 15 }}
                                inputPadding={14}
                                style={{
                                    borderWidth: context.emptyInput === 'address' ?1.5:.5,
                                    borderColor: context.emptyInput === 'address' ? 'red' : '#ccc',
                                    borderRadius: 5, marginVertical: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                labelStyle={{ color: context.emptyInput === 'address' ?'red':'#aaa', fontSize: 15 }}
                                useNativeDriver
                                onChangeText={e => context._onHandleTextInput('address', e)}
                            />
                        </View>
                        {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon
                                name='info'
                                size={15}
                                color={AppStyle.styleVariable.mainColor}
                                style={{ marginRight: 3 }} />
                            <Text style={{ fontWeight: 'bold' }}>Địa chỉ: </Text>
                            <TextInput
                                placeholder='Nhập địa chỉ...'
                                onChangeText={e => context._onHandleTextInput('address', e)}
                            />
                        </View> */}
                    </View>
                </Fragment>
            )}
        </CreateRecruitmentPostContext.Consumer>
    )

})