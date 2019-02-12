import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'
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
    top: 0,
    zIndex: 1,
    width: width - 50,
    height: height - 127.5
  },
  pin: {
    width: 40,
    height: 40,
  },
  touchPin1: {
    position: 'absolute',
    top: height / 11,
    left: width / 3.3,
    zIndex: 2,
    flexDirection: 'row',
  },
  touchPin2: {
    position: 'absolute',
    top: height / 6.75,
    right: width / 20,
    zIndex: 2,
    flexDirection: 'row',
  },
  touchPin3: {
    position: 'absolute',
    top: height / 3.75,
    left: width / 2.82,
    zIndex: 2,
    flexDirection: 'row',
  },
  touchPin4: {
    position: 'absolute',
    top: height / 2.89,
    right: width / 3.49,
    zIndex: 2,
    flexDirection: 'row',
  },
  touchPin5: {
    position: 'absolute',
    bottom: height / 7.78,
    left: width / 3.58,
    zIndex: 2,
    flexDirection: 'row',
  },
  iconView: {
    position: 'absolute',
    right: 15,
    bottom: 10,
  },
})
