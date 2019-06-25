import React, { Component, memo } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppStyle from '../../theme/index';
import SectionedMultiSelect from '../../libs/react-native-sectioned-multi-select/lib/sectioned-multi-select';

const items = [{
  id: '92iijs7yta',
  name: 'ReactJs',
}, {
  id: 'a0s0a8ssbsd',
  name: 'NodeJs',
}, {
  id: '16hbajsabsd',
  name: 'React Native',
}, {
  id: 'nahs75a5sg',
  name: 'Java',
}, {
  id: '667atsas',
  name: 'Golang',
}, {
  id: 'hsyasajs',
  name: 'Anambra',
}, {
  id: 'djsjudksjd',
  name: 'GraphQL',
}, {
  id: 'sdhyaysdj',
  name: 'C',
}, {
  id: 'suudydjsjd',
  name: '.Net',
},
{
  id: '192iijs7yta',
  name: 'Vue',
}, {
  id: '1a0s0a8ssbsd',
  name: 'C++',
}, {
  id: '116hbajsabsd',
  name: 'Python',
}, {
  id: '1nahs75a5sg',
  name: 'Scala',
}, {
  id: '1667atsas',
  name: 'Ruby on rails',
}, {
  id: '1hsyasajs',
  name: 'Kotin',
}, {
  id: '1djsjudksjd',
  name: 'Fluter',
}, {
  id: '1sdhyaysdj',
  name: 'Ionic',
}, {
  id: '1suudydjsjd',
  name: 'Xamarin',
}];

export const ListFrameWork = memo((props) => {
  const _onSelectedItemsChange = (selectedItems) => {
    props._onSetPostTag(selectedItems)
  };
  return (
    <View style={{flexDirection:'row',alignItems:'flex-start'}}>
      <Icon
        name='info'
        size={15}
        color={AppStyle.styleVariable.mainColor}
        style={{ marginRight: 3,marginTop:10 }} />
      <SectionedMultiSelect
        items={items}
        uniqueKey="name"
        subKey="children"
        iconKey="icon"
        selectText="Ngôn ngữ lập trình "
        onSelectedItemsChange={_onSelectedItemsChange}
        selectedItems={props.postTag}
        alwaysShowSelectText={true}
      />
    </View>
  );
}
)