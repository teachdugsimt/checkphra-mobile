import '../Config'
import DebugConfig from '../Config/DebugConfig'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import RootContainer from './RootContainer'
import createStore from '../Redux'

// import { Notification, NotificationOpen } from 'react-native-firebase';
import { AsyncStorage, Alert } from 'react-native';
import firebase from 'react-native-firebase';

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

  async componentDidMount() {
    console.log("app did mount")
    this.checkPermission();
    this.createNotificationListeners(); //add this line

  }

  //1
  async checkPermission() {
    console.log("check permission")
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  //3
  async getToken() {
    console.log("get token")
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        console.log(fcmToken)
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } else {
      console.log(fcmToken)
    }
  }

  //2
  async requestPermission() {
    console.log("request permission")
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  //Remove listeners allocated in createNotificationListeners()
  componentWillUnmount() {
    // this.notificationListener();
    // this.notificationOpenedListener();
  }

  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      this.showAlert(title, body);
    });

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }

  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
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
