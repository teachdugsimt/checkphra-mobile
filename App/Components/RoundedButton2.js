import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text, View } from 'react-native'
import styles from './Styles/RoundedButtonStyles'
import ExamplesRegistry from '../Services/ExamplesRegistry'
import { Colors } from '../Themes';
import ProgressBar from 'react-native-progress/Bar';

// Note that this file (App/Components/RoundedButton) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
ExamplesRegistry.addComponentExample('Rounded Button', () =>
  <RoundedButton
    text='real buttons have curves'
    onPress={() => window.alert('Rounded Button Pressed!')}
  />
)

export default class RoundedButton2 extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string,
    children: PropTypes.string,
    navigator: PropTypes.object
  }

  getText() {
    const buttonText = this.props.text || this.props.children || ''
    return buttonText.toUpperCase()
  }

  render() {
    let color = this.props.fetching ? '#4A235A' : 'transparent'
    return (
      <TouchableOpacity style={[styles.button, this.props.style]} onPress={this.props.onPress}>
        <ProgressBar color={color} width={null} indeterminate={true} height={5} borderRadius={0} borderWidth={0} />
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          {
            this.props.icon && this.props.icon
          }
          <Text style={styles.buttonText}>{this.getText()}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}
