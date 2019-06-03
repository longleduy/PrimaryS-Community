import React, { Component, Fragment, memo } from 'react';
import { View, Text, TextInput } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { Button, Checkbox } from 'react-native-paper';
import { CheckBox1Form } from './CheckBox1Form';
import { ButtonListForm } from './ButtonListForm';
import { CreatePostContext } from '../CreatePostProvider';
import {ListFrameWork} from '../RecruitmentPost/ListFramWorkForm';

export const MainDefaultPostForm = memo((props) => {
    return (
        <CreatePostContext.Consumer>
            {context => (
                <Fragment>
                    <View>
                        <TextInput
                            value={context.postDefaultData.postContent}
                            placeholder='Nhập nội dung bài viết...'
                            multiline={true} style={{ padding: 15 }}
                            numberOfLines={7} textAlignVertical='top' 
                            onChangeText={e => context._onHandlePostContent(e)}/>
                    </View>
                    <View style={{paddingHorizontal:15}}>
                        <ListFrameWork context={context}/>
                    </View>
                    <ButtonListForm/>
                    <CheckBox1Form />
                </Fragment>
            )}
        </CreatePostContext.Consumer>
    )
});
