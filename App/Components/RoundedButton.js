import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text, View } from 'react-native'
import styles from './Styles/RoundedButtonStyles'
import ExamplesRegistry from '../Services/ExamplesRegistry'
import ProgressBar from 'react-native-progress/Bar';
import { Colors } from '../Themes'
import LinearGradient from "react-native-linear-gradient";
// import ProgressBar from 'react-native-progress/Bar';
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

export default class RoundedButton extends Component {
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
    let color = this.props.fetching ? 'red' : 'transparent'
    return (
      <TouchableOpacity onPress={() => this.props.onPress()}>
        {/* <ProgressBar color={color} width={null} indeterminate={true} height={30} borderRadius={0} borderWidth={0} /> */}
        <LinearGradient
          colors={["#f26321bb", "#65432Cbb"]}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          style={{
            height: 48,
            borderRadius: 24,
            alignSelf: "center",
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {/* <TouchableOpacity onPress={this.getReg}> */}
          <Text
            style={{
              fontFamily: "Prompt-Light",
              fontSize: 18,
              color: "white",
              marginBottom: 5
            }}
          >
            {this.props.title}
          </Text>

        </LinearGradient>
      </TouchableOpacity>
    )
  }
}
