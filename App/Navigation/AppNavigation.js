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
import Bit from '../Containers/Bit'
import Bit2 from '../Containers/Bit2'
import UserBit from '../Containers/UserBit'
import UserBit2 from '../Containers/UserBit2'
import LeasingAdmin from '../Containers/LeasingAdmin'
import CardVerifyPoint from '../Containers/CardVerifyPoint'
import CardVerifyPoint2 from '../Containers/CardVerifyPoint2'
import AppleVerifyPoint from '../Containers/AppleVerifyPoint'
import AppleVerifyPoint2 from '../Containers/AppleVerifyPoint2'
import DetailTypeScreen2 from '../Containers/DetailTypeScreen2'
import DetailTypeScreen3 from '../Containers/DetailTypeScreen3'
import HomeScreen from '../Containers/HomeScreen'
import ShowAmuletRoom from '../Containers/ShowAmuletRoom'
import MyRealAmulet from '../Containers/MyRealAmulet'
import TheyAmuletRoom from '../Containers/TheyAmuletRoom'
import ChatMyAmulet from '../Containers/ChatMyAmulet'
import ChatRoomMyAmulet from '../Containers/ChatRoomMyAmulet'
import ChatRoomMyAmuletSolo from '../Containers/ChatRoomMyAmuletSolo'
import ChatTheirAmulet from '../Containers/ChatTheirAmulet'
import ChatTheirAmuletOwner from '../Containers/ChatTheirAmuletOwner'
import ContactAdmin from '../Containers/ContactAdmin'
import AdminHome from '../Containers/AdminHome'
import AdminContactUser from '../Containers/AdminContactUser'
import AdminContactUser2 from '../Containers/AdminContactUser2'
import AnswerOfExpert2 from '../Containers/AnswerOfExpert2'
import UserContactOwner from '../Containers/UserContactOwner'
import UserContactOwner2 from '../Containers/UserContactOwner2'
import Webboard from '../Containers/Webboard'
import Webboard2 from '../Containers/Webboard2'
import Certificate from '../Containers/Certificate'

import EmptyScreen from '../Containers/EmptyScreen'
import MarketHome from '../Containers/MarketHome'
import MarketUpload1 from '../Containers/MarketUpload1'
import MarketHomeList1 from '../Containers/MarketHomeList1'
import MarketUpload2 from '../Containers/MarketUpload2'
import MarketUpload2n1 from '../Containers/MarketUpload2n1'
import MarketOpenstore from '../Containers/MarketOpenstore'
import AdminVerifyShop from '../Containers/AdminVerifyShop'
import AdminVerifyShop2 from '../Containers/AdminVerifyShop2'
import MarketMyAmulet from '../Containers/MarketMyAmulet'
import MarketSelectType from '../Containers/MarketSelectType'
import MarketListShop from '../Containers/MarketListShop'
import MarketListShop2 from '../Containers/MarketListShop2'
import MarketSearch1 from '../Containers/MarketSearch1'
import LinkNewAmulet from '../Containers/LinkNewAmulet'
import ChatTheirAmulet2 from '../Containers/ChatTheirAmulet2'
import ChatTheirAmuletOwner2 from '../Containers/ChatTheirAmuletOwner2'
import ListMyContact from '../Containers/ListMyContact'
import ListMyContact2 from '../Containers/ListMyContact2'
import ListExpert from '../Containers/ListExpertBid/ListExpert'
import ListExpert2 from '../Containers/ListExpertBid/ListExpert2'
import ListExpert3 from '../Containers/ListExpertBid/ListExpert3'
import ListExpertChecked from '../Containers/ListExpertCheck/ListExpertChecked'
import ListExpertChecked2 from '../Containers/ListExpertCheck/ListExpertChecked2'
import BidExpert from '../Containers/BidExpert'
import BidExpert2 from '../Containers/BidExpert2'
import ExpertHome from '../Containers/ExpertHome'
import AddCoins from '../Containers/AddCoins'
// import ListExpertChecked3 from '../Containers/ListExpertCheck/ListExpertChecked3'

import Banking from '../Containers/Payment/Banking'
import Promptpay from '../Containers/Payment/Promptpay'
import Creditcard from '../Containers/Payment/Creditcard'

