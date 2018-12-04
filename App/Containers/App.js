import '../Config'
import DebugConfig from '../Config/DebugConfig'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import RootContainer from './RootContainer'
import createStore from '../Redux'

// import { Notification, NotificationOpen } from 'react-native-firebase';


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



  //Remove listeners allocated in createNotificationListeners()
  componentWillUnmount() {
    // this.notificationListener();
    // this.notificationOpenedListener();
  }



  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App
