import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, Dimensions, TextInput } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
import RoundedButton from '../Components/RoundedButton'
import { Colors } from '../Themes';

class Promotion extends Component {
    render() {
        return(
            <LinearGradient colors={["#FF9933", "#FFCC33"]} style={{ flex: 1 }}>
            <Text> Promotions discount 40% </Text>
            </LinearGradient>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    //   questionType: state.question.questionType,
    //   images: state.question.images,
    //   profile: state.question.profile,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
    //   getQuestionType: () => dispatch(QuestionActions.getQuestionType()),
    //   setQuestions: (questions) => dispatch(QuestionActions.setQuestions(questions)),
    //   addQuestion: () => dispatch(QuestionActions.addQuestion())
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Promotion)