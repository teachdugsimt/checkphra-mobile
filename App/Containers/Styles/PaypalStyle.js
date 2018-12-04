import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'
import { Dimensions } from 'react-native'
const { width } = Dimensions.get('window')
export default StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Metrics.navBarHeight,
    // backgroundColor: Colors.background
  },
  imageBackground: {
    position: 'absolute',
    right: 0, bottom: 0,
    width: width,
    height: width * 95.7 / 100
  },
  paypalText: {
    fontFamily: 'Prompt-SemiBold',
    fontSize: 17,
    color: Colors.brownText,
    alignSelf: 'center',
    marginVertical: 15
  }
})
