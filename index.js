import './App/Config/ReactotronConfig'
import { AppRegistry } from 'react-native'
import App from './App/Containers/App'
import bgMessaging from './bgMessaging';
// import AppNavigation from './App/Navigation/AppNavigation'  // add new 24/04/2019!!

AppRegistry.registerComponent('CheckPhra', () => App)
// AppRegistry.registerComponent('checkphra', () => App)
// AppRegistry.registerComponent('CheckPhra', () => AppNavigation)  // add new 24/04/2019!!

// AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);
