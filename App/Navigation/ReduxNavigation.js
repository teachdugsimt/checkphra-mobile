import React from 'react'
import { BackHandler, Platform } from 'react-native'
import { addNavigationHelpers } from 'react-navigation'
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'
import AppNavigation from './AppNavigation'
import I18n from '../I18n/i18n';
I18n.fallbacks = true;

class ReduxNavigation extends React.Component {
  componentWillMount() {
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

  componentWillUnmount() {
    if (Platform.OS === 'ios') return
    BackHandler.removeEventListener('hardwareBackPress')
  }

  render() {
    // console.log('aaaaaaaaaa')
    // console.log(this.props.lang)
    // I18n.locale = this.props.lang
    return <AppNavigation navigation={addNavigationHelpers({ dispatch: this.props.dispatch, lang: this.props.lang, state: this.props.nav, addListener: createReduxBoundAddListener('root') })} />
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
  lang: state.auth.language
})
export default connect(mapStateToProps)(ReduxNavigation)
