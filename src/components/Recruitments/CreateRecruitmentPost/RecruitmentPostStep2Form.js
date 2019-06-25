import React, { memo, Fragment, useState } from 'react';
import { View, Text, TextInput, Picker } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ListFrameWork } from '../../utils/ListFramWorkForm';
import { ListRoleForm } from '../../utils/ListRoleForm';
import { CreateRecruitmentPostContext } from './CreateRecruitmentPostProvider';
import AppStyle from '../../../theme';
export const RecruitmentPostForm2 = memo(() => {
    return (
        <CreateRecruitmentPostContext.Consumer>
            {context => (
                <Fragment>
                    <View style={{ marginTop: 5, paddingLeft: 15, paddingRight: 15, flex: 1 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <ListFrameWork
                                postTag={context.recruitmentPostData.postTag}
                                _onSetPostTag={context._onSetPostTag} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center',marginTop:30 }}>
                            <ListRoleForm
                                role={context.recruitmentPostData.role}
                                _onSetRole={context._onSetRole}
                            />
                        </View>
                    </View>
                </Fragment>
            )}
        </CreateRecruitmentPostContext.Consumer>
    )

})