import styles from "./Styles/NavigationStyles";
import React from "react";
import { TouchableOpacity, View, Text, Image, Linking } from "react-native";
import { Colors } from "../Themes";
import Icon2 from "react-native-vector-icons/FontAwesome";

import { TabNavigator, TabBarBottom, StackNavigator, SwitchNavigator, Header, TabBarTop } from 'react-navigation';
import Paypal from '../Containers/Payment/Paypal'

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
    headerMode: "none"
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
    home: {
      screen: HomeScreen,
      // path: "home", //<!-- add 24/04/2019 -->
      navigationOptions: {
        title: I18n.t('home'),
      },
    },
    empty: {
      screen: EmptyScreen,
      navigationOptions: {
        title: "Market",
      }
    },
    people: {    // add new 25/04/2019!!
      screen: LinkNewAmulet
    },
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
    detail2: {
      screen: DetailTypeScreen2,
      navigationOptions: {
        title: I18n.t('selectAmuletType'),
        // headerTintColor: Colors.headerTitleColor
      }
    },
    detail3: {
      screen: DetailTypeScreen3,
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
    },
    showroom: {
      screen: ShowAmuletRoom,
      navigationOptions: {
        title: I18n.t('showAmuletReal')
      }
    },
    myAmulet: {
      screen: MyRealAmulet,
      navigationOptions: {
        title: I18n.t('myAmulet')
      }
    },
    chatMyAmulet: {
      screen: ChatMyAmulet,
      navigationOptions: {
        title: I18n.t('chatMyAmulet')
      }
    },
    chatRoomMyAmulet: {
      screen: ChatRoomMyAmulet,
      navigationOptions: {
        title: I18n.t('chatMyAmulet')
      }
    },
    chatRoomMyAmuletSolo: {
      screen: ChatRoomMyAmuletSolo,
      navigationOptions: {
        title: I18n.t('chatMyAmulet')
      }
    },
    theyAmulet: {
      screen: TheyAmuletRoom,
      navigationOptions: {
        title: I18n.t('showAmuletReal')
      }
    },
    chatTheirAmulet: {
      screen: ChatTheirAmulet,
      navigationOptions: {
        title: I18n.t('chat')
      }
    },
    chatTheirAmulet2: {
      screen: ChatTheirAmulet2,
      navigationOptions: {
        title: I18n.t('chat')
      }
    },
    chatTheirAmuletOwner2: {
      screen: ChatTheirAmuletOwner2,
      navigationOptions: {
        title: I18n.t('chat')
      }
    },
    chatTheirAmuletOwner: {
      screen: ChatTheirAmuletOwner,
      navigationOptions: {
        title: I18n.t('chat')
      }
    },
    contactAdmin: {
      screen: ContactAdmin,
      navigationOptions: {
        title: I18n.t('contactAdmin')
      }
    },
    listMyContact: {
      screen: ListMyContact,
      navigationOptions: {
        title: I18n.t("contactOwnerAmulet")
      }
    },
    listMyContact2: {
      screen: ListMyContact2,
      navigationOptions: {
        title: I18n.t("contactOwnerAmulet")
      }
    },
    userContactOwner: {
      screen: UserContactOwner,
      navigationOptions: {
        title: I18n.t('contactOwnerAmulet')
      }
    },
    marketHome: {
      screen: MarketHome,
      navigationOptions: {
        title: I18n.t("market")
      }
    },
    marketListArea1: {
      screen: MarketHomeList1,
      navigationOptions: {
        title: I18n.t('market')
      }
    },
    marketUpload1: {
      screen: MarketUpload1,
      navigationOptions: {
        title: I18n.t('market')
      }
    },
    marketUpload2: {
      screen: MarketUpload2,
      navigationOptions: {
        title: I18n.t('market')
      }
    },
    marketUpload2n1: {
      screen: MarketUpload2n1,
      navigationOptions: {
        title: I18n.t('market')
      }
    },
    marketStore: {
      screen: MarketOpenstore,
      navigationOptions: {
        title: I18n.t('marketOpen')
      }
    },
    marketMylistAmulet: {
      screen: MarketMyAmulet,
      navigationOptions: {
        title: I18n.t('myShop')
      }
    },
    marketSelectType: {
      screen: MarketSelectType,
      navigationOptions: {
        title: I18n.t('market')
      }
    },
    marketListShop: {
      screen: MarketListShop,
      navigationOptions: {
        title: I18n.t('market')
      }
    },
    marketListShop2: {
      screen: MarketListShop2,
      navigationOptions: {
        title: I18n.t('market')
      }
    },
    marketSearch1: {
      screen: MarketSearch1,
      navigationOptions: {
        title: I18n.t('searchResult')
      }
    },
    webboard: {
      screen: Webboard,
      navigationOptions: {
        title: I18n.t('webBoard')
      }
    },
    webboard2: {
      screen: Webboard2,
      navigationOptions: {
        title: I18n.t('webBoard')
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
      tabBarLabel: I18n.t('home')
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
      headerTintColor: Colors.headerTitleColor,
      headerBackTitle: I18n.t('back'),
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
    paypal: {
      screen: Paypal,
      navigationOptions: {
        title: I18n.t('creditCard')
      }
    }
    // creditcard: {
    //   screen: Creditcard,
    //   navigationOptions: {
    //     title: I18n.t('creditCard')
    //   }
    // },
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

const UserBitStack = StackNavigator(  // Publish stack // ORIGINAL ONE BIT STACK
  {
    userBit: {
      screen: UserBit,
      navigationOptions: {
        title: I18n.t('bitPrice2')
      }
    },
    userBit2: {
      screen: UserBit2,
      navigationOptions: {
        title: I18n.t('bitPrice2')
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
      tabBarLabel: "Mr.Blue"
    })
  }
);

//   *******************PHASE 2 STACK***********************************

// const LeasingAdminStack = StackNavigator(      // 111111111
//   {
//     leasingAdmin: {
//       screen: LeasingAdmin,
//       // navigationOptions: {
//       //   title: I18n.t('adminLeasing')
//       // }
//     },
//   },
//   {
//     transitionConfig: getSlideFromRightTransition,
//     navigationOptions: ({ navigation }) => ({
//       header: false,
//       headerTintColor: Colors.headerTitleColor,
//       headerBackTitle: I18n.t('Back'),
//       headerBackTitleStyle: {
//         color: Colors.headerTitleColor,
//         fontFamily: 'Prompt-Regular'
//       },
//       headerStyle: {
//         backgroundColor: Colors.tabBar,
//       },
//       headerTitleStyle: {
//         color: Colors.headerTitleColor,
//         fontFamily: 'Prompt-Regular'
//       },
//       tabBarLabel: I18n.t('adminLeasing')
//     })
//   }
// )

// const UserBitStack = StackNavigator(  // Publish stack   2222222222
//   {
//     userBit: {
//       screen: UserBit,
//       // navigationOptions: {
//       //   title: I18n.t('bitPrice2')
//       // }
//     },
//     userBit2: {
//       screen: UserBit2,
//       // navigationOptions: {
//       //   title: I18n.t('bitPrice2')
//       // }
//     },
//   },
//   {
//     transitionConfig: getSlideFromRightTransition,
//     navigationOptions: ({ navigation }) => ({
//       header: false,
//       headerTintColor: Colors.headerTitleColor,
//       headerBackTitle: I18n.t('Back'),
//       headerBackTitleStyle: {
//         color: Colors.headerTitleColor,
//         fontFamily: 'Prompt-Regular'
//       },
//       headerStyle: {
//         backgroundColor: Colors.tabBar,
//       },
//       headerTitleStyle: {
//         color: Colors.headerTitleColor,
//         fontFamily: 'Prompt-Regular'
//       },
//       tabBarLabel: I18n.t('bitPrice2')
//     })
//   }
// );

// const TradingStack = TabNavigator(      //33333333333333333333
//   {
//     trade1: UserBitStack,
//     trade2: LeasingAdminStack,
//   },
//   {
//     tabBarOptions: {
//       activeTintColor: Colors.activeTab,
//       inactiveTintColor: Colors.inactiveTab,
//       style: {
//         height: 60,
//         backgroundColor: Colors.tabBar,
//       },
//       labelStyle: {
//         fontSize: 14,
//         fontFamily: "Prompt-Regular",
//         marginBottom: 5
//       }
//     },
//     tabBarComponent: TabBarTop,
//     tabBarPosition: "top"
//   }
// )
//     **************** PHASE 2 STACK******************


const DashStack = TabNavigator(   // **************  USER STACK *******************
  {
    // upload: UploadStack,
    upload: {
      screen: UploadStack,
      path: "listhome"
    },
    his: HistoryStack,
    // trade: TradingStack,  //  PHASE 2 wait for person more than now person
    // pub: PublishStack,
    userbit: UserBitStack,   // ????????????????????? userbit  => Tab nav / do 2 stack nav and push it to Tab nav(userbit)
    pro: {
      screen: PromotionStack,
      // navigationOptions: ({ screenProps }) => ({
      //   tabBarIcon: ({ tintColor }) =>
      //     <IconBadge
      //       MainElement={<Icon2 name={'gift'} size={30} color={tintColor} />}
      //       BadgeElement={<Text style={{ color: 'white' }}>Hot</Text>}
      //       IconBadgeStyle={
      //         { paddingHorizontal: 5, top: 1, right: -22 }
      //       }
      //       Hidden={false}
      //     />
      // })
    },
    profile: ProfileStack,
  },
  {
    initialRouteName: "upload",
    navigationOptions: ({ navigation }) => ({
      headerTintColor: Colors.headerTitleColor,
      headerBackTitle: I18n.t('Back'),
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
        if (routeName == "userbit") {
          iconName = `exchange${focused ? "" : ""}`;
        }
        if (routeName == "home") {
          iconName = `exchange${focused ? "" : ""}`;
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


const AdminHomeStack = StackNavigator({
  adhome: {
    screen: AdminHome,
    navigationOptions: {
      title: I18n.t('home')
    }
  },
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
  },
  certificate: {
    screen: Certificate,
    navigationOptions: {
      title: I18n.t('certificateList')
    }
  }
  ,
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
  },
  chat2: {
    screen: AdminContactUser,
    navigationOptions: {
      title: I18n.t('userContact')
    }
  },
  chat3: {
    screen: AdminContactUser2,
    navigationOptions: {
      title: I18n.t('userContact')
    }
  },
  web1: {
    screen: Webboard,
    navigationOptions: {
      title: I18n.t('webBoard')
    }
  },
  web2: {
    screen: Webboard2,
    navigationOptions: {
      title: I18n.t('webBoard')
    }
  },
  marketHome: {
    screen: MarketHome,
    navigationOptions: {
      title: I18n.t("market")
    }
  },
  marketListArea1: {
    screen: MarketHomeList1,
    navigationOptions: {
      title: I18n.t('market')
    }
  },
  marketUpload1: {
    screen: MarketUpload1,
    navigationOptions: {
      title: I18n.t('market')
    }
  },
  marketUpload2: {
    screen: MarketUpload2,
    navigationOptions: {
      title: I18n.t('market')
    }
  },
  marketUpload2n1: {
    screen: MarketUpload2n1,
    navigationOptions: {
      title: I18n.t('market')
    }
  },
  marketStore: {
    screen: MarketOpenstore,
    navigationOptions: {
      title: I18n.t('market')
    }
  },
  marketMylistAmulet: {
    screen: MarketMyAmulet,
    navigationOptions: {
      title: I18n.t('myShop')
    }
  },
  marketSelectType: {
    screen: MarketSelectType,
    navigationOptions: {
      title: I18n.t('market')
    }
  },
  marketListShop: {
    screen: MarketListShop,
    navigationOptions: {
      title: I18n.t('market')
    }
  },
  marketListShop2: {
    screen: MarketListShop2,
    navigationOptions: {
      title: I18n.t('market')
    }
  },
  marketSearch1: {
    screen: MarketSearch1,
    navigationOptions: {
      title: I18n.t('searchResult')
    }
  },
  chatTheirAmulet: {
    screen: ChatTheirAmulet,
    navigationOptions: {
      title: I18n.t('chat')
    }
  },
  chatTheirAmuletOwner: {
    screen: ChatTheirAmuletOwner,
    navigationOptions: {
      title: I18n.t('chat')
    }
  },
  chatTheirAmulet2: {
    screen: ChatTheirAmulet2,
    navigationOptions: {
      title: I18n.t('chat')
    }
  },
  chatTheirAmuletOwner2: {
    screen: ChatTheirAmuletOwner2,
    navigationOptions: {
      title: I18n.t('chat')
    }
  },
  bit: {
    screen: Bit,
    navigationOptions: {
      title: I18n.t('bitPrice2')
    }
  },
  bit2: {
    screen: Bit2,
    navigationOptions: {
      title: I18n.t('bitPrice2')
    }
  },
  listExpert: {
    screen: ListExpert,
    navigationOptions: {
      title: I18n.t('listExpert')
    }
  },
  listExpert2: {
    screen: ListExpert2,
    navigationOptions: {
      title: I18n.t('listExpert')
    }
  },
  listExpert3: {
    screen: ListExpert3,
    navigationOptions: {
      title: I18n.t('listExpert')
    }
  },
  listExpertChecked: {
    screen: ListExpertChecked,
    navigationOptions: {
      title: I18n.t('listExpert')
    }
  },
  listExpertChecked2: {
    screen: ListExpertChecked2,
    navigationOptions: {
      title: I18n.t('listExpert')
    }
  },
  AddCoins: {
    screen: AddCoins,
    navigationOptions: {
      title: I18n.t("addCoin")
    }
  }
  // listExpertChecked3: {
  //   screen: ListExpertChecked3,
  //   navigationOptions: {
  //     title: I18n.t('listExpert')
  //   }
  // },
  // chatRoomMyAmulet: {
  //   screen: ChatRoomMyAmulet,
  //   navigationOptions: {
  //     title: I18n.t('chatMyAmulet')
  //   }
  // },
  // chatRoomMyAmuletSolo: {
  //   screen: ChatRoomMyAmuletSolo,
  //   navigationOptions: {
  //     title: I18n.t('chatMyAmulet')
  //   }
  // },

}, {
    transitionConfig: getSlideFromRightTransition,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: Colors.headerTitleColor,
      // headerBackTitle: I18n.t('Back'),
      tabBarLabel: I18n.t('home'),
      headerStyle: {
        backgroundColor: Colors.tabBar,
      },
      headerTitleStyle: {
        color: 'white',
        fontFamily: 'Prompt-Regular'
      },
    })
  })

const ExpertHomeStack = StackNavigator({ // **********************FOR EXPERT ONLY!! *************************
  expertHome: {
    screen: ExpertHome,
    navigationOptions: {
      title: I18n.t('home')
    }
  },
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
  },

  // BIT EXPERT
  bitexpert: {
    screen: BidExpert,
    navigationOptions: {
      title: I18n.t('bitPrice2')
    }
  },
  bitexpert2: {
    screen: BidExpert2,
    navigationOptions: {
      title: I18n.t('bitPrice2')
    }
  },

  // EDIT ANSWER
  answerExpert1: {
    screen: AnswerOfAdmin,
    navigationOptions: {
      title: I18n.t('answer')
    }
  },
  answerExpert2: {
    screen: AnswerOfExpert2,
    navigationOptions: {
      title: I18n.t('answer')
    }
  },

  // LIST STATISTIC
  listExpert: {
    screen: ListExpert,
    navigationOptions: {
      title: I18n.t('listExpert')
    }
  },
  listExpert2: {
    screen: ListExpert2,
    navigationOptions: {
      title: I18n.t('listExpert')
    }
  },
  listExpert3: {
    screen: ListExpert3,
    navigationOptions: {
      title: I18n.t('listExpert')
    }
  },
  listExpertChecked: {
    screen: ListExpertChecked,
    navigationOptions: {
      title: I18n.t('listExpert')
    }
  },
  listExpertChecked2: {
    screen: ListExpertChecked2,
    navigationOptions: {
      title: I18n.t('listExpert')
    }
  },

  // USER PROBLEM
  chat2: {
    screen: AdminContactUser,
    navigationOptions: {
      title: I18n.t('userContact')
    }
  },
  chat3: {
    screen: AdminContactUser2,
    navigationOptions: {
      title: I18n.t('userContact')
    }
  },

  // MARKET && WEBBOARD
  web1: {
    screen: Webboard,
    navigationOptions: {
      title: I18n.t('webBoard')
    }
  },
  web2: {
    screen: Webboard2,
    navigationOptions: {
      title: I18n.t('webBoard')
    }
  },
  marketHome: {
    screen: MarketHome,
    navigationOptions: {
      title: I18n.t("market")
    }
  },
  marketListArea1: {
    screen: MarketHomeList1,
    navigationOptions: {
      title: I18n.t('market')
    }
  },
  marketUpload1: {
    screen: MarketUpload1,
    navigationOptions: {
      title: I18n.t('market')
    }
  },
  marketUpload2: {
    screen: MarketUpload2,
    navigationOptions: {
      title: I18n.t('market')
    }
  },
  marketUpload2n1: {
    screen: MarketUpload2n1,
    navigationOptions: {
      title: I18n.t('market')
    }
  },
  marketStore: {
    screen: MarketOpenstore,
    navigationOptions: {
      title: I18n.t('market')
    }
  },
  marketMylistAmulet: {
    screen: MarketMyAmulet,
    navigationOptions: {
      title: I18n.t('myShop')
    }
  },
  marketSelectType: {
    screen: MarketSelectType,
    navigationOptions: {
      title: I18n.t('market')
    }
  },
  marketListShop: {
    screen: MarketListShop,
    navigationOptions: {
      title: I18n.t('market')
    }
  },
  marketListShop2: {
    screen: MarketListShop2,
    navigationOptions: {
      title: I18n.t('market')
    }
  },
  marketSearch1: {
    screen: MarketSearch1,
    navigationOptions: {
      title: I18n.t('searchResult')
    }
  },
  chatTheirAmulet: {
    screen: ChatTheirAmulet,
    navigationOptions: {
      title: I18n.t('chat')
    }
  },
  chatTheirAmuletOwner: {
    screen: ChatTheirAmuletOwner,
    navigationOptions: {
      title: I18n.t('chat')
    }
  },
  chatTheirAmulet2: {
    screen: ChatTheirAmulet2,
    navigationOptions: {
      title: I18n.t('chat')
    }
  },
  chatTheirAmuletOwner2: {
    screen: ChatTheirAmuletOwner2,
    navigationOptions: {
      title: I18n.t('chat')
    }
  },
}, {
    transitionConfig: getSlideFromRightTransition,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: Colors.headerTitleColor,
      headerBackTitle: I18n.t('Back'),
      tabBarLabel: I18n.t('home'),
      headerStyle: {
        backgroundColor: Colors.tabBar,
      },
      headerTitleStyle: {
        color: 'white',
        fontFamily: 'Prompt-Regular'
      },
    })
  })

