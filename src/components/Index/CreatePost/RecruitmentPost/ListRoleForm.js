import React, { Component } from 'react';
import { View } from 'react-native';
import SectionedMultiSelect from '../../../../libs/react-native-sectioned-multi-select/lib/sectioned-multi-select';

const items = [{
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

export default class ListRoleForm extends Component {
  constructor() {
    super();
    this.state = {
      selectedItems: ['a0s0a8ssbsd'],
    };
  }
  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  };

  render() {
    return (
      <View>
        <SectionedMultiSelect
          items={items}
          uniqueKey="id"
          subKey="children"
          iconKey="icon"
          selectText="Vị trí "
        //   showDropDowns={true}
        //   readOnlyHeadings={true}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.state.selectedItems}
          alwaysShowSelectText={true}
        />
      </View>
    );
  }
}