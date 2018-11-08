import React, { Component } from "react";
import { ScrollView, Text, View, TouchableOpacity, Image, TextInput, Modal, Alert } from "react-native";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import QuestionActions from '../Redux/QuestionRedux'
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Ionicons";
import Icon3 from "react-native-vector-icons/Entypo";
import { Colors } from "../Themes";
import ImageViewer from 'react-native-image-zoom-viewer';
import ExpertActions from '../Redux/ExpertRedux'
import RoundedButton from "../Components/RoundedButton";
import Spinner from 'react-native-loading-spinner-overlay';
import I18n from '../I18n/i18n';
I18n.fallbacks = true;
// I18n.currentLocale();
class VerifyPoint2 extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            index: 0,
            spinner: false,
        }
    }

    static getDerivedStateFromProps(newProps, prevState) {
        if (newProps.request) {
            return {
                spinner: true
            }
        } else {
            return {
                spinner: false
            }
        }
    }

    componentDidMount() {
        this.setState({ spinner: false })
    }

    _onPressVerify = () => {
        Alert.alert(
            'Check Phra',
            I18n.t('submitTransaction'),
            [
                {
                    text: I18n.t('ok'), onPress: () => {
                        this.props.addTransfer(this.props.item.id)
                        this.props.editFullData(this.props.item.id)
                        this.props.navigation.goBack()
                        // this.props.getVerify()
                    }
                },
                { text: I18n.t('cancel') }
            ],
            { cancelable: false }
        )
    }

    render() {
        I18n.locale = this.props.language
        let tmp_chk = this.props.full_data.find(e => e.id == this.props.item.id)
        let status = this.props.item.status == 10 || tmp_chk.status == 10 ? I18n.t('successVerify') : I18n.t('waitVerify')
        let status_color = this.props.item.status == 10 || tmp_chk.status == 10 ? 'green' : 'orange'
        let product = this.props.item.price + " point"
        let time = this.props.item.date.slice(11, this.props.item.date.length - 3)

        // let bank55 = ''
        // if (this.props.item.bank == 'ธนาคารทหารไทย') {
        //     bank55 = I18n.t('tmbBanking')
        // } else if (this.props.item.bank == 'ธนาคารธนชาต') {
        //     bank55 = I18n.t('thanaBanking')
        // } else if (this.props.item.bank == 'ธนาคารไทยพาณิชย์') {
        //     bank55 = I18n.t('scbBanking')
        // } else if (this.props.item.bank == 'ธนาคารกสิกรไทย') {
        //     bank55 = I18n.t('kBanking')
        // } else if (this.props.item.bank == 'ธนาคารกรุงศรีอยุธยา') {
        //     bank55 = I18n.t('krugsriBanking')
        // } else if (this.props.item.bank == 'ธนาคารกรุงไทย') {
        //     bank55 = I18n.t('krungthaiBanking')
        // } else if (this.props.item.bank == 'ธนาคารกรุงเทพ') {
        //     bank55 = I18n.t('krungtepBanking')
        // } else {
        //     bank55 = this.props.item.bank
        // }
        let type = this.props.item.bank ? I18n.t('banking') : 'credit-card'
        // console.log(this.props.item)
        // console.log(tmp_chk)
        // console.log('*--------------------------------------*')

        let img2 = []
        img2.push({ url: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/' + this.props.item.image })
        // console.log(img2)
        return (
            <View style={{ flex: 1 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', height: 75, borderBottomColor: 'lightgrey', borderBottomWidth: 1 }}>
                    <Text style={{ color: status_color, fontSize: 20 }}>{status}</Text>
                </View>

                <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', height: 50, borderBottomColor: 'lightgrey', borderBottomWidth: 1, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, marginLeft: 10 }}>{I18n.t('priceProduct')}</Text>
                    <Text style={{ fontSize: 16, marginRight: 10 }}>{product} ฿</Text>
                </View>

                <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', height: 50, borderBottomColor: 'lightgrey', borderBottomWidth: 1, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, marginLeft: 10 }}>{I18n.t('transactionTime')}</Text>
                    <Text style={{ fontSize: 16, marginRight: 10 }}>{time}</Text>
                </View>

                <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', height: 50, borderBottomColor: 'lightgrey', borderBottomWidth: 1, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, marginLeft: 10 }}>{I18n.t('transactionType')}</Text>
                    <Text style={{ fontSize: 16, marginRight: 10 }}>{type}</Text>
                </View>
                <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', height: 50, borderBottomColor: 'lightgrey', borderBottomWidth: 1, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, marginLeft: 10 }}>{I18n.t('transactionID')}</Text>
                    <Text style={{ fontSize: 16, marginRight: 10 }}>{this.props.item.id}</Text>
                </View>

                <View style={{ flex: 0.65 }}>
                    <ImageViewer
                        saveToLocalByLongPress={false}
                        imageUrls={img2}
                        backgroundColor={'lightgrey'}
                        onClick={(e) => {
                            console.log('Show modal')
                            this.setState({ modalVisible: true })
                        }}
                        index={this.state.index}
                    />
                    <Modal
                        visible={this.state.modalVisible}
                        transparent={true}
                        onRequestClose={() => this.setState({ modalVisible: false })}>
                        <ImageViewer
                            saveToLocalByLongPress={false}
                            imageUrls={img2}
                            backgroundColor={'lightgrey'}
                            index={this.state.index}
                            onSwipeDown={() => {
                                console.log('onSwipeDown');
                                this.setState({ modalVisible: false })
                            }}
                            enableSwipeDown={true}
                        />
                    </Modal>
                </View>

                {status == I18n.t('waitVerify') && this.props.item.status == 0 && tmp_chk.status == 0 && <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <View style={{ width: 170 }}>
                        <RoundedButton
                            style={{ marginHorizontal: 10 }}
                            title={I18n.t('verify')}
                            onPress={this._onPressVerify}
                            fetching={this.props.request}
                        />
                    </View>
                </View>}

                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={{ color: '#fff' }}
                />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        item: state.expert.data_point,
        request: state.expert.fetch3,
        full_data: state.expert.full_data,
        language: state.auth.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addTransfer: (id) => dispatch(ExpertActions.acceptRequest(id)),
        // getVerify: () => dispatch(ExpertActions.getProfileRequest()),
        editFullData: (id) => dispatch(ExpertActions.editFullData(id)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VerifyPoint2)