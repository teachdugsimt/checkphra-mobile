import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './Styles/PickerStyle'
import Icon from "react-native-vector-icons/Entypo";
import { Colors } from '../Themes'
import { connect } from "react-redux";

import QuestionActions from '../Redux/QuestionRedux'
import { database } from 'react-native-firebase';

import ImageResizer from 'react-native-image-resizer';

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

class Picker extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  constructor(props) {
    super(props)
    this.state = {
      avatarSource: null,
      // checkData: this.props.id,
      // Imagine: null
    }
  }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.imgaes != this.props.images) {

      if (nextProps.images[this.props.id]) {
        // console.log('ADD IMAGE SUCCESS')

      }
    }
  }

  componentWillMount() {
    // this.props.clearImage()
  }

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
        // this.props.setUri(source, this.props.id)
        console.log(response)

        ImageResizer.createResizedImage(response.uri, 1024, 1024, 'JPEG', 90, 0, null)
          .then((response) => {
            // response.uri is the URI of the new image that can now be displayed, uploaded...
            // response.path is the path of the new image
            // response.name is the name of the new image with the extension
            // response.size is the size of the new image
            this.props.setImages(this.props.id, {
              uri: response.uri,
              // type: response.type,
              // name: response.fileName,
              name: response.name,
              // size: response.fileSize,
              size: response.size,
              tmp_name: response.path
            })
            console.log(response)
          }).catch((err) => {
            // Oops, something went wrong. Check that the filename is correct and
            // inspect err to get more details.
            console.log(err)
          });


      }
    });
  }
  render() {

    if (this.props.images[this.props.id]) {
      // console.log(this.props.images[this.props.id].uri)
    }
    // console.log(this.props.images)
    return (
      <View style={styles.container}>
        <TouchableOpacity style={{ flex: 1 }} onPress={this.pick}>
          <View style={styles.uploadBox}>
            <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
              {this.state.avatarSource && this.props.images[this.props.id] &&

                <Image source={this.state.avatarSource} style={{ width: 110, height: 65 }} resizeMode='contain' />

              }
              {!(this.state.avatarSource && this.props.images[this.props.id]) &&
                <Icon
                  name="camera"
                  size={40}
                  color={Colors.brownTextTran}
                />
              }
            </View>
            <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.uploadBoxText}>{this.props.title}</Text>
              {this.props.images[this.props.id] &&
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                  <Icon
                    style={{ marginRight: 8 }}
                    name="squared-cross"
                    size={22}
                    color={Colors.brownText}
                    onPress={() => { this.props.deleteImage(this.props.id) }}
                  />
                </View>
              }
            </View>


          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    images: state.question.images,
    uri: state.question.uri,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setImages: (index, source) => dispatch(QuestionActions.setImages(index, source)),
    deleteImage: (index) => dispatch(QuestionActions.deleteImage(index)),
    // clearImage: () => dispatch(QuestionActions.clearImage()),
    // setUri: (data, index) => dispatch(QuestionActions.setUri(data, index)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Picker);


//   < Icon
// style = {{ margin: 3 }}
// name = "squared-cross"
// size = { 24}
// color = { 'red'}
// onPress = {() => { console.log("Press close button") }}
// />