const CardStack = StackNavigator({ // HISTORY ADD COIN BY CREDIT CARD
  card: {
    screen: CardVerifyPoint,
    navigationOptions: {
      // title: I18n.t('pendingCoin')
    }
  },
  card2: {
    screen: CardVerifyPoint2,
    navigationOptions: {
      // title: I18n.t('detailCoin')
    }
  }
}, {
    transitionConfig: getSlideFromRightTransition,
    navigationOptions: ({ navigation }) => ({
      header: false,
      headerTintColor: Colors.headerTitleColor,
      headerBackTitle: I18n.t('Back'),
      // tabBarLabel: I18n.t('pendingCoin'),
      tabBarLabel: I18n.t('creditCard'),
      headerStyle: {
        backgroundColor: Colors.tabBar,
      },
      headerTitleStyle: {
        color: 'white',
        fontFamily: 'Prompt-Regular'
      },
    })
  })


const AppleStack = StackNavigator({ // HISTORY ADD COIN BY CREDIT CARD
  apple: {
    screen: AppleVerifyPoint,
    navigationOptions: {
      // title: I18n.t('pendingCoin')
    }
  },
  apple2: {
    screen: AppleVerifyPoint2,
    navigationOptions: {
      // title: I18n.t('detailCoin')
    }
  }
}, {
    transitionConfig: getSlideFromRightTransition,
    navigationOptions: ({ navigation }) => ({
      header: false,
      headerTintColor: Colors.headerTitleColor,
      headerBackTitle: I18n.t('Back'),
      // tabBarLabel: I18n.t('pendingCoin'),
      tabBarLabel: I18n.t('apple'),
      headerStyle: {
        backgroundColor: Colors.tabBar,
      },
      headerTitleStyle: {
        color: 'white',
        fontFamily: 'Prompt-Regular'
      },
    })
  })

