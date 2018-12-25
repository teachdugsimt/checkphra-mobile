import React, { Component } from "react";
import { ScrollView, Text, View, TouchableOpacity, FlatList, RefreshControl, Image } from "react-native";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import QuestionActions from '../Redux/QuestionRedux'
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Ionicons";
import { Colors, Images } from "../Themes";
import PaymentActions from '../Redux/PaymentRedux'
import QuestionActions from '../Redux/QuestionRedux'
import I18n from '../I18n/i18n';
I18n.fallbacks = true;
// I18n.currentLocale();

let check = true
let count = 1
class HistoryPoint extends Component {
    static navigationOptions = ({ navigation }) => {
        // console.log(navigation)
        // console.log(I18n.locale)

        return {
            title: I18n.t('purchaseHistory'),
        }
    }
    // static navigationOptions = ({ navigation }) => {
    //     // const params = navigation.state.params || {};

    //     return {
    //         headerLeft: (
    //             <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row' }}>
    //                 <Text
    //                     style={{
    //                         marginLeft: 20,
    //                         fontSize: 18,
    //                         fontFamily: "Prompt-SemiBold",
    //                         color: Colors.brownText
    //                     }}
    //                 >
    //                     {"< กลับ "}
    //                 </Text>
    //                 <Text style={{ marginLeft: 20, fontSize: 18, fontFamily: "Prompt-SemiBold", color: Colors.brownText }}>ประวัติการเติมเงิน</Text>
    //             </TouchableOpacity>
    //         )
    //     };
    // };

    constructor(props) {
        super(props)
        this.state = {
            history_data: null,
            fetch: null,
        }
    }

    componentWillUnmount() {
        count = 1
        this.props.getProfile()
        this.props.navigation.goBack()
    }

    componentDidMount() {
        count = 1
        this.props.getHistory(1)
        this.props.getProfile()
    }

    static getDerivedStateFromProps(newProps, prevState) {
        let plist = newProps.data_history
        console.log(newProps)
        console.log(prevState)

        // **************  newProps.data_slip.id != data_history.id  ***********//
        // if (newProps.data_slip != null) {
        //     let tmp = newProps.data_history.find(e => e.id == newProps.data_slip.id)
        //     console.log(tmp)
        //     console.log('HERE TMP POINT HISTORY')
        //     if (tmp && tmp != undefined && tmp.id == newProps.data_slip.id) {
        //         newProps.getHistory()
        //         return {
        //             history_data: newProps.data_history
        //         }
        //     }
        // }
        // *********************************************************************//

        if (newProps.request2 == false && newProps.data_slip != null) {
            newProps.getHistory(1)
            newProps.getProfile()
            return {
                history_data: newProps.data_history
            }
        }

        if (newProps.request3 == false) {
            newProps.getHistory(1)
            newProps.getProfile()
            return {
                history_data: newProps.data_history
            }
        }

        return {
            history_data: plist,
        }
    }

    _nextPage = (data) => {
        this.props.setDetailPoint(data)
        this.props.navigation.navigate("detailPoint")
    }

    onRefresh = () => {
        count = 1
        this.props.getHistory(count)
    }

    _onScrollEndList = () => {
        // if(this.state.history_data.length > 10){
        //     console.log('END OF LIST AGAIN')
        //     count++
        //     this.props.getHistory(count)
        // } else if(this.state.history_data.length < 11) {
        //     count = 1
        // }
        if (this.props.data_history && this.props.data_history.length >= 10 && (this.props.request == false || this.props.request == null)) {
            console.log('END OF LIST AGAIN')
            count++
            this.props.getHistory(count)
        }
    }

    _renderItem = ({ item, index }) => {
        // type=1 banking
        // type=2 promptpay
        // type=3 credit-card
        console.log(item)
        let color = item.status == 0 ? 'orange' : 'green'
        if (item.status == 0) {
            color = 'orange'
        } else if (item.status == 10) {
            color = 'green'
        } else if (item.status == 99) {
            color = 'red'
        }
        return (
            <TouchableOpacity onPress={() => this._nextPage(item)}>
                <View key={index} style={{ flexDirection: 'row', backgroundColor: 'white', borderBottomColor: 'lightgrey', borderBottomWidth: 1, height: 65 }}>
                    <View style={{ justifyContent: 'center' }}>
                        {/* <Icon2
                            name="ios-ribbon"
                            size={26}
                            color={Colors.brownText}
                            style={{ marginLeft: 15 }} /> */}
                        <Image source={item.type == '3' ? Images.card3 : Images.coin0} style={{ width: 27, height: 27, marginLeft: 10 }} />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 15, width: '85%' }}>

                        <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Text style={{ fontSize: 16 }}>{I18n.t('addCoin')}</Text>
                            <Text style={{ fontSize: 16 }}>{item.date.slice(0, 10)}</Text>
                        </View>

                        <View style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Text style={{ fontSize: 16, color: color, fontWeight: 'bold' }}>{item.price} ฿</Text>
                        </View>

                    </View>

                </View>
            </TouchableOpacity>
        )
    }

    render() {
        I18n.locale = this.props.language
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
                    onEndReached={this._onScrollEndList}
                    // onEndReachedThreshold={0.025}
                    onEndReachedThreshold={1.2}
                    ListEmptyComponent={() => <Text style={{ marginTop: 50, alignSelf: 'center', fontSize: 20, color: '#aaa' }}>{I18n.t('nonePending')}</Text>}
                />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        data_history: state.payment.data_history,  // main data
        profile: state.question.profile,
        request: state.payment.request,  // main request
        request2: state.payment.request2,
        data_slip: state.payment.data_slip,
        request3: state.payment.request3,
        language: state.auth.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getHistory: (page) => dispatch(PaymentActions.historyAddpointRequest(page)),
        setDetailPoint: (data) => dispatch(PaymentActions.setDetailPoint(data)),
        getProfile: () => dispatch(QuestionActions.getProfile()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HistoryPoint)