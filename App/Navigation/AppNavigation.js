import ProfileScreen from "../Containers/ProfileScreen";
import UploadScreen from "../Containers/UploadScreen";
import RegisterScreen from "../Containers/RegisterScreen";
import SigninScreen from "../Containers/SigninScreen";
// import LaunchScreen from "../Containers/LaunchScreen";
import HistoryScreen from "../Containers/HistoryScreen";
import AnswerScreen from "../Containers/AnswerScreen";
import DetailTypeScreen from "../Containers/DetailTypeScreen"
import ChangePasswordScreen from "../Containers/ChangePasswordScreen"
import SendImageScreen from '../Containers/SendImageScreen'
import Promotion from '../Containers/Promotion'
import CheckListScreen from '../Containers/CheckListScreen'
import HistoryPoint from '../Containers/HistoryPoint'
import DetailPoint from '../Containers/DetailPoint'
import CheckPhraScreen from '../Containers/CheckPhraScreen'
import VerifyPoint from '../Containers/VerifyPoint'
import VerifyPoint2 from '../Containers/VerifyPoint2'
import Publish from '../Containers/Publish'
import ForgetPassword from '../Containers/ForgetPassword'
import AnswerOfAdmin from '../Containers/AnswerOfAdmin'
import AnswerOfAdmin2 from '../Containers/AnswerOfAdmin2'

import Banking from '../Containers/Payment/Banking'
import Promptpay from '../Containers/Payment/Promptpay'
import Creditcard from '../Containers/Payment/Creditcard'

import styles from "./Styles/NavigationStyles";
import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { Colors } from "../Themes";
import Icon from "react-native-vector-icons/Entypo";
import Icon2 from "react-native-vector-icons/FontAwesome";

import { TabNavigator, TabBarBottom, StackNavigator, SwitchNavigator, Header } from 'react-navigation';

// import { fromLeft } from 'react-navigation-transitions';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';

import I18n from '../I18n/i18n';
I18n.fallbacks = true;

import { connect } from "react-redux";


const AuthStack = StackNavigator(
  {
    Signin: { screen: SigninScreen }
  },
  {
    transitionConfig: getSlideFromRightTransition,
    headerMode: "none"
  }
);

const RegStack = StackNavigator(
  {
    reg: {
      screen: RegisterScreen,
      navigationOptions: {
        title: I18n.t('register'),
      }
    }
  },
  {
    transitionConfig: getSlideFromRightTransition,
    headerMode: "float",
  },
);

const ForgetStack = StackNavigator(
  {
    forget: {
      screen: ForgetPassword,
      navigationOptions: {
        title: I18n.t('forgetPassword'),
      }
    }
  },
  {
    transitionConfig: getSlideFromRightTransition,
    headerMode: "float",
  },
);

const UploadStack = StackNavigator(  // main upload
  {
    uploadScreen: {
      screen: UploadScreen,

    },
    detail: {
      screen: DetailTypeScreen,
      navigationOptions: {
        title: I18n.t('selectAmuletType'),
        // headerTintColor: Colors.headerTitleColor
      }
    },
    send: {
      screen: SendImageScreen,
      navigationOptions: {
        title: I18n.t('selectImagesAndQuestions'),
      }
    }
  },
  {
    transitionConfig: getSlideFromRightTransition,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: Colors.headerTitleColor,
      headerBackTitle: I18n.t('back'),
      headerBackTitleStyle: {
        color: Colors.headerTitleColor,
        fontFamily: 'Prompt-Regular'
      },
      headerStyle: {
        backgroundColor: Colors.tabBar,
      },
      headerTitleStyle: {
        color: Colors.headerTitleColor,
        fontFamily: 'Prompt-Regular'
      },
      tabBarLabel: I18n.t('checkPhra')
    })
  }
)

const ProfileStack = StackNavigator(   // main pro
  {
    profileScreen: {
      screen: ProfileScreen,
      navigationOptions: {
        title: I18n.t('profile')
      }
    },
    change: {
      screen: ChangePasswordScreen, navigationOptions: {
        title: I18n.t('changePassword')
      }
    },
    historyAddPoint: {
      screen: HistoryPoint, navigationOptions: {
        title: I18n.t('purchaseHistory')
      }
    },
    detailPoint: {
      screen: DetailPoint, navigationOptions: {
        title: I18n.t('detailPurchase')
      }
    },
  },
  {
    transitionConfig: getSlideFromRightTransition,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: Colors.tabBar,
      },
      headerTitleStyle: {
        color: Colors.headerTitleColor,
        fontFamily: 'Prompt-Regular'
      },
      tabBarLabel: I18n.t('profile')
    })
  }
);

