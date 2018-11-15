import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './Styles/PickerStyle'
import Icon from "react-native-vector-icons/Entypo";
import { Colors } from '../Themes'
import { connect } from "react-redux";

import PaymentActions from '../Redux/PaymentRedux'
import { database } from 'react-native-firebase';

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

class Picker2 extends Component {

    constructor(props) {
        super(props)
        this.state = {
            avatarSource: null,
        }
    }

    componentWillReceiveProps(nextProps) {
        // if (nextProps.imgaes != this.props.images) {

        //     if (nextProps.images[this.props.id]) {
        //         // console.log('ADD IMAGE SUCCESS')

        //     }
        // }
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

                // this.props.setImage({
                //     uri: response.uri,
                //     type: response.type,
                //     name: response.fileName
                // })

                ImageResizer.createResizedImage(response.uri, 1024, 1024, 'JPEG', 90, 0, null)
                .then((response) => {
                  // response.uri is the URI of the new image that can now be displayed, uploaded...
                  // response.path is the path of the new image
                  // response.name is the name of the new image with the extension
                  // response.size is the size of the new image
                  console.log(response)
                  this.props.setImage({
                    uri: response.uri,
                    type: 'image/jpeg',
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
        
        return (
            <View style={styles.container}>
                <TouchableOpacity style={{ flex: 1 }} onPress={this.pick}>
                    <View style={styles.uploadBox}>
                        <Icon
                            name="camera"
                            size={40}
                            color={Colors.brownTextTran}
                        />
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.uploadBoxText}>สลิปการโอนเงิน</Text>
                            {this.props.image && < Icon
                                style={{ marginLeft: 33 }}
                                name="squared-cross"
                                size={24}
                                color={'red'}
                                onPress={() => { this.props.deleteImage() }}
                            />
                            }
                        </View>

                        {/* <Image source={this.state.avatarSource && this.props.image ? this.state.avatarSource : ''} style={{ width: '100%', height: '100%' }} /> */}
                        <Image source={this.state.avatarSource} style={{ width: '100%', height: '100%' }} />
                    </View>
                </TouchableOpacity>

            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        image: state.payment.img_slip,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        setImage: (source) => dispatch(PaymentActions.setImage(source)),
        deleteImage: () => dispatch(PaymentActions.deleteImage()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Picker2);
