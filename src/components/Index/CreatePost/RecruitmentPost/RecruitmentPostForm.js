import React, { memo, Fragment, useState } from 'react';
import { View, Text, TextInput, Picker } from 'react-native';
import { Button } from 'react-native-paper';
import { ListFrameWork } from './ListFramWorkForm';
import ListRoleForm from './ListRoleForm';
import { CreatePostContext } from '../CreatePostProvider';
import AppStyle from '../../../../theme';
export const RecruitmentPostForm = memo(() => {
    const [listFrameWorks, addToList] = useState([]);
    const _onSelectedItemsChange = selectedItems => {
        this.setState({ selectedItems });
    };
    return (
        <CreatePostContext.Consumer>
            {context => (
                <Fragment>
                    <View style={{ marginTop: 15, paddingLeft: 15, paddingRight: 15 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold' }}>Công ty: </Text>
                            <TextInput
                                placeholder='Nhập tên công ty...' />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold' }}>Địa chỉ: </Text>
                            <TextInput
                                placeholder='Nhập địa chỉ...' />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <ListFrameWork context={context}/>
                        </View>
                        <View>
                            <ListRoleForm />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold' }}>Số lượng: </Text>
                            <TextInput
                                defaultValue='0' />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold' }}>Mức lương từ:  </Text>
                                <TextInput
                                    style={{ width: AppStyle.styleVariable.width100 * 0.18 }} />
                                <TextInput
                                    defaultValue='$' />
                            </View>
                            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold' }}>đến: </Text>
                                <TextInput
                                    style={{ width: AppStyle.styleVariable.width100 * 0.18 }} />
                                <TextInput
                                    defaultValue='$' />
                            </View>
                        </View>
                        <View>
                            <TextInput
                                placeholder='Thông tin khác...'
                                multiline={true} style={{
                                    paddingTop: 10,
                                    borderWidth: .5,
                                    borderColor: '#ccc',
                                    borderRadius: 4
                                }}
                                numberOfLines={7} textAlignVertical='top' />
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            paddingTop: 5
                        }}>
                            <Button icon='collections' mode="text" color='#666' style={{ flex: 1, margin: 2, alignItems: 'flex-start' }} onPress={() => console.log('Pressed')}>
                                Hình ảnh
                    </Button>
                            <Button mode="text" icon='ondemand-video' color='#666' style={{ flex: 1, margin: 2, alignItems: 'flex-start' }} onPress={() => console.log('Pressed')}>
                                Video
                    </Button>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold' }}>Email liên hệ: </Text>
                            <TextInput
                                placeholder='Nhập email...' />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold' }}>Điện thoại liên hệ: </Text>
                            <TextInput
                                placeholder='Nhập số điện thoại...' />
                        </View>
                    </View>
                </Fragment>
            )}
        </CreatePostContext.Consumer>
    )

})