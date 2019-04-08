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
import ShowRoomActions from '../Redux/ShowRoomRedux'
import styles from './Styles/HomeScreenStyle'
import GridView from "react-native-super-grid";
I18n.fallbacks = true;
// I18n.currentLocale('th');
// I18n.locale = 'th'  // true
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});
let { width, height } = Dimensions.get('window')
let checkType = true
let checkType2 = true
class ShowAmuletRoom extends Component {

    constructor(props) {
        super(props)
        this.state = {
            item: null,
            amuletType: null,
            tmp: null,
            language: '',
        }
    }

    static navigationOptions = ({ navigation }) => {

        return {
            title: I18n.t('showAmuletReal'),
        }
    }

    static rename = (amuletTypes) => {
        let item = []

        if (!amuletTypes) { return item }

        amuletTypes.map(e => {
            let name = ''
            if (e.name == 'เบญจภาคี' && e.id == 1) {
                name = I18n.t('benjapakee')
            }
            else if (e.name == 'พระสมเด็จ' && e.id == 2) {
                name = I18n.t('phraSomdej')
            }
            else if (e.name == 'นางพญา' && e.id == 3) {
                name = I18n.t('phraNangPaya')
            }
            else if (e.name == 'พระคง' && e.id == 4) {
                name = I18n.t('phraKhong')
            }
            else if (e.name == 'พระรอด' && e.id == 5) {
                name = I18n.t('phraRod')
            }
            else if (e.name == 'พระผงสุพรรณ' && e.id == 6) {
                name = I18n.t('phraPhongSuphan')
            }
            else if (e.name == 'พระซุ้มกอ' && e.id == 7) {
                name = I18n.t('phraSoomkor')
            }
            else if (e.name == 'พระกำแพงเม็ดขนุน' && e.id == 8) {
                name = I18n.t('phraKampaengMedKanun')
            }
            else if (e.name == 'หลวงปู่ทวด' && e.id == 9) {
                name = I18n.t('luangPuTuad')
            }
            else if (e.name == 'หลวงปู่หมุน' && e.id == 10) {
                name = I18n.t('luangPuMoon')
            }
            else if (e.name == 'พระกรุ' && e.id == 11) {
                name = I18n.t('phraKru')
            }
            else if (e.name == 'เหรียญปั้ม' && e.id == 12) {
                name = I18n.t('pumpCoin')
            }
            else if (e.name == 'เหรียญหล่อ' && e.id == 13) {
                name = I18n.t('castingCoin')
            }
            else if (e.name == 'พระผง' && e.id == 14) {
                name = I18n.t('phraPhong')
            }
            else if (e.name == 'พระกริ่ง' && e.id == 15) {
                name = I18n.t('phraKring')
            }
            else if (e.name == 'พระปิดตา' && e.id == 16) {
                name = I18n.t('phraPidta')
            }
            else if (e.name == 'เครื่องราง' && e.id == 17) {
                name = I18n.t('amulet')
            }
            else if (e.name == 'พระบูชา' && e.id == 18) {
                name = I18n.t('phraBucha')
            }
            else if (e.name == 'พระวัดประสาทบุญญาวาส') {
                name = I18n.t('phraWadPhrasatBunyawat')
            }
            else if (e.name == 'พระวัดระฆัง') {
                name = I18n.t('phraWadRakung')
            }
            else if (e.name == '100 ปี พ.ศ.2515') {
                name = I18n.t('year100era2515')
            }
            else if (e.name == '108 ปี พ.ศ.2523') {
                name = I18n.t('year108era2523')
            }
            else if (e.name == '118 ปี พ.ศ.2533') {
                name = I18n.t('year118era2533')
            }
            else if (e.name == '122 ปี พ.ศ.2537') {
                name = I18n.t('year122era2537')
            }
            else if (e.name == 'เสาร์ 5 พ.ศ.2536') {
                name = I18n.t('sat5era2536')
            }
            else if (e.name == 'เสาร์ 5 พ.ศ.2539') {
                name = I18n.t('sat5era2539')
            }
            else if (e.name == '214 ปีชาตกาล พ.ศ.2545') {
                name = I18n.t('year214era2545')
            }
            else if (e.name == 'หลวงพ่อหลิว') {
                name = I18n.t('LuangPhorLhew')
            }
            else if (e.name == 'หลวงพ่อกวย') {
                name = I18n.t('LuangPhorKauy')
            }
            else if (e.name == 'บางขุนพรหม') {
                name = I18n.t('BangKhunProm')
            }
            else if (e.name == 'บางขุนพรหม ปี พ.ศ.2509') {
                name = I18n.t('BangKhunProm2509')
            }
            else if (e.name == 'บางขุนพรหม ปี พ.ศ.2517') {
                name = I18n.t('BangKhunProm2517')
            }
            else if (e.name == 'อื่นๆ หรือ ไม่ทราบ') {
                name = I18n.t('otherOrUnknown')
            }
            item.push({
                "id": e.id,
                "name": name,
                "parent_id": null,
                "image": null
            })
        })

        return item
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        console.log(nextProps)
        console.log(prevState)

        console.log('============  AMULET SHOW ROOM =============')

        let item = prevState.item

        let tmp = prevState.tmp
        if (nextProps.language != prevState.language && prevState.tmp) {
            tmp = ShowAmuletRoom.rename(prevState.tmp)
        } else if (prevState.language == nextProps.language && prevState.tmp) {
            tmp = ShowAmuletRoom.rename(prevState.tmp)
        }

        if (nextProps.language != prevState.language && prevState.amuletType) {
            // checkType2 = false
            nextProps.navigation.setParams({ title: I18n.t('selectAmuletType') })
            amuletTypes = prevState.amuletType.filter(e => !e.parent_id)
            item = ShowAmuletRoom.rename(amuletTypes)
        }

        if (nextProps.data_amulet != null && nextProps.data_aumlet != prevState.amuletType) {
            // checkType = false
            amuletTypes = nextProps.data_amulet.filter(e => !e.parent_id)
            item = ShowAmuletRoom.rename(amuletTypes)
        }

        return {
            item: item,
            amuletType: nextProps.data_amulet,
            language: nextProps.language,
            tmp: tmp,
        }
    }


