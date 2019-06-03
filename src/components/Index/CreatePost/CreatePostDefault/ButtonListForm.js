import React, { Fragment, memo } from 'react';
import { View, Image } from 'react-native';
import { Button } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AppStyle from '../../../../theme/index';
import { CreatePostContext } from '../CreatePostProvider';

export const ButtonListForm = memo(() => {
    const _onChooseImage = (context) => {
        const options = {
            skipBackup: true,
            path: 'images',
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.uri) {
                context._onSetPostImage(response)
            }
        });
    }
    const _onCancelImage = (context) => {
        context._onSetPostImage(null)
    }
    return (
        <CreatePostContext.Consumer>
            {context => (
                <Fragment>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 5 }}>
                        <Button
                            icon='collections'
                            mode="text" color='#666'
                            style={{ flex: 1, margin: 2, alignItems: 'flex-start' }}
                            onPress={() => _onChooseImage(context)}>
                            Hình ảnh
                    </Button>
                        <Button mode="text" icon='ondemand-video' color='#666' style={{ flex: 1, margin: 2, alignItems: 'flex-start' }} onPress={() => console.log('Pressed')}>
                            Video
                    </Button>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 5 }}>
                        <Button icon='camera' mode="text" color='#666' style={{ flex: 1, margin: 2, alignItems: 'flex-start' }} onPress={() => console.log('Pressed')}>
                            Máy ảnh
                    </Button>
                        <Button mode="text" icon='help' color='#666' style={{ flex: 1, margin: 2, alignItems: 'flex-start' }} onPress={() => console.log('Pressed')}>
                            Thăm dò
                    </Button>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 5 }}>
                        <Button mode="text" icon='ondemand-video' color='#666' style={{ flex: 1, margin: 2, alignItems: 'flex-start' }} onPress={() => console.log('Pressed')}>
                            Ai có quyền xem bài viết?
                    </Button>
                    </View>
                    {context.postDefaultData.postImage && (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <View>
                                <Icon name='close-circle'
                                    color={AppStyle.styleVariable.mainColor}
                                    style={{ position: 'absolute', top: -10, left: -10, zIndex: 9999 }}
                                    size={25}
                                    onPress={() => _onCancelImage(context)} />
                                <Image
                                    source={{ uri: context.postDefaultData.postImage.uri }}
                                    style={{
                                        borderColor: '#ccc', borderWidth: 1, borderRadius: 5,
                                        width: context.postDefaultData.postImage.height < context.postDefaultData.postImage.width ? AppStyle.styleVariable.width100 * 0.5 : AppStyle.styleVariable.width100 * 0.25
                                        , height: context.postDefaultData.postImage.height < context.postDefaultData.postImage.width ? AppStyle.styleVariable.width100 * 0.5 * (context.postDefaultData.postImage.height / context.postDefaultData.postImage.width) : AppStyle.styleVariable.width100 * 0.25 * (context.postDefaultData.postImage.height / context.postDefaultData.postImage.width)
                                    }}
                                />
                            </View>
                        </View>
                    )}
                </Fragment>
            )}
        </CreatePostContext.Consumer>
    )

})
