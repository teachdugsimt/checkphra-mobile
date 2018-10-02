import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/PickerStyle'
import Icon from "react-native-vector-icons/Entypo";
import { Colors } from '../Themes'

export default class Picker extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={{ flex: 1 }}>
          <View style={styles.uploadBox}>
            <Icon
              name="camera"
              size={40}
              color={Colors.brownTextTran}
            />
            <Text style={styles.uploadBoxText}>{this.props.title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}
