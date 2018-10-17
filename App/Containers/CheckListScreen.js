import React, { Component } from 'react'
import { Image, Text, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { Colors, Images } from '../Themes'

import LinearGradient from "react-native-linear-gradient";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/CheckListScreenStyle'

const { width } = Dimensions.get('window')

class CheckListScreen extends Component {

  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render() {
    return (
      <LinearGradient colors={[Colors.startGradient, Colors.endGradient]} style={{ flex: 1 }}>
        <Image source={Images.watermarkbg} style={{
          position: 'absolute',
          right: 0, bottom: 0,
          width: width,
          height: width * 95.7 / 100
        }} resizeMode='contain' />
        <Text>CheckListScreen Container</Text>
      </LinearGradient>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckListScreen)
