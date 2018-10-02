import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SendImageScreenStyle'

import ImagePicker from 'react-native-image-picker'
import { Colors } from '../Themes';
import Icon from "react-native-vector-icons/Entypo";
import Picker from '../Components/Picker';


const options = {
  title: 'Select Avatar',
  customButtons: [
    { name: 'fb', title: 'Choose Photo from Facebook' },
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

class SendImageScreen extends Component {
  constructor(props) {
    super(props)
  }

  showImagePicker = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });
      }
    });
  }

  render() {
    return (
      <LinearGradient colors={["#FF9933", "#FFCC33"]} style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ height: 60, justifyContent: "center" }}>
            <Text
              style={{
                fontSize: 25,
                fontFamily: "Prompt-Regular",
                alignSelf: "center",
                color: Colors.brownText
              }}
            >
              ใส่ข้อมูล
          </Text>
          </View>
          <View style={styles.uploadRow}>
            <Picker title='หน้า' />
            <Picker title='หลัง' />
            <Picker title='ซ้าย' />
          </View>
          <View style={styles.uploadRow}>
            <Picker title='ขวา' />
            <Picker title='ฐาน' />
            <Picker title='อื่นๆ' />
          </View>
        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(SendImageScreen)
