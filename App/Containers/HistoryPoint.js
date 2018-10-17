import React, { Component } from "react";
import { ScrollView, Text, View, TouchableOpacity, FlatList, RefreshControl } from "react-native";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import QuestionActions from '../Redux/QuestionRedux'
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Ionicons";
import { Colors } from "../Themes";

class HistoryPoint extends Component {

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};

        return {
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row' }}>
                <Text
                    style={{
                        marginLeft: 20,
                        fontSize: 18,
                        fontFamily: "Prompt-SemiBold",
                        color: Colors.brownText
                    }}
                >
                    {"< กลับ "}
                </Text>
                <Text style={{ marginLeft: 20, fontSize: 18, fontFamily: "Prompt-SemiBold", color: Colors.brownText }}>ประวัติการเติมเงิน</Text>
            </TouchableOpacity>
            )
        };
    };

    _renderItem = ({ item, index }) => {
        return (
            <View style={{ flexDirection: 'row', backgroundColor: 'white', borderBottomColor: 'lightgrey', borderBottomWidth: 1, height: 65 }}>
                <View style={{ justifyContent: 'center' }}>
                    <Icon2
                        name="ios-ribbon"
                        size={26}
                        color={Colors.brownText}
                        style={{ marginLeft: 15 }} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 15, width: '85%' }}>

                    <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: 16 }}>{item.name}</Text>
                        <Text style={{ fontSize: 16 }}>{item.day}</Text>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 16 , color: 'orange', fontWeight: 'bold'}}>{item.value} ฿</Text>
                    </View>

                </View>

            </View>
        )
    }

    render() {
        let data = [{ name: 'เติม point ', value: 100, day: '11-11-2018', key: 0 },
        { name: 'เติม point ', value: 1500, day: '11-11-2018', key: 1 },
        { name: 'เติม point ', value: 700000, day: '11-11-2018', key: 2 },
        { name: 'เติม point ', value: 350, day: '11-11-2018', key: 3 },]
        return (
            <View>
                <FlatList
                    data={data}
                    renderItem={this._renderItem}
                />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        //   profile: state.question.profile,
        profile: state.question.profile,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        //   getProfile: () => dispatch(QuestionActions.getProfile())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HistoryPoint)