import React, { Component } from 'react'
import { ScrollView, Text,View} from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/HistoryScreenStyle'

class HistoryScreen extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      tabBarLabel: 'ประวัติการส่งตรวจพระ',
    };
  };
  render () {
    return (
      <LinearGradient
      colors={["#FF9933", "#FFCC33"]} style={{ flex: 1 }}
      >
    
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

export default connect(mapStateToProps, mapDispatchToProps)(HistoryScreen)
