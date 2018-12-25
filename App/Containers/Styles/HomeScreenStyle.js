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
})
