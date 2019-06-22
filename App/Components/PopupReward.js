import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import styles from './Styles/PopupRewardStyle'
import PopupDialog, { slideAnimation } from 'react-native-popup-dialog';
import I18n from '../I18n/i18n'
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/MaterialIcons";

let { width, height } = Dimensions.get('window')

export default class PopupReward extends Component {
  // // Prop type warnings
  static propTypes = {
    show: PropTypes.bool.isRequired,
    onPressShare: PropTypes.func.isRequired,
    onPressVideo: PropTypes.func.isRequired,
    onDismissed: PropTypes.func.isRequired
    // someSetting: PropTypes.bool.isRequired,
  }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show) {
      this.popup.show()
    }
  }

  render() {
    return (
      <PopupDialog
        dialogTitle={<View style={styles.popupHeader}><Text style={{
          fontSize: 18, fontWeight: 'bold'
        }}>{I18n.t('rewards')}</Text></View>}
        ref={(popup) => { this.popup = popup; }}
        dialogAnimation={slideAnimation}
        width={width / 1.2}
        height={200}
        onDismissed={this.props.onDismissed}
      >
        <View style={{ flex: 1, flexDirection: 'row', padding: 10 }}>
          <TouchableOpacity style={{ flex: 1, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }} onPress={this.props.onPressShare}>
            <Icon name="facebook-square" size={50} color={'#3c5a99'} />
            <Text style={{ fontSize: 20 }}>แชร์ facebook</Text>
            <Text style={{ color: 'orange' }}>รับ 20 เหรียญ</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flex: 1, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }} onPress={this.props.onPressVideo}>
            <Icon2 name="local-movies" size={55} color={'#8b4513'} />
            <Text style={{ fontSize: 20 }}>ดูโฆษณา</Text>
            <Text style={{ color: 'orange' }}>รับ 5 เหรียญ</Text>
          </TouchableOpacity>
        </View>
      </PopupDialog>
    )
  }
}
