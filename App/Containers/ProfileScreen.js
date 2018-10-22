import React, { Component } from "react";
import { Image, Text, View, TouchableOpacity, Dimensions, RefreshControl } from "react-native";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
// Add Actions - replace 'Your' with whatever your reducer is called :)
import QuestionActions from '../Redux/QuestionRedux'
import AuthActions from '../Redux/AuthRedux'
import Icon from "react-native-vector-icons/Entypo";
import Icon2 from "react-native-vector-icons/Ionicons";
import Icon3 from "react-native-vector-icons/FontAwesome";
import { Colors, Images } from "../Themes";

let { width } = Dimensions.get('window')

class ProfileScreen extends Component {

  // constructor (props) {
  //   super(props)
  //   this.state = {
  //     data: [
  //       { name: 'เปลี่ยนรหัสผ่าน', key: 0, }
  //     ]
  //   }
  // }

  componentDidMount() {
    this.props.getProfile()
  }

  // onRefresh(){
  //   this.props.getProfile()
  // }

  // _renderItem = ({ item, index }) => {
  //   return (
  //     <TouchableOpacity style={{ height: 110 }} onPress={() => this._pressTranferProduct(item)}>
  //       <View style={{ height: 110, backgroundColor: 'white', marginTop: 1 }}>
  //         <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Metrics.baseMargin }}>
  //           <Text style={{ fontWeight: 'bold' }}>xxxxxxxxxxxxx</Text>
  //           <Text style={{ fontWeight: 'bold', color: Colors.mainTheme }}>xxxx ชิ้น</Text>
  //         </View>
  //         <View style={{ flex: 3, padding: Metrics.baseMargin }}>
  //           <ImageList data={item.products} showSubDetail={false} />
  //         </View>
  //       </View>
  //     </TouchableOpacity>
  //   )
  // }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps.profile == null) {
      this.props.navigation.navigate("Auth")
    }
  }

  render() {
    // let data = []
    // console.log(this.props.profile)
    return (
      <LinearGradient colors={["#FF9933", "#FFCC33"]} style={{ flex: 1 }}>
        <Image source={Images.watermarkbg} style={{
          position: 'absolute',
          right: 0, bottom: 0,
          width: width,
          height: width * 95.7 / 100
        }} resizeMode='contain' />
        <View style={{ flex: 0.4, height: 100, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center', }}>

          <View style={{
            height: 40, width: 40, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignSelf: 'center'
            , backgroundColor: 'lightgrey', borderRadius: 20, marginRight: 10
          }}>
            <Icon
              name="camera"
              size={30}
              color={Colors.brownText}
              style={{}}
              onPress={() => { }}
            />
          </View>

          <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
              {this.props.profile &&
                <Text>{this.props.profile.firstname + " " + this.props.profile.lastname} </Text>
              }
            </View>
            <Text style={{ marginTop: 5, color: 'orange' }}>Check Phra Account</Text>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <Icon
                name="mail"
                size={18}
                color={Colors.brownText}
                style={{ marginRight: 10 }}
                onPress={() => { }}
              />
              {this.props.profile &&
                <Text> {this.props.profile.email}</Text>
              }
            </View>
          </View>

        </View>

        {this.props.profile && this.props.profile.role != 'expert' &&
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 0.12, marginTop: 20, backgroundColor: 'white' }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
              <Icon2
                name="ios-ribbon"
                size={18}
                color={Colors.brownText}
                style={{ marginRight: 10 }}
                onPress={() => { }}
              />
              <Text style={{ fontSize: 16 }}>แต้มสะสม</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
              <Text style={{ fontWeight: 'bold' }}>{this.props.profile ? this.props.profile.point : '-'}</Text>
              <Text style={{ color: 'orange' }}> point</Text>
            </View>
          </View>
        }

        {/* <FlatList
           data={data}
           renderItem={this._renderItem}
        /> */}

        {this.props.profile && this.props.profile.role != 'expert' &&
          <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: 'white', marginTop: 20, borderBottomColor: 'lightgrey', borderBottomWidth: 1 }} onPress={() => this.props.navigation.navigate("pro")}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 10, marginVertical: 10 }}>
              <Icon2
                name="ios-add-circle-outline"
                size={18}
                color={Colors.brownText}
                style={{ marginRight: 10 }}
                onPress={() => { }}
              />
              <Text
                style={{
                  color: "orange",
                  fontFamily: "Prompt-Regular",
                  fontSize: 16,
                  fontWeight: 'bold'
                }}
              >
                เติม point
          </Text>
            </View>
          </TouchableOpacity>
        }

        {this.props.profile && this.props.profile.role != 'expert' &&
          <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: 'white', borderBottomColor: 'lightgrey', borderBottomWidth: 1 }} onPress={() => this.props.navigation.navigate("historyAddPoint")}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 10, marginVertical: 10 }}>
              <Icon3
                name="history"
                //ios-hourglass, ios-timer, ios-time
                size={18}
                color={Colors.brownText}
                style={{ marginRight: 10 }}
                onPress={() => { }}
              />
              <Text
                style={{
                  fontFamily: "Prompt-Regular",
                  fontSize: 16,
                }}
              >
                ประวัติการเติมเงิน
          </Text>
            </View>
          </TouchableOpacity>
        }

        <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: 'white', borderBottomColor: 'lightgrey', marginTop: 20, borderBottomWidth: 1 }} onPress={() => this.props.navigation.navigate("change")}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 10, marginVertical: 10 }}>
            <Icon2
              name="ios-lock"
              size={18}
              color={Colors.brownText}
              style={{ marginRight: 10 }}
              onPress={() => { }}
            />
            <Text
              style={{
                fontFamily: "Prompt-Regular",
                fontSize: 16,
              }}
            >
              เปลี่ยนรหัสผ่าน
          </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: 'white', borderBottomColor: 'lightgrey', borderBottomWidth: 1 }} onPress={() => {
          this.props.signout()
          this.props.signout2()
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 10, marginVertical: 10 }}>
            <Icon2
              name="ios-lock"
              size={18}
              color={Colors.brownText}
              style={{ marginRight: 10 }}
              onPress={() => { }}
            />
            <Text
              style={{
                fontFamily: "Prompt-Regular",
                fontSize: 16,
              }}
            >
              ออกจากระบบ
          </Text>
          </View>
        </TouchableOpacity>

      </LinearGradient>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.question.profile,

  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfile: () => dispatch(QuestionActions.getProfile()),
    signout: () => dispatch(AuthActions.signout()),
    signout2: () => dispatch(QuestionActions.clearProfile())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen);
