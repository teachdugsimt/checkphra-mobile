import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  uploadBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    // borderStyle: 'dashed',
    borderColor: Colors.brownTextTran,
    borderRadius: 10,
    margin: 5,
    overflow: 'hidden'
  },
  uploadBoxText: {
    fontFamily: 'Prompt-SemiBold',
    fontSize: 25,
    color: Colors.brownTextTran,
  },
})
