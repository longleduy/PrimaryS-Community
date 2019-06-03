import React, { PureComponent, Fragment, memo } from 'react';
import { View, Text, TextInput } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { Button, Checkbox } from 'react-native-paper';
import { CreatePostContext } from '../CreatePostProvider'

export const CheckBox1Form = memo(() => {
    return (
        <CreatePostContext.Consumer>
            {context => (
                <Fragment>
                    <View style={{ flexDirection: 'row', paddingLeft: 15, alignItems: 'flex-start' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Checkbox
                                color='green'
                                status={context.postDefaultData.isPublic ? 'checked' : 'unchecked'}
                                onPress={() => context._onChangeCheckBox('CK')}
                            />
                            <Text>Công khai bài viết?</Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingLeft: 15, alignItems: 'center' }}>
                            <Checkbox
                                color='green'
                                status={context.postDefaultData.isComment ? 'checked' : 'unchecked'}
                                onPress={() => context._onChangeCheckBox('BL')}
                            />
                            <Text>Cho phép bình luận?</Text>
                        </View>
                    </View>
                </Fragment>
            )}
        </CreatePostContext.Consumer>
    )

})