const VerifyStack = StackNavigator({ // HISTORY ADD COIN BY BANKING
  check: {
    screen: VerifyPoint,
    navigationOptions: {
      // title: I18n.t('pendingCoin')
      // title: I18n.t('banking')
    }
  },
  check2: {
    screen: VerifyPoint2,
    navigationOptions: {
      // title: I18n.t('detailCoin')
      // title: I18n.t('banking')
    }
  }
}, {
    transitionConfig: getSlideFromRightTransition,
    navigationOptions: ({ navigation }) => ({
      header: false,
      headerTintColor: Colors.headerTitleColor,
      headerBackTitle: I18n.t('Back'),
      // tabBarLabel: I18n.t('pendingCoin'),
      tabBarLabel: I18n.t('banking'),
      headerStyle: {
        backgroundColor: Colors.tabBar,
      },
      headerTitleStyle: {
        color: 'white',
        fontFamily: 'Prompt-Regular'
      },
    })
  })

const MoneyStack = TabNavigator(      // MONEY TRANSACTIONS
  {
    cardTran: VerifyStack,
    bankTran: CardStack,
    apple: AppleStack,
  },
  {
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
    tabBarComponent: TabBarTop,
    tabBarPosition: "top",
    tabBarLabel: I18n.t('pendingCoin'),
  }
)

