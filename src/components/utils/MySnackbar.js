import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Snackbar } from 'react-native-paper';

const MySnackBar = memo(props => {
    const { visible, color, actionLabel, message,_onDismissSnackBar,_onSnackBarAction } = props;
    const _onDismiss = () => {
        _onDismissSnackBar();
    }
    const _onAction = () => {
        _onSnackBarAction();
    }
    return <Snackbar
        visible={visible}
        style={{ backgroundColor: color,zIndex:99999 }}
        onDismiss={_onDismiss}
        action={{
            label: `${actionLabel}`,
            onPress: () => { _onAction },
        }}
    >
        {message}
    </Snackbar>
});
MySnackBar.propTypes = {
    visible: PropTypes.bool,
    color: PropTypes.string,
    actionLabel: PropTypes.string,
    message: PropTypes.string,
    _onDismissSnackBar: PropTypes.func,
    _onSnackBarAction: PropTypes.func
}
export { MySnackBar };


