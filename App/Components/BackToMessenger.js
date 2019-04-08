import React, { Component } from 'react'
import { Text, View, TouchableHighlight } from 'react-native'
// import PropTypes from 'prop-types'

var FBMessengerButton = require('react-native-facebook-messenger');
// import FBMessengerButton from 'react-native-facebook-messenger'
class BackToMessenger extends Component {
    constructor(props) {
        super(props);
    }
    // static propTypes = {
    //     // onPress: PropTypes.func,
    //   }

    render() {
        return (
            // <TouchableHighlight onPress={() => { FBMessengerButton.backToMessenger(); }}>
            //     <View>
            //         <Text>Back to</Text>
            //         <Text>Messenger</Text>
            //     </View>
            // </TouchableHighlight>

            <TouchableHighlight onPress={() => { FBMessengerButton.backToMessenger(); }}>
                <View>
                    <Text>Back to</Text>
                    <Text>Messenger</Text>
                </View>
            </TouchableHighlight>
        )
    }

}