// const AdminAnswerStack = StackNavigator({ // **********************FOR ADMIN *************************
//   answer: {
//     screen: AnswerOfAdmin,
//     navigationOptions: {
//       title: I18n.t('adminAnswer')
//     }
//   },
//   detail: {
//     screen: AnswerOfAdmin2,
//     navigationOptions: {
//       title: I18n.t('detailAnswer')
//     }
//   }
// }, {
//     transitionConfig: getSlideFromRightTransition,
//     navigationOptions: ({ navigation }) => ({
//       headerTintColor: Colors.headerTitleColor,
//       headerBackTitle: I18n.t('Back'),
//       tabBarLabel: I18n.t('editAnswer'),
//       headerStyle: {
//         backgroundColor: Colors.tabBar,
//       },
//       headerTitleStyle: {
//         color: 'white',
//         fontFamily: 'Prompt-Regular'
//       },
//     })
//   })



const BitStack = StackNavigator({ // **********************FOR ADMIN *************************
  bit: {
    screen: Bit,
    navigationOptions: {
      title: I18n.t('bitPrice2')
    }
  },
  bit2: {
    screen: Bit2,
    navigationOptions: {
      title: I18n.t('bitPrice2')
    }
  }
}, {
    transitionConfig: getSlideFromRightTransition,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: Colors.headerTitleColor,
      headerBackTitle: I18n.t('Back'),
      tabBarLabel: I18n.t('bitPrice2'),
      headerStyle: {
        backgroundColor: Colors.tabBar,
      },
      headerTitleStyle: {
        color: 'white',
        fontFamily: 'Prompt-Regular'
      },
    })
  })

