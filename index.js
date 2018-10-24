import './App/Config/ReactotronConfig'
import { AppRegistry } from 'react-native'
import App from './App/Containers/App'
import bgMessaging from './bgMessaging';

AppRegistry.registerComponent('CheckPhra', () => App)

// AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);
