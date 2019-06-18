import '../Config'
import { Linking, Platform } from 'react-native'
import DebugConfig from '../Config/DebugConfig'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import RootContainer from './RootContainer'
import createStore from '../Redux'
// import { Notification, NotificationOpen } from 'react-native-firebase';
import HuaweiProtectedApps from 'react-native-huawei-protected-apps';

// create our store
const store = createStore()

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */

class App extends Component {

  // state = {
  //   appState: AppState.currentState,
  // };

  componentDidMount() {
    // AppState.addEventListener('change', this._handleAppStateChange);
    // if (Platform.OS === 'android') {   // A11
    //   Linking.getInitialURL().then(url => {
    //     this.navigate(url);
    //   });
    // } else {
    //   Linking.addEventListener('url', this.handleOpenURL);
    // }
    const config = {
      title: "Huawei Protected Apps",
      text: "This app requires to be enabled in 'Protected Apps' in order to receive push notifcations",
      doNotShowAgainText: "Do not show again",
      positiveText: "PROTECTED APPS",
      negativeText: "CANCEL"
    };
    HuaweiProtectedApps.AlertIfHuaweiDevice(config);

  }

  // handleOpenURL = (event) => { // C33
  //   this.navigate(event.url);
  // }

  // navigate = (url) => { // D44
  //   console.log('----------------NAVIGATE SUCC-----------------')
  //   const { navigate } = this.props.navigation;
  //   const route = url.replace(/.*?:\/\//g, '');
  //   // const id = route.match(/\/([^\/]+)\/?$/)[1];
  //   const routeName = route.split('/')[0];
  //   console.log(navigate)
  //   console.log(routeName)
  //   console.log(route)
  //   console.log('---------------- LINKING NAVIGATE -----------------')

  //   if (routeName === 'home') {
  //     // navigate('home', { id, name: 'chris' })
  //     navigate('home')
  //   };
  // }

  // async componentDidMount() {
  //   const notificationOpen = await firebase.notifications().getInitialNotification();
  //   if (notificationOpen) {
  //     const action = notificationOpen.action;
  //     const notification = notificationOpen.notification;
  //     var seen = [];
  //     alert(JSON.stringify(notification.data, function (key, val) {
  //       if (val != null && typeof val == "object") {
  //         if (seen.indexOf(val) >= 0) {
  //           return;
  //         }
  //         seen.push(val);
  //       }
  //       return val;
  //     }));
  //   }
  //   const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
  //     .setDescription('My apps test channel');
  //   // Create the channel
  //   firebase.notifications().android.createChannel(channel);
  //   this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
  //     // Process your notification as required
  //     // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
  //   });
  //   this.notificationListener = firebase.notifications().onNotification((notification) => {
  //     // Process your notification as required
  //     notification
  //       .android.setChannelId('test-channel')
  //       .android.setSmallIcon('ic_launcher');
  //     firebase.notifications()
  //       .displayNotification(notification);

  //   });
  //   this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
  //     // Get the action triggered by the notification being opened
  //     const action = notificationOpen.action;
  //     // Get information about the notification that was opened
  //     const notification = notificationOpen.notification;
  //     var seen = [];
  //     alert(JSON.stringify(notification.data, function (key, val) {
  //       if (val != null && typeof val == "object") {
  //         if (seen.indexOf(val) >= 0) {
  //           return;
  //         }
  //         seen.push(val);
  //       }
  //       return val;
  //     }));
  //     firebase.notifications().removeDeliveredNotification(notification.notificationId);

  //   });
  // }
  // componentWillUnmount() {
  //   this.notificationDisplayedListener();
  //   this.notificationListener();
  //   this.notificationOpenedListener();
  // }

  // _handleAppStateChange = (nextAppState) => {
    // if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
    //   console.log('**********************App has come to the foreground!*****************************');
    // }
    // this.setState({ appState: nextAppState });
  // };

  //Remove listeners allocated in createNotificationListeners()
  // componentWillUnmount() {
    // AppState.removeEventListener('change', this._handleAppStateChange);
    // console.log('************************ CLOSE APP ********************************************************************')
    // Linking.removeEventListener('url', this.handleOpenURL);  // B22
    // this.notificationListener();
    // this.notificationOpenedListener();
  // }


  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron ? console.tron.overlay(App) : App
