import ProfileScreen from "../Containers/ProfileScreen";
import UploadScreen from "../Containers/UploadScreen";
import RegisterScreen from "../Containers/RegisterScreen";
import SigninScreen from "../Containers/SigninScreen";
import LaunchScreen from "../Containers/LaunchScreen";
import HistoryScreen from "../Containers/HistoryScreen";
import DetailTypeScreen from "../Containers/DetailTypeScreen"
import ChangePasswordScreen from "../Containers/ChangePasswordScreen"

import styles from "./Styles/NavigationStyles";
import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { Colors } from "../Themes";
import Icon from "react-native-vector-icons/Entypo";
import Icon2 from "react-native-vector-icons/FontAwesome";
import { TabNavigator, TabBarBottom, StackNavigator, SwitchNavigator } from "react-navigation";

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
    reg: { screen: RegisterScreen }
  },
  {
    headerMode: "float",
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.navigate("Auth")}>
          <Text
            style={{
              marginLeft: 20,
              fontSize: 18,
              fontFamily: "Prompt-SemiBold",
              color: Colors.brownText
            }}
          >
            {"< กลับ"}
          </Text>
        </TouchableOpacity>
      ),
      headerRight: (
        <Text
          style={{
            fontFamily: "Prompt-Regular",
            fontSize: 25,
            color: Colors.brownText,
            marginRight: 30
          }}
        >
          Check Phra
        </Text>
      )
    })
  }
);

const UploadStack = StackNavigator(
  {
    uploadScreen: { screen: UploadScreen },
    detail: { screen: DetailTypeScreen }
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <Text
          style={{
            fontSize: 25,
            fontFamily: "Prompt-Regular",
            color: Colors.brownText,
            marginLeft: 30
          }}
        >
          Check Phra
        </Text>
      ),
      headerRight: (
        <Icon
          name="log-out"
          size={20}
          color={Colors.brownText}
          style={{ marginRight: 15 }}
          onPress={() => navigation.navigate("Auth")}
        />
      ),
      tabBarLabel: "ตรวจสอบพระ"
    })
  }
)

const ProfileStack = StackNavigator(
  {
    profileScreen: { screen: ProfileScreen },
    change:{screen : ChangePasswordScreen}
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <Text
          style={{
            fontSize: 25,
            fontFamily: "Prompt-Regular",
            color: Colors.brownText,
            marginLeft: 30
          }}
        >
          Check Phra
        </Text>
      ),
      headerRight: (
        <Icon
          name="log-out"
          size={20}
          color={Colors.brownText}
          style={{ marginRight: 15 }}
          onPress={() => navigation.navigate("Auth")}
        />
      ),
      tabBarLabel: 'ข้อมูลส่วนตัว'
    })
  }
);



const HistoryStack = StackNavigator(
  {
    his: { screen: HistoryScreen }
   
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <Text
          style={{
            fontSize: 25,
            fontFamily: "Prompt-Regular",
            color: Colors.brownText,
            marginLeft: 30
          }}
        >
          Check Phra
        </Text>
      ),
      headerRight: (
        <Icon
          name="log-out"
          size={20}
          color={Colors.brownText}
          style={{ marginRight: 15 }}
          onPress={() => navigation.navigate("Auth")}
        />
      ),
      tabBarLabel: 'ประวัติการส่งตรวจพระ'
    })
  }
);


const DashStack = TabNavigator(
  {
   
    upload : UploadStack,
    his : HistoryStack,
    profile : ProfileStack
    
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
        return <Icon2 name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: Colors.brownText,
      inactiveTintColor: "gray",
      style: {
        height: 60
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




// Manifest of possible screens
const PrimaryNav = SwitchNavigator(
  {
    Auth: AuthStack,
    Reg: RegStack,
    App: DashStack
  },
  {
    // Default config for all screens
    headerMode: "none",
    initialRouteName: "Auth",
    navigationOptions: {
      headerStyle: styles.header
    }
  }
);

export default PrimaryNav;
