import React, { Component } from 'react'
import { ScrollView, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
// Add Actions - replace 'Your' with whatever your reducer is called :)
import QuestionActions from '../Redux/QuestionRedux'
import moment from 'moment'
import 'moment/locale/th'
// Styles
import styles from './Styles/HistoryScreenStyle'
import { Colors } from '../Themes';

class HistoryScreen extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  componentDidMount() {
    moment.locale('th')
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
            let date = moment.unix(item.created_at).format("DD MMM YYYY")
            let status = 'รอตรวจ'
            let color = 'orange'
            if (item.status == 'success') {
              status = 'ตรวจแล้ว'
              color = 'green'
            }
            return (
            <TouchableOpacity>
            <View style={{ height: 80, backgroundColor:'#ffffffdd', marginTop: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Image source={{ uri: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/thumbs/tmb_100x100_'+item.images[0]}} style={{ width: 60, height: 60, margin: 10, borderRadius: 10 }}/>
              <Text style={{
                fontFamily: 'Prompt-SemiBold',
                fontSize: 18,
                color: Colors.brownText,
                margin: 20
              }}>{date}</Text>

              <Text style={{
                fontFamily: 'Prompt-SemiBold',
                fontSize: 15,
                color: 'white',
                margin: 20,
                paddingHorizontal: 20,
                paddingTop: 5,
                borderRadius: 15,
                height: 30,
                backgroundColor: color
              }}>{status}</Text>
            </View>
            </TouchableOpacity>
            )}}
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
