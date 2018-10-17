import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, Dimensions, TextInput, FlatList, RefreshControl } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
import RoundedButton from '../Components/RoundedButton'
import { Colors } from '../Themes';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';
import PromotionActions from '../Redux/PromotionRedux'

const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});

class Promotion extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listPromotion: null,
        }
    }

    static getDerivedStateFromProps(newProps, prevState) {
        let plist = newProps.promotion
        console.log(newProps)
        // newProps.promotion.forEach(e=>{
        //     plist.push({
        //         name: e.detail,
        //         point: e.point,
        //         price: e.price,
        //         startDate: e.start_date? e.start_date: 'ไม่จำกัดเวลา',
        //         endDate: e.end_date? e.end_date: 'ไม่จำกัดเวลา',
        //     })
        // })
        // console.log(plist)
        return {
            listPromotion: plist
        }
    }

    _PressPromotion(item) {
        this.popupDialog.show()
    }

    _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={{ height: 110 }} onPress={() => this._PressPromotion(item)}>
                <View style={{ height: 110, backgroundColor: 'white', marginTop: 1 }}>
                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.detail}</Text>

                        <View>
                            <Text style={{ fontWeight: 'bold', color: 'red', fontSize: 24, marginTop: 15 }}>{item.point} แต้ม</Text>
                            <Text style={{ fontWeight: 'bold', color: 'brown', textAlign: 'right' }}>{item.price} ฿</Text>
                        </View>
                    </View>
                    <View style={{ flex: 3, padding: 20 }}>
                        <Text style={{ fontWeight: 'bold', color: 'brown' }}>โอนผ่านบัญชีธนาคาร</Text>
                        <Text style={{ fontWeight: 'bold', color: 'brown' }}>Promptpay</Text>
                        <Text style={{ fontWeight: 'bold', color: 'brown' }}>Credit Card</Text>
                        {/* <Text style={{ fontWeight: 'bold', color: 'brown' }}>{item.price} ฿</Text> */}
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    _reload = () => {
        this.props.getPromotion()
    }

    componentDidMount() {
        this.props.getPromotion()
    }
    render() {
        // console.log('HERE PROMOTION')
        // console.log(this.props.promotion)
        return (
            <LinearGradient colors={["#FF9933", "#FFCC33"]} style={{ flex: 1 }}>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.fetching == true}
                            onRefresh={this._reload}
                        />
                    }
                    ListEmptyComponent={() => <Text style={{ marginTop: 50, alignSelf: 'center', fontSize: 20, color: '#aaa' }}>ยังไม่มี Promotion</Text>}
                    data={this.state.listPromotion}
                    renderItem={this._renderItem}
                />
                <PopupDialog
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                    dialogAnimation={slideAnimation}
                >
                    <View>
                        <Text>Hello World</Text>
                    </View>
                </PopupDialog>
            </LinearGradient>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        promotion: state.promotion.data,
        fetching: state.promotion.fetching,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPromotion: () => dispatch(PromotionActions.promotionRequest()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Promotion)