const PromotionStack = StackNavigator(  // main pro
  {
    promotion: {
      screen: Promotion,
      navigationOptions: {
        title: I18n.t('package')
      }
    },
    banking: {
      screen: Banking, navigationOptions: {
        title: I18n.t('banking')
      }
    },
    promptpay: {
      screen: Promptpay, navigationOptions: {
        title: I18n.t('promptpay')
      }
    },
    creditcard: {
      screen: Creditcard,
      navigationOptions: {
        title: I18n.t('creditCard')
      }
    },
  },
  {
    transitionConfig: getSlideFromRightTransition,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: Colors.headerTitleColor,
      headerBackTitle: I18n.t('back'),
      headerBackTitleStyle: {
        color: Colors.headerTitleColor,
        fontFamily: 'Prompt-Regular'
      },
      headerStyle: {
        backgroundColor: Colors.tabBar,
      },
      headerTitleStyle: {
        color: Colors.headerTitleColor,
        fontFamily: 'Prompt-Regular'
      },
      tabBarLabel: I18n.t('package')
    })
  }
)

const HistoryStack = StackNavigator(  // mmain his
  {
    his: {
      screen: HistoryScreen,
      navigationOptions: {
        title: I18n.t('history')
      }
    },
    answer: {
      screen: AnswerScreen,
      navigationOptions: {
        title: I18n.t('result'),
      }
    }
  },
  {
    transitionConfig: getSlideFromRightTransition,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: Colors.headerTitleColor,
      headerBackTitle: I18n.t('Back'),
      headerBackTitleStyle: {
        color: Colors.headerTitleColor,
        fontFamily: 'Prompt-Regular'
      },
      headerStyle: {
        backgroundColor: Colors.tabBar,
      },
      headerTitleStyle: {
        color: Colors.headerTitleColor,
        fontFamily: 'Prompt-Regular'
      },
      tabBarLabel: I18n.t('history')
    })
  }
);

const PublishStack = StackNavigator(  // Publish stack
  {
    pub: {
      screen: Publish,
      navigationOptions: {
        title: I18n.t('publish')
      }
    },
  },
  {
    transitionConfig: getSlideFromRightTransition,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: Colors.headerTitleColor,
      headerBackTitle: I18n.t('Back'),
      headerBackTitleStyle: {
        color: Colors.headerTitleColor,
        fontFamily: 'Prompt-Regular'
      },
      headerStyle: {
        backgroundColor: Colors.tabBar,
      },
      headerTitleStyle: {
        color: Colors.headerTitleColor,
        fontFamily: 'Prompt-Regular'
      },
      tabBarLabel: I18n.t('publish')
    })
  }
);

const DashStack = TabNavigator(
  {
    upload: UploadStack,
    his: HistoryStack,
    pub: PublishStack,
    pro: PromotionStack,
    profile: ProfileStack,
  },
  {
    initialRouteName: "upload",
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName == "profile") {
          iconName = `user-circle${focused ? "" : "-o"}`;
        }
        if (routeName == "upload") {
          iconName = `image${focused ? "" : ""}`;
        }
        if (routeName == "his") {
          iconName = `history${focused ? "" : ""}`;
        }
        if (routeName == "pro") {
          iconName = `gift${focused ? "" : ""}`;
          //gift, money, credit-card
        }
        if (routeName == "pub") {
          iconName = `newspaper-o${focused ? "" : ""}`;
        }
        return <Icon2 name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: Colors.activeTab,
      inactiveTintColor: Colors.inactiveTab,
      style: {
        height: 60,
        backgroundColor: Colors.tabBar,
      },
      labelStyle: {
        fontSize: 14,
        fontFamily: "Prompt-Regular",
        marginBottom: 5
      }
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom"
  }
);


