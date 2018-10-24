import React, { Component } from 'react'
import { ScrollView, Text, View, Image, Dimensions, TextInput, TouchableOpacity, FlatList, RefreshControl, Alert } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
import { Colors, Images, Metrics } from '../../Themes';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import PromotionActions from '../../Redux/PromotionRedux'
import RoundedButton2 from '../../Components/RoundedButton2'
import Icon2 from "react-native-vector-icons/FontAwesome";
import PaymentActions from '../../Redux/PaymentRedux'
import Icon3 from "react-native-vector-icons/Entypo";
const { width } = Dimensions.get('window')
var ImagePicker = require('react-native-image-picker');
var options = {
  title: 'Select Avatar',
  customButtons: [
    { name: 'fb', title: 'Choose Photo from Facebook' },
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};
class Promptpay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      money: this.props.money,
      type: 'promptpay',
      bank: '',
      avatarSource: '',
    }
  }

  componentWillMount() {
    this.props.deleteImage()
  }

  componentWillUnmount() {
    this.props.deleteImage()
  }


  _pressButtonOk = () => {
    if (!this.state.avatarSource) {
      alert('กรุณาเลือกรูปภาพ')
    } else {
      if (!this.state.bank) {
        alert('กรุณาระบุธนาคารที่ทำการโอนเงิน')
      } else {
        Alert.alert(
          'Check Phra',
          'ยืนยันการทำรายการ?',
          [
            {
              text: 'ok', onPress: () => {
                let item = {
                  user_id: this.props.user_id,
                  price: this.props.money,
                  bank: this.state.bank,
                  date: '2018-10-19 16:30:00',
                  file: this.props.image,
                  type: this.state.type,
                }
                this.props.sendSlip(item)

                setTimeout(() => {
                  this.props.navigation.goBack()
                  this.props.navigation.navigate("historyAddPoint")
                }, 3000);
              }
            },
            { text: 'cancel' }
          ],
          { cancelable: false }
        )
      }
    }

  }

  pick = () => {
    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        // console.log('User cancelled image picker');
      }
      else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
        // console.log(response)

        this.setState({
          avatarSource: source
        });

        this.props.setImage({
          uri: response.uri,
          type: response.type,
          name: response.fileName
        })
      }
    });
  }

  render() {
    console.log(this.props.money)
    return (
      <LinearGradient colors={["#FF9933", "#FFCC33"]} style={{ flex: 1 }}>
        <Image source={Images.watermarkbg} style={{
          position: 'absolute',
          right: 0, bottom: 0,
          width: width,
          height: width * 95.7 / 100
        }} resizeMode='contain' />
        <View style={{ marginTop: Metrics.doubleBaseMargin }}>
          <Text style={{ fontSize: 16, alignSelf: 'center' }}>รหัส Promptpay</Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 10 }} >092-981-8252</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
            <Text style={{ fontSize: 16, alignSelf: 'center' }}>จำนวนเงินที่ต้องชำระ </Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'green', alignSelf: 'center' }}>{this.props.money}</Text>
          </View>

          <View style={{ justifyContent: 'flex-start', alignItems: 'center', marginTop: 10 }}>
            <Text style={{ fontSize: 16 }}>กรุณาอัพโหลดสลิปการโอนเงิน</Text>

            <TouchableOpacity style={{}} onPress={this.pick}>
              <View style={{
                justifyContent: 'center', alignItems: 'center', borderWidth: 3,
                borderColor: Colors.brownTextTran, borderRadius: 10, margin: 5, overflow: 'hidden', height: 150, width: 150
              }}>
                <Icon3
                  name="camera"
                  size={40}
                  color={Colors.brownTextTran}
                />
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{
                    fontFamily: 'Prompt-SemiBold', fontSize: 25, color: Colors.brownTextTran,
                  }}>สลิป</Text>

                  {this.props.image && < Icon3
                    style={{ marginLeft: 40 }}
                    name="squared-cross"
                    size={24}
                    color={'red'}
                    onPress={() => { this.props.deleteImage() }}
                  />}
                </View>

                <Image source={this.state.avatarSource && this.props.image ? this.state.avatarSource : ''} style={{ width: '100%', height: '100%' }} />
              </View>
            </TouchableOpacity>

          </View>

          <View style={{ alignItems: 'center' }}>
            <TextInput
              style={{ width: '75%' }}
              value={this.state.bank}
              placeholder={'ธนาคารที่ทำการโอน เช่น กรุงไทย, ไทยพาณิชย์'}
              onChangeText={(text) => this.setState({ bank: text })} />
            <View style={{ margin: 10, width: 200 }}>
              <RoundedButton2 text={'ตกลง'}
                onPress={() => this._pressButtonOk()}
                fetching={this.props.request2} />
            </View>
          </View>

          <View style={{ height: 30 }}>
          </View>



        </View>
      </LinearGradient>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.payment.fetching,

    money: state.promotion.money,
    user_id: state.auth.user_id,
    image: state.payment.img_slip,
    request2: state.payment.request2,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    paymentBanking: (data) => dispatch(PaymentActions.paymentRequest(data)),

    deleteImage: () => dispatch(PaymentActions.deleteImage()),
    sendSlip: (item) => dispatch(PaymentActions.sendSlipRequest(item)),
    setImage: (source) => dispatch(PaymentActions.setImage(source)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Promptpay)
