import React, { Component } from "react";
import { ScrollView, Text, View, TouchableOpacity, FlatList, RefreshControl, Image, TextInput } from "react-native";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import QuestionActions from '../Redux/QuestionRedux'
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Ionicons";
import Icon3 from "react-native-vector-icons/Entypo";
import { Colors } from "../Themes";
import PaymentActions from '../Redux/PaymentRedux'
// import Picker2 from '../Components/Picker2';
import RoundedButton from "../Components/RoundedButton";
import I18n from '../I18n/i18n';
I18n.fallbacks = true;
// I18n.currentLocale();

class DetailPoint extends Component {

  // static navigationOptions = ({ navigation }) => {
  //     const params = navigation.state.params || {};

  //     return {
  //         headerLeft: (
  //             <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row' }}>
  //                 <Text
  //                     style={{
  //                         marginLeft: 20,
  //                         fontSize: 18,
  //                         fontFamily: "Prompt-SemiBold",
  //                         color: Colors.brownText
  //                     }}
  //                 >
  //                     {"< กลับ "}
  //                 </Text>
  //                 <Text style={{ marginLeft: 20, fontSize: 18, fontFamily: "Prompt-SemiBold", color: Colors.brownText }}>รายละเอียดการเติมเงิน</Text>
  //             </TouchableOpacity>
  //         )
  //     };
  // };


  static navigationOptions = ({ navigation }) => {
    // console.log(navigation)
    // console.log(I18n.locale)

    return {
      title: I18n.t('detailPurchase'),
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      avatarSource: null,
      bank: null,
    }
  }

  componentDidMount() {
    // this.props.navigation.goBack()
  }

  componentWillUnmount() {
    // this.props.navigation.navigate('profileScreen')  //can't
    // this.props.navigation.goBack()   // can't
  }

  render() {
    I18n.locale = this.props.language
    let id = this.props.item.id
    let status = this.props.item.status == 0 ? I18n.t('waitVerify') : this.props.item.status == 10 ? I18n.t('successVerify') : I18n.t('fuckCoin')
    let status_color = this.props.item.status == 0 ? 'orange' : this.props.item.status == 10 ? 'green' : 'red'
    let product = this.props.item.price
    let time = this.props.item.date.slice(11, this.props.item.date.length - 3)
    let type = ''
    if (this.props.item.type == 1) {
      type = I18n.t('banking')
    } else if (this.props.item.type == 2) {
      type = I18n.t('promptpay')
    } else if (this.props.item.type == 3) {
      type = I18n.t('creditCard')
    }
    console.log(this.props.item)
    console.log(status)
    console.log('Detail point')

    return (
      <View style={{}}>
        <ScrollView>
          <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', height: 75, borderBottomColor: 'lightgrey', borderBottomWidth: 1 }}>
            <Text style={{ color: status_color, fontSize: 20 }}>{status}</Text>
          </View>

          <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', height: 50, borderBottomColor: 'lightgrey', borderBottomWidth: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 16, marginLeft: 10 }}>{I18n.t('priceProduct')}</Text>
            <Text style={{ fontSize: 16, marginRight: 10 }}>{product} ฿</Text>
          </View>

          <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', height: 50, borderBottomColor: 'lightgrey', borderBottomWidth: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 16, marginLeft: 10 }}>{I18n.t('transactionTime')}</Text>
            <Text style={{ fontSize: 16, marginRight: 10 }}>{time}</Text>
          </View>

          <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', height: 50, borderBottomColor: 'lightgrey', borderBottomWidth: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 16, marginLeft: 10 }}>{I18n.t('transactionType')}</Text>
            <Text style={{ fontSize: 16, marginRight: 10 }}>{type}</Text>
          </View>
          <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', height: 50, borderBottomColor: 'lightgrey', borderBottomWidth: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 16, marginLeft: 10 }}>{I18n.t('transactionID')}</Text>
            <Text style={{ fontSize: 16, marginRight: 10 }}>{id}</Text>
          </View>
          {status_color && status_color == 'red' && <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', height: 50, borderBottomColor: 'lightgrey', borderBottomWidth: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 16, marginLeft: 10 }}>{I18n.t('reason')}</Text>
            <Text style={{ fontSize: 16, marginHorizontal: 10, marginVertical: 10 }}>{this.props.item.argument}</Text>
          </View>}


        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    // data_history: state.payment.data_history,
    // profile: state.question.profile,
    item: state.payment.data_point,
    image: state.payment.img_slip,
    request2: state.payment.request2,
    language: state.auth.language,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // getHistory: (page) => dispatch(PaymentActions.historyAddpointRequest(page)),
    setImage: (source) => dispatch(PaymentActions.setImage(source)),
    deleteImage: () => dispatch(PaymentActions.deleteImage()),
    sendSlip: (item) => dispatch(PaymentActions.sendSlipRequest(item)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailPoint)
