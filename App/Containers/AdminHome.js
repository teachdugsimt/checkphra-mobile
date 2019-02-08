import React, { Component } from 'react'
import {
    ScrollView, Text, View, TouchableOpacity, Dimensions,
    TextInput, FlatList, RefreshControl, ImageBackground, Image, Platform
} from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
import RoundedButton from '../Components/RoundedButton'
import { Colors, Images } from '../Themes';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import Icon2 from "react-native-vector-icons/FontAwesome";
import * as RNIap from 'react-native-iap';
//cc-mastercard, cc-visa, cc-paypal, money, credit-card-alt
import I18n from '../I18n/i18n';
import Spinner from 'react-native-loading-spinner-overlay';
import QuestionActions from '../Redux/QuestionRedux'
import styles from './Styles/HomeScreenStyle'
I18n.fallbacks = true;
// I18n.currentLocale('th');
// I18n.locale = 'th'  // true
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});
let { width, height } = Dimensions.get('window')
class AdminHome extends Component {

    constructor(props) {
        super(props)
        this.state = {
            list_user: null,
            dataProifle: null,
            language: '',
        }
    }

    static navigationOptions = ({ navigation }) => {

        return {
            title: I18n.t('home'),
        }
    }
    static getDerivedStateFromProps(newProps, prevState) {
        console.log(newProps)
        console.log(prevState)

        console.log('============  HOME PAGE =============')

        // const list_user = [{ name: I18n.t('checkAmuletScreen'), id: 1, logo: (<View><Text>5555555555555555555555888</Text></View>) },
        // { name: I18n.t('showAmuletReal'), id: 2 },
        // { name: I18n.t('chat'), id: 3 }]
        const list_user = [{ name: I18n.t('pendingList'), id: 1 },
        { name: I18n.t('editAnswer'), id: 2 },
        { name: I18n.t('chat'), id: 3 }]

        if (newProps.language != prevState.language) {
            newProps.getProfile()
        }

        let profile = newProps.profile
        if (newProps.profile && newProps.profile != null) {
            profile = newProps.profile
        }

        return {
            // listPromotion: plist
            dataProifle: profile,
            list_user,
            language: newProps.language
        }
    }

    _pressList = (item) => {
        if (item.id == 1) {
            this.props.navigation.navigate('check')
        } else if (item.id == 2) {
            this.props.navigation.navigate('answer')
        } else if (item.id == 3) {
            this.popupDialog.show()
        }
    }

    _renderItem = ({ item, index }) => {

        return (
            <TouchableOpacity style={{ height: 140, backgroundColor: 'transparent', backgroundColor: Colors.milk, borderRadius: 20, marginTop: 4, marginHorizontal: 7 }} onPress={() => this._pressList(item)}>
                <View style={{ flex: 1, borderLeftColor: '#FF530D', borderLeftWidth: 5, borderTopColor: '#FF530D', borderTopWidth: 5, marginVertical: 8, marginHorizontal: 8, borderRadius: 12 }}>

                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ height: 30, borderLeftWidth: 5, borderLeftColor: '#FF530D', borderBottomWidth: 5, borderBottomColor: '#FF530D', width: 20, marginRight: 12, borderRadius: 8 }}>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold', color: Colors.brownTextTran }}>{item.name}</Text>
                        {item.logo}
                    </View>

                    <View style={{ height: 30, borderRightWidth: 5, borderRightColor: '#FF530D', borderTopWidth: 5, borderTopColor: '#FF530D', width: 20, marginLeft: 12, borderRadius: 8 }}>
                    </View>
                </View>

                <View style={{ flex: 1, borderBottomColor: '#FF530D', borderBottomWidth: 5, borderRightColor: '#FF530D', borderRightWidth: 5, marginVertical: 8, marginHorizontal: 8, borderRadius: 12 }}>
                </View>
            </TouchableOpacity>
        )
    }

    _reload = () => {
        this.props.getProfile()
    }

    componentDidMount() {
        this.props.getProfile()
    }

    _webBoard = () => {
        this.props.navigation.navigate('web1'),
        this.popupDialog.dismiss()
    }

    _editAnswer = () => {

    }

    _userContact = () => {
        this.props.navigation.navigate('chat2')
        this.popupDialog.dismiss()
    }

    render() {
        I18n.locale = this.props.language


        return (
            <LinearGradient colors={["#FF9933", "#FFCC33"]} style={styles.container}>
                <Image source={Images.watermarkbg} style={styles.imageBackground} resizeMode='contain' />
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.request_profile == true}
                            onRefresh={this._reload}
                        />
                    }
                    ListEmptyComponent={() => <Text style={styles.textEmptyData}>{I18n.t('nonePromotion')}</Text>}
                    data={this.state.list_user ? this.state.list_user : []}
                    renderItem={this._renderItem}
                />

                <PopupDialog
                    dialogTitle={<View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 15, borderRadius: 8, borderBottomWidth: 1, backgroundColor: 'orange' }}><Text style={{
                        fontSize: 18, fontWeight: 'bold'
                    }}>{I18n.t('editType')}</Text></View>}
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    width={width / 1.05}
                    height={height / 2}
                    // height={150}
                    onDismissed={() => { this.setState({}) }}
                >
                    <View style={{ flex: 1 }}>
                        <ScrollView style={{ flex: 1 }}>
                            <View style={{}}>
                                <TouchableOpacity style={{ backgroundColor: 'lightgrey', borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginTop: 10, height: 70, marginHorizontal: 10 }} onPress={this._webBoard}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: Colors.brownTextTran }}>{I18n.t('webBoard')}</Text>
                                </TouchableOpacity>

                                {/* <TouchableOpacity style={{ backgroundColor: 'lightgrey', borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginTop: 10, height: 70, marginHorizontal: 10 }} onPress={this._editAnswer}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: Colors.brownTextTran }}>{I18n.t('chat')}</Text>
                                </TouchableOpacity> */}

                                <TouchableOpacity style={{ backgroundColor: 'lightgrey', borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginTop: 10, height: 70, marginHorizontal: 10 }} onPress={this._userContact}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: Colors.brownTextTran }}>{I18n.t('userContact')}</Text>
                                </TouchableOpacity>

                            </View>

                        </ScrollView>
                    </View>
                </PopupDialog>

            </LinearGradient>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.auth.language,
        profile: state.question.profile,
        request_profile: state.question.request_profile,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProfile: () => dispatch(QuestionActions.getProfile()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome)