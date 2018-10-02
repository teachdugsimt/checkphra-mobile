import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './Styles/PickerStyle'
import Icon from "react-native-vector-icons/Entypo";
import { Colors } from '../Themes'
import { connect } from "react-redux";

import QuestionActions from '../Redux/QuestionRedux'

var ImagePicker = require('react-native-image-picker');
var options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

class Picker extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  constructor(props) {
    super(props)
    this.state = {
      avatarSource: null
    }
  }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  pick = () => {
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
        console.log(response)
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });

        this.props.setImages(this.props.id, {
          uri: response.uri,
          type: response.type,
          name: response.fileName
        })
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={{ flex: 1 }} onPress={this.pick}>
          <View style={styles.uploadBox}>
            <Icon
              name="camera"
              size={40}
              color={Colors.brownTextTran}
            />
            <Text style={styles.uploadBoxText}>{this.props.title}</Text>
            <Image source={this.state.avatarSource} style={{ width: '100%', height: '100%'}} />
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    setImages: (index, source) => dispatch(QuestionActions.setImages(index, source))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Picker);
