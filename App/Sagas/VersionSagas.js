/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put } from 'redux-saga/effects'
import VersionActions from '../Redux/VersionRedux'
import { Platform, Alert, Linking, AsyncStorage } from 'react-native'
import DeviceInfo from 'react-native-device-info';
// import { VersionSelectors } from '../Redux/VersionRedux'

export function* getVersion(api) {
  // const { data } = action
  // get current data from Store
  // const currentData = yield select(VersionSelectors.getData)
  // make the call to the api
  const response = yield call(api.checkVersion, { project_name: 'check-phra' })
  console.log(response)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    // yield put(VersionActions.versionSuccess(response.data))
    const installed_v = DeviceInfo.getBuildNumber()
    if (Platform.OS == 'android') {

      const store_v = response.data.android_v
      if (+store_v > +installed_v) {

        Alert.alert(
          'กรุณาอัพเดทแอ็พของคุณ',
          'มีแอ็พรุ่นที่ใหม่กว่า กรุณาอัพเดทแอ็พของคุณ (!!อัพเดทวันนี้ รับฟรีทันที่ 100 เหรียญ)',
          [
            { text: 'เตือนฉันทีหลัง', onPress: () => console.log('Cancel Pressed') },
            {
              text: 'อัพเดททันที', onPress: () => {
                const url = 'https://play.google.com/store/apps/details?id=com.infiltech.checkphra'    // pc , mobile
                // const url = 'https://m.me/316834699141900' // pc , mobile can't use
                Linking.canOpenURL(url).then(supported => {
                  if (supported) {
                    Linking.openURL(url);
                  } else {
                    console.log('Don\'t know how to open URI: ' + url);
                  }
                });
              }, style: 'cancel'
            },
          ],
          { cancelable: false }
        )

      } else {



      }
    }
  } else {
    // yield put(VersionActions.versionFailure())

  }
}
