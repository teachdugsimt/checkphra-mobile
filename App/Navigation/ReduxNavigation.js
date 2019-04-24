import React from 'react'
import { BackHandler, Platform, Linking } from 'react-native'
import { addNavigationHelpers } from 'react-navigation'
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'
import AppNavigation from './AppNavigation'
import I18n from '../I18n/i18n';
I18n.fallbacks = true;

class ReduxNavigation extends React.Component {
  componentWillMount() {
    // if (Platform.OS === 'android') {   // A11
    //   Linking.getInitialURL().then(url => {
    //     this.navigate(url);
    //   });
    // } else {
    //   Linking.addEventListener('url', this.handleOpenURL);
    // }

    if (Platform.OS === 'ios') return
    BackHandler.addEventListener('hardwareBackPress', () => {
      const { dispatch, nav } = this.props
      // change to whatever is your first screen, otherwise unpredictable results may occur
      if (nav.routes.length === 1 && (nav.routes[0].routeName === 'LaunchScreen')) {
        return false
      }
      // if (shouldCloseApp(nav)) return false
      dispatch({ type: 'Navigation/BACK' })
      return true
    })
    
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
  componentWillUnmount() {
    // Linking.removeEventListener('url', this.handleOpenURL);  // B22
    if (Platform.OS === 'ios') return
    BackHandler.removeEventListener('hardwareBackPress')
  }

  render() {
    // console.log('aaaaaaaaaa')
    // console.log(this.props.lang)
    // I18n.locale = this.props.lang
    return <AppNavigation navigation={addNavigationHelpers({ dispatch: this.props.dispatch, state: this.props.nav, addListener: createReduxBoundAddListener('root') })} />
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
})
export default connect(mapStateToProps)(ReduxNavigation)
