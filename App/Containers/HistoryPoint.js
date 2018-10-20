import React, { Component } from "react";
import { ScrollView, Text, View, TouchableOpacity, FlatList, RefreshControl } from "react-native";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import QuestionActions from '../Redux/QuestionRedux'
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Ionicons";
import { Colors } from "../Themes";
import PaymentActions from '../Redux/PaymentRedux'
class HistoryPoint extends Component {

    static navigationOptions = ({ navigation }) => {
        // const params = navigation.state.params || {};

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

    constructor(props) {
        super(props)
        this.state = {
            history_data: []
        }
    }

    componentDidMount() {
        this.props.getHistory(1)
    }

    static getDerivedStateFromProps(newProps, prevState) {
        let list = newProps.data_history
        console.log(newProps)
        return {
            history_data: list
        }
    }

    _nextPage = (data) => {
        this.props.setDetailPoint(data)
        this.props.navigation.navigate("detailPoint")
    }

    onRefresh = () => {
        this.props.getHistory(1)
    }

    _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => this._nextPage(item)}>
                <View key={index} style={{ flexDirection: 'row', backgroundColor: 'white', borderBottomColor: 'lightgrey', borderBottomWidth: 1, height: 65 }}>
                    <View style={{ justifyContent: 'center' }}>
                        <Icon2
                            name="ios-ribbon"
                            size={26}
                            color={Colors.brownText}
                            style={{ marginLeft: 15 }} />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 15, width: '85%' }}>

                        <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Text style={{ fontSize: 16 }}>เติม point</Text>
                            <Text style={{ fontSize: 16 }}>{item.date.slice(0, 10)}</Text>
                        </View>

                        <View style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Text style={{ fontSize: 16, color: 'orange', fontWeight: 'bold' }}>{item.price} ฿</Text>
                        </View>

                    </View>

                </View>
            </TouchableOpacity>
        )
    }

    render() {
        console.log(this.state.history_data)
        let data = [{ name: 'เติม point ', value: 100, day: '11-11-2018', key: 0 },
        { name: 'เติม point ', value: 1500, day: '11-11-2018', key: 1 },
        { name: 'เติม point ', value: 700000, day: '11-11-2018', key: 2 },
        { name: 'เติม point ', value: 350, day: '11-11-2018', key: 3 },]
        return (
            <View>
                <FlatList
                    data={this.state.history_data}
                    renderItem={this._renderItem}
                    refreshControl={
                        <RefreshControl
                          refreshing={this.props.request == true}
                          onRefresh={this.onRefresh.bind(this)}
                        />
                      }
                />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        data_history: state.payment.data_history,
        profile: state.question.profile,
        request: state.payment.request
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getHistory: (page) => dispatch(PaymentActions.historyAddpointRequest(page)),
        setDetailPoint: (data) => dispatch(PaymentActions.setDetailPoint(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HistoryPoint)