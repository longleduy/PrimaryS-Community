import React, { memo } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppStyle from '../../theme/index';
import SectionedMultiSelect from '../../libs/react-native-sectioned-multi-select/lib/sectioned-multi-select';

const roleItems = [{
  id: '92iijs7yta',
  name: 'FullStack Dev',
}, {
  id: 'a0s0a8ssbsd',
  name: 'Fontend Dev',
}, {
  id: '16hbajsabsd',
  name: 'Backend Dev',
}, {
  id: 'nahs75a5sg',
  name: 'Java',
}, {
  id: '667atsas',
  name: 'Database Administrator',
}, {
  id: 'hsyasajs',
  name: 'Android Dev',
}, {
  id: 'djsjudksjd',
  name: 'IOS Dev',
}, {
  id: 'sdhyaysdj',
  name: 'Software Testers',
}, {
  id: 'suudydjsjd',
  name: 'Quality Assurance',
},
{
  id: '192iijs7yta',
  name: 'Help Desk',
}, {
  id: '1a0s0a8ssbsd',
  name: 'IT Support',
}, {
  id: '116hbajsabsd',
  name: 'Project Manager',
}, {
  id: '1nahs75a5sg',
  name: 'Technique Leader',
}, {
  id: '1667atsas',
  name: 'Business Analyst',
}];

export const ListRoleForm = memo(props => {
  let _onSelectedItemsChange = (selectedItems) => {
    props._onSetRole(selectedItems)
  };
  return <View style={{flexDirection:'row',alignItems:'flex-start'}}>
    <Icon
      name='info'
      size={15}
      color={AppStyle.styleVariable.mainColor}
      style={{ marginRight: 3, marginTop: 10 }} />
    <SectionedMultiSelect
      items={roleItems}
      uniqueKey="name"
      subKey="children"
      iconKey="icon"
      selectText="Vị trí "
      onSelectedItemsChange={_onSelectedItemsChange}
      selectedItems={props.role}
      alwaysShowSelectText={true}
    />
  </View>
})