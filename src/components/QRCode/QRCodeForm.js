import React, { memo, Fragment } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
//Todo: Styles
import AppStyle from '../../theme/index';

const QRCodeForm = memo(props => {
    const {navigation} = props;
    return (
        <Fragment>
            <View style={AppStyle.StyleMain.flexViewCenter}>
                <Button 
                mode="contained" 
                onPress={() => navigation.navigate('Scanner')}>
                    QRCode Scanner
                </Button>
            </View>
        </Fragment>
    )
})
export default QRCodeForm;