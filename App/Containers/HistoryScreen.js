import React, { Component } from 'react'
import { ScrollView, Text, View, FlatList, Image } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
// Add Actions - replace 'Your' with whatever your reducer is called :)
import QuestionActions from '../Redux/QuestionRedux'

// Styles
import styles from './Styles/HistoryScreenStyle'
import { Colors } from '../Themes';

class HistoryScreen extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  componentDidMount() {
    this.props.getHistory()
  }

  render() {
    return (
      <LinearGradient
        colors={["#FF9933", "#FFCC33"]} style={{ flex: 1 }}
      >
        <FlatList
          data={this.props.history}
          renderItem={({ item }) => {
            // let date =
            return (
            <View style={{ height: 80, backgroundColor:'#ffffff33', marginTop: 1 }}>
              <Image source={{ uri: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/thumbs/tmb_100x100_'+item.images[0]}} style={{ width: 60, height: 60, margin: 10, borderRadius: 10 }}/>
              <Text>{}</Text>
            </View>)}}
        />
      </LinearGradient>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    history: state.question.history
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getHistory: () => dispatch(QuestionActions.getHistory())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryScreen)