const SubmitShopStack = StackNavigator({ // **********************FOR ADMIN *************************
  shop1: {
    screen: AdminVerifyShop,
    navigationOptions: {
      title: I18n.t('submitShop')
    }
  },
  shop2: {
    screen: AdminVerifyShop2,
    navigationOptions: {
      title: I18n.t('submitShop')
    }
  }
}, {
    transitionConfig: getSlideFromRightTransition,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: Colors.headerTitleColor,
      headerBackTitle: I18n.t('Back'),
      tabBarLabel: I18n.t('shop'),
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
  adhome: AdminHomeStack,
  // checklist: CheckListStack,
  // answeradmin: AdminAnswerStack,
  // pub: PublishStack,
  shop: SubmitShopStack,
  // bit: BitStack,
  // verify: VerifyStack,
  money: MoneyStack,
  profile: ProfileStack,
}, {
    navigationOptions: ({ navigation }) => ({
      headerTintColor: Colors.headerTitleColor,
      headerBackTitle: I18n.t('Back'),
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName == "checklist") {
          iconName = `list-ul${focused ? "" : ""}`;
        }
        if (routeName == "profile") {
          iconName = `user-circle${focused ? "" : "-o"}`;
        }
        if (routeName == "verify" || routeName == "money") {
          iconName = `money`;
        }
        if (routeName == "pub") {
          iconName = `newspaper-o${focused ? "" : ""}`;
        }
        if (routeName == "answeradmin") {
          iconName = `folder-open${focused ? "" : ""}`;
        }
        if (routeName == "bit") {
          iconName = `exchange${focused ? "" : ""}`;
        }
        if (routeName == "adhome") {
          iconName = `home${focused ? "" : ""}`;
        }
        if (routeName == "shop") {
          iconName = `shopping-cart${focused ? "" : ""}`;
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

const AnswerExpertStack = StackNavigator({ // **********************FOR ADMIN *************************
  answerExpert1: {
    screen: AnswerOfAdmin,
    navigationOptions: {
      title: I18n.t('answer')
    }
  },
  answerExpert2: {
    screen: AnswerOfExpert2,
    navigationOptions: {
      title: I18n.t('answer')
    }
  }
},
  {
    transitionConfig: getSlideFromRightTransition,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: Colors.headerTitleColor,
      headerBackTitle: I18n.t('Back'),
      tabBarLabel: I18n.t('edit'),
      headerStyle: {
        backgroundColor: Colors.tabBar,
      },
      headerTitleStyle: {
        color: 'white',
        fontFamily: 'Prompt-Regular'
      },
    })
  })

const BitExpertStack = StackNavigator({ // **********************FOR ADMIN *************************
  bitexpert: {
    screen: BidExpert,
    navigationOptions: {
      title: I18n.t('bitPrice2')
    }
  },
  bitexpert2: {
    screen: BidExpert2,
    navigationOptions: {
      title: I18n.t('bitPrice2')
    }
  }
}, {
    transitionConfig: getSlideFromRightTransition,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: Colors.headerTitleColor,
      headerBackTitle: I18n.t('Back'),
      tabBarLabel: I18n.t('bitPrice2'),
      headerStyle: {
        backgroundColor: Colors.tabBar,
      },
      headerTitleStyle: {
        color: 'white',
        fontFamily: 'Prompt-Regular'
      },
    })
  })

const ExpertStack = TabNavigator({  // *************** MAIN EXPERT & ADMIN *************************
  checklist: ExpertHomeStack, // EXPERT home stack
  // pub: PublishStack,
  // answerExpert: AnswerExpertStack,
  // bidExpert: BitExpertStack,
  profile: ProfileStack,
}, {
    navigationOptions: ({ navigation }) => ({
      headerTintColor: Colors.headerTitleColor,
      headerBackTitle: I18n.t('Back'),
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName == "checklist") {
          iconName = `home${focused ? "" : ""}`;
        }
        if (routeName == "profile") {
          iconName = `user-circle${focused ? "" : "-o"}`;
        }
        if (routeName == "pub") {
          iconName = `newspaper-o${focused ? "" : ""}`;
        }
        if (routeName == "answerExpert") {
          iconName = `folder-open${focused ? "" : ""}`;
        }
        if (routeName == "bidExpert") {
          iconName = `exchange${focused ? "" : ""}`;
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

// const prefix = Expo.Linking.makeUrl('checkphra');

// const MainApp = () => <PrimaryNav uriPrefix={prefix} />;

// const prefix = 'checkphra://';

// const MainApp = () => <PrimaryNav uriPrefix={prefix} />;

export default PrimaryNav;




