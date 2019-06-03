import React, { memo } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import AppStyle from '../../theme/index';
const ReactMemoComponent = memo(props => {
    return <View>

    </View>
})
ReactMemoComponent.propTypes = {
    item: PropTypes.shape({
        userInfo: PropTypes.object.isRequired,
        postContent: PropTypes.string.isRequired,
        postTag: PropTypes.array.isRequired,
        postCreateTime: PropTypes.string.isRequired
    })
}
export default CommentForm;