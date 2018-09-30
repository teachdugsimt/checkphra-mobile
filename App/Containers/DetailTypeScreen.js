import React, { Component } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import GridView from "react-native-super-grid";
import { Colors } from "../Themes";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from "./Styles/DetailTypeScreenStyle";

class DetailTypeScreen extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={{
              marginLeft: 20,
              fontSize: 18,
              fontFamily: "Prompt-SemiBold",
              color: Colors.brownText
            }}
          >
            {"< กลับ"}
          </Text>
        </TouchableOpacity>
      )
    };
  };

  render() {
    const items = [
      { name: "พระสมเด็จ" },
      { name: "นางพญา" },
      { name: "พระคง" },
      { name: "พระรอด" },
      { name: "พระผงสุวรรณ" },
      { name: "พระซุ้มกอ" },
      { name: "พระกำแพงเม็ดขนุน" }
    ];
    return (
      <LinearGradient colors={["#FF9933", "#FFCC33"]} style={{ flex: 1 }}>
        <GridView
          itemDimension={150}
          items={items}
          renderItem={items => {
            return (
              <TouchableOpacity onPress ={()=>this.getTypePhra(items.name)}>
              <View
                style={{
                  height: 90,
                  width: '100%',
                  backgroundColor: Colors.button,
                  justifyContent: "center",
                  marginVertical: 5,
                  borderRadius: 15,
                  padding: 10
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: "Prompt-Regular",
                    fontSize: 16,
                    alignSelf: "center"
                  }}
                >
                  {items.name}
                </Text>
              </View>
              </TouchableOpacity>
            );
          }}
        />
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailTypeScreen);
