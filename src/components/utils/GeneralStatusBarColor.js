import React from 'react';
import { View, StatusBar } from 'react-native';
import styles from '../../theme/StyleStatusBar';
import styleVariable from '../../theme/StyleVariable'
const GeneralStatusBarColor = ({...props }) => (
<View style={styles.statusBar}>
<StatusBar translucent backgroundColor={styleVariable.mainColor} {...props} />
</View>
);
export default GeneralStatusBarColor;