import React, { memo, Fragment, useState } from 'react';
import { View, Text, TextInput, Picker } from 'react-native';
import { Kohana, Kaede } from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CreateRecruitmentPostContext } from './CreateRecruitmentPostProvider';
import AppStyle from '../../../theme';
export const RecruitmentPostForm3 = memo(() => {
    return (
        <CreateRecruitmentPostContext.Consumer>
            {context => (
                <Fragment>
                    <View style={{ marginTop: 5, paddingLeft: 15, paddingRight: 15, flex: 1 }}>
                        <View style={{ flexDirection: 'column', height: 60 }}>
                            <Kohana
                                label='Số lượng tuyển dụng'
                                value={(context.recruitmentPostData.number).toString()}
                                keyboardType='numeric'
                                iconClass={Icon}
                                iconName='group-add'
                                iconColor={AppStyle.styleVariable.actionButtonColor}
                                inputStyle={{ color: '#666', fontSize: 15 }}
                                inputPadding={14}
                                style={{
                                    borderWidth: context.emptyInput === 'number' ?1.5:.5,
                                    borderColor: context.emptyInput === 'number' ? 'red' : '#ccc',
                                    borderRadius: 5, marginVertical: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                labelStyle={{ color: '#aaa', fontSize: 15 }}
                                useNativeDriver
                                onChangeText={e => context._onHandleTextInput('number', e)}
                            />
                        </View>
                        <View style={{ flexDirection: 'column', marginTop: 15 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text>Mức lương: </Text>
                                <Picker
                                    selectedValue={context.recruitmentPostData.salary.currency}
                                    style={{ height: 30, width: 100 }}
                                    onValueChange={(itemValue, itemIndex) =>
                                        context._onHandleSalary('currency', itemValue)
                                    }>
                                    <Picker.Item label="VND" value="vnd" />
                                    <Picker.Item label="USD" value="usd" />
                                    <Picker.Item label="MAN" value="man" />
                                </Picker>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    placeholder='Từ...'
                                    keyboardType='numeric'
                                    value={context.recruitmentPostData.salary.from}
                                    style={{
                                        flex: 1,
                                        borderWidth: context.emptyInput === 'from' ?1.5:.5,
                                        borderColor: context.emptyInput === 'from' ? 'red' : '#ccc',
                                        borderRadius: 5,
                                        marginVertical: 5,
                                        marginRight: 5,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        paddingHorizontal: 15
                                    }}
                                    onChangeText={e => context._onHandleSalary('from', e)}
                                />
                                <TextInput
                                    placeholder='đến...'
                                    keyboardType='numeric'
                                    value={context.recruitmentPostData.salary.to}
                                    style={{
                                        flex: 1,
                                        borderWidth: context.emptyInput === 'to' ?1.5:.5,
                                        borderColor: context.emptyInput === 'to' ? 'red' : '#ccc',
                                        borderRadius: 5,
                                        marginLeft: 5,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        paddingHorizontal: 15,
                                        marginHorizontal: 5,
                                    }}
                                    onChangeText={e => context._onHandleSalary('to', e)}
                                />
                            </View>
                        </View>

                    </View>
                </Fragment>
            )}
        </CreateRecruitmentPostContext.Consumer>
    )

})