const CheckListStack = StackNavigator({ // **********************FOR EXPERT & ADMIN *************************
  check: {
    screen: CheckListScreen,
    navigationOptions: {
      title: I18n.t('pendingList')
    }
  },
  check2: {
    screen: CheckPhraScreen,
    navigationOptions: {
      title: I18n.t('pending')
    }
  }
}, {
    transitionConfig: getSlideFromRightTransition,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: I18n.t('pendingList'),
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: Colors.tabBar,
      },
      headerTitleStyle: {
        color: 'white',
        fontFamily: 'Prompt-Regular'
      },
    })
  })

const VerifyStack = StackNavigator({ // **********************FOR ADMIN *************************
  check: {
    screen: VerifyPoint,
    navigationOptions: {
      title: I18n.t('pendingCoin')
    }
  },
  check2: {
    screen: VerifyPoint2,
    navigationOptions: {
      title: I18n.t('detailCoin')
    }
  }
}, {
    transitionConfig: getSlideFromRightTransition,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: 'Coin List',
      headerStyle: {
        backgroundColor: Colors.tabBar,
      },
      headerTitleStyle: {
        color: 'white',
        fontFamily: 'Prompt-Regular'
      },
    })
  })

  const AdminAnswerStack = StackNavigator({ // **********************FOR ADMIN *************************
    answer: {
      screen: AnswerOfAdmin,
      navigationOptions: {
        title: I18n.t('adminAnswer')
      }
    },
    detail: {
      screen: AnswerOfAdmin2,
      navigationOptions: {
        title: I18n.t('detailAnswer')
      }
    }
  }, {
      transitionConfig: getSlideFromRightTransition,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: 'Answered',
        headerStyle: {
          backgroundColor: Colors.tabBar,
        },
        headerTitleStyle: {
          color: 'white',
          fontFamily: 'Prompt-Regular'
        },
      })
    })

const AdminStack = TabNavigator({  // *************** MAIN ADMIN *************************
  checklist: CheckListStack,
  verify: VerifyStack,
  pub: PublishStack,
  answeradmin: AdminAnswerStack,
  profile: ProfileStack,
}, {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName == "checklist") {
          iconName = `list-ul${focused ? "" : ""}`;
        }
        if (routeName == "profile") {
          iconName = `user-circle${focused ? "" : "-o"}`;
        }
        if (routeName == "verify") {
          iconName = `money`;
        }
        if (routeName == "pub") {
          iconName = `newspaper-o${focused ? "" : ""}`;
        }
        if (routeName == "answeradmin") {
          iconName = `folder-open${focused ? "" : ""}`;
        }
        return <Icon2 name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: Colors.activeTab,
      inactiveTintColor: Colors.inactiveTab,
      style: {
        height: 60,
        backgroundColor: Colors.tabBar,
      },
      labelStyle: {
        fontSize: 15,
        fontFamily: "Prompt-Regular",
        marginBottom: 5,
        // tabBarComponent: TabBarBottom,
        // tabBarPosition: "bottom"
      },
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom"
  })

const ExpertStack = TabNavigator({  // *************** MAIN EXPERT & ADMIN *************************
  checklist: CheckListStack,
  pub: PublishStack,
  profile: ProfileStack,
}, {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName == "checklist") {
          iconName = `list-ul${focused ? "" : ""}`;
        }
        if (routeName == "profile") {
          iconName = `user-circle${focused ? "" : "-o"}`;
        }
        if (routeName == "pub") {
          iconName = `newspaper-o${focused ? "" : ""}`;
        }
        return <Icon2 name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: Colors.activeTab,
      inactiveTintColor: Colors.inactiveTab,
      style: {
        height: 60,
        backgroundColor: Colors.tabBar,
      },
      labelStyle: {
        fontSize: 15,
        fontFamily: "Prompt-Regular",
        marginBottom: 5,
        // tabBarComponent: TabBarBottom,
      },
      // tabBarPosition: "bottom"
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom"
  })

// Manifest of possible screens
const PrimaryNav = SwitchNavigator(
  {
    Auth: AuthStack,
    Reg: RegStack,
    Forget: ForgetStack,
    App: DashStack,
    ExpertApp: ExpertStack,
    AdminApp: AdminStack,
  },
  {
    // Default config for all screens
    headerMode: "none",
    initialRouteName: "Auth",
    navigationOptions: ({ navigation }) => {

      return {
        headerStyle: styles.header
      }
    }
  }
);

const mapStateToProps = state => {
  return {
    // lang: state.auth.language,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrimaryNav);

// export default PrimaryNav;




