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

import I18n from '../I18n/i18n';
I18n.fallbacks = true;

import { connect } from "react-redux";


const AuthStack = StackNavigator(
  {
    Signin: { screen: SigninScreen }
  },
  {
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
    headerMode: "float",
    // navigationOptions: ({ navigation }) => ({
    //   headerLeft: (
    //     <TouchableOpacity onPress={() => navigation.navigate("Auth")}>
    //       <Text
    //         style={{
    //           marginLeft: 20,
    //           fontSize: 18,
    //           fontFamily: "Prompt-SemiBold",
    //           color: Colors.brownText
    //         }}
    //       >
    //         {"< กลับ"}
    //       </Text>
    //     </TouchableOpacity>
    //   ),

    // })
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


const DashStack = TabNavigator(
  {
    upload: UploadStack,
    his: HistoryStack,
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
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: 'รายการเติมเงิน',
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
  profile: ProfileStack,
  // verify: VerifyStack,
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