    componentWillUnmount() {

    }

    _pressList = (item) => {
        if (item.id == 1) {
            this.props.navigation.navigate('uploadScreen')
        } else if (item.id == 2) {

        } else if (item.id == 3) {

        }
    }

    componentDidMount() {
        checkType = true
        checkType2 = true
        this.props.getAmuletType()
    }

    getTypePhra = (item) => {

        if (item.name == "เบญจภาคี" || item.name == "Benja pakee") {
            let tmp = this.state.amuletType.filter(e => (e.parent_id && e.parent_id == item.id))
            tmp = ShowAmuletRoom.rename(tmp)
            this.setState({ tmp })
            this.popupDialog.show()
        }
        else if (item.name == "พระวัดระฆัง" || item.name == "PhraWad Rakung") {
            let tmp = this.state.amuletType.filter(e => (e.parent_id && e.parent_id == item.id))
            tmp = ShowAmuletRoom.rename(tmp)
            this.setState({ tmp })
            this.popupDialog.show()
        }
        else if (item.name == "บางขุนพรหม" || item.name == "Bang Khun Prom") {
            let tmp = this.state.amuletType.filter(e => (e.parent_id && e.parent_id == item.id))
            tmp = ShowAmuletRoom.rename(tmp)
            this.setState({ tmp })
            this.popupDialog.show()
        }
        else {
            this.props.setAmuletType(item)
            this.props.navigation.navigate("theyAmulet")
            this.popupDialog.dismiss()
        }
    }

    _goMyAmulet = () => {
        this.props.navigation.navigate("myAmulet")
        this.popupDialog.dismiss()
    }

    _pressEdit2 = (item) => {
        this.props.setAmuletType(item)
        this.props.navigation.navigate("theyAmulet")
        this.popupDialog.dismiss()
    }

    render() {
        // I18n.locale = this.props.language


        return (
            <LinearGradient colors={["#FF9933", "#FFCC33"]} style={styles.container}>
                <Image source={Images.watermarkbg} style={styles.imageBackground} resizeMode='contain' />

                <PopupDialog
                    dialogTitle={<View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 15, borderRadius: 8, borderBottomWidth: 1, backgroundColor: 'orange' }}><Text style={{
                        fontSize: 18, fontWeight: 'bold'
                    }}>{I18n.t('editType')}</Text></View>}
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    width={width / 1.05}
                    height={height / 2}
                    // height={150}
                    onDismissed={() => { this.setState({ tmp: null }) }}
                >
                    <View style={{ flex: 1 }}>
                        <ScrollView style={{ flex: 1 }}>
                            <View style={{ height: 10 }}>
                            </View>

                            <GridView
                                itemDimension={150}
                                items={this.state.tmp ? this.state.tmp : []}
                                renderItem={item => {
                                    return (
                                        <TouchableOpacity style={{ backgroundColor: 'lightgrey', borderRadius: 15, alignItems: 'center', justifyContent: 'center', padding: 5, height: 70 }} onPress={() => this._pressEdit2(item)}>
                                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: Colors.brownTextTran }}>{item.name}</Text>
                                        </TouchableOpacity>
                                    );
                                }}
                            />
                            <View style={{ height: 15 }}>
                            </View>
                        </ScrollView>
                    </View>
                </PopupDialog>

                <TouchableOpacity style={{ marginTop: 15, marginBottom: 5, backgroundColor: '#FFEFD5', alignItems: 'center', borderRadius: 15, width: width / 2.5, alignSelf: 'center' }}
                    onPress={this._goMyAmulet}>
                    <Text style={{ color: Colors.brownTextTran, fontSize: 16, fontWeight: 'bold', marginVertical: 7, marginHorizontal: 7 }}>{I18n.t('myAmulet')}</Text>
                </TouchableOpacity>

                <GridView
                    itemDimension={100}
                    items={this.state.item ? this.state.item : []}
                    renderItem={item => {
                        return (
                            <TouchableOpacity onPress={() => this.getTypePhra(item)}>
                                <View
                                    style={{
                                        height: 85,
                                        width: '100%',
                                        backgroundColor: '#FBD190',
                                        justifyContent: "center",
                                        borderRadius: 8,
                                        padding: 10
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: Colors.brownText,
                                            fontFamily: "Prompt-Regular",
                                            fontSize: 16,
                                            alignSelf: "center",
                                            textAlign: 'center'
                                        }}
                                    >
                                        {item.name}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
                <Spinner
                    visible={this.props.request_type == true}
                    textContent={'Loading...'}
                    textStyle={{ color: '#fff' }}
                />

            </LinearGradient>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.auth.language,
        // profile: state.question.profile,
        // request_profile: state.question.request_profile,
        data_amulet: state.question.amuletType,   // data request type amulet
        request_type: state.question.request_type,  // request type
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAmuletType: () => dispatch(QuestionActions.getAmuletType()),
        setRequestType: () => dispatch(QuestionActions.setRequestType()),
        setAmuletType: (data) => dispatch(ShowRoomActions.setAmuletType(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowAmuletRoom)
