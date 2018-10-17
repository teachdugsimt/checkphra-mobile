import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  inputBg: {
    height: 50,
    width: '100%',
    borderRadius: 25,
    backgroundColor: Colors.riceWater,
    marginTop: Metrics.doubleBaseMargin,
    alignSelf: 'center'
  },
  input: {
    width: '100%',
    height: '100%',
    alignSelf: "center",
    paddingHorizontal: Metrics.doubleBaseMargin,
    fontFamily: 'Prompt-Regular',
    fontSize: 20,
    color: 'white'
  }
})
