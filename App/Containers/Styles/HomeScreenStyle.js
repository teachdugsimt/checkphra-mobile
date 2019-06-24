import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'
import { Dimensions } from 'react-native'

let { width, height } = Dimensions.get('window')

export default StyleSheet.create({

  container: {
    flex: 1,
  },
  imageBackground: {
    position: 'absolute',
    right: 0, bottom: 0,
    width: width,
    height: width * 95.7 / 100
  },
  textEmptyData: {
    marginTop: 50,
    alignSelf: 'center',
    fontSize: 20,
    color: '#aaa'
  },
  spinnerText: {
    color: '#fff'
  },

  // ******** Market place Zone *********//
  textMap: {
    fontFamily: 'Prompt-SemiBold',
    fontSize: 16,
    color: Colors.brownText,
    backgroundColor: '#fff5',
    padding: 10,
    borderRadius: 10
  },
  map: {
    position: 'absolute',
    alignSelf: 'center',
    // top: 0,
    zIndex: 1,
    // width: width - 50,
    // height: height - 127.5
    top: 47.5,
    width: width - 90,
    height: height - 195,
  },
  pin: {
    width: 40,
    height: 40,
  },
  touchPin1: {
    position: 'absolute',
    top: height / 8.25,
    left: width / 3.3,
    zIndex: 2,
    flexDirection: 'row',
    paddingTop: 5,
    paddingRight: 5
  },
  touchPin2: {
    position: 'absolute',
    top: height / 5.00,
    right: width / 19.00,
    zIndex: 2,
    flexDirection: 'row',
    paddingTop: 5,
    paddingRight: 5
  },
  touchPin3: {
    position: 'absolute',
    top: height / 3.4,
    left: width / 2.99,
    zIndex: 2,
    flexDirection: 'row',
    paddingTop: 5,
    paddingRight: 5
  },
  touchPin4: {
    position: 'absolute',
    top: height / 2.75,
    // right: width / 6.25,
    zIndex: 2,
    flexDirection: 'row',
    paddingTop: 5,
    paddingRight: 5
  },
  touchPin5: {
    position: 'absolute',
    bottom: height / 7.15,
    left: width / 3.58,
    zIndex: 2,
    flexDirection: 'row',
    paddingTop: 5,
    paddingRight: 5
  },
  iconView: {
    position: 'absolute',
    right: 15,
    bottom: 10,
  },
  popupHeader: {
    ...ApplicationStyles.popupHeader
  }
})
