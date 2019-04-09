import React, { Component } from 'react'
import {
    ScrollView, Text, View, TouchableOpacity, Dimensions,
    TextInput, FlatList, RefreshControl, ImageBackground, Image, Platform, Modal
} from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
import ImageViewer from 'react-native-image-zoom-viewer';
import RoundedButton from '../Components/RoundedButton'
import { Colors, Images } from '../Themes';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import Icon2 from "react-native-vector-icons/FontAwesome";
import moment from 'moment'
import 'moment/locale/th'
import I18n from '../I18n/i18n';
import Spinner from 'react-native-loading-spinner-overlay';
import QuestionActions from '../Redux/QuestionRedux'
import WebboardActions from '../Redux/WebboardRedux'
import styles from './Styles/WebboardStyle'
import ImageList2 from './ImageList/ImageList2'
I18n.fallbacks = true;
// I18n.currentLocale('th');
// I18n.locale = 'th'  // true
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});
let { width, height } = Dimensions.get('window')
let count = 1

let is_new = true
let is_new1 = true

class Webboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            one: 1,
            topic: null,
            content: null,

            color1: 'green',
            color2: 'lightgrey',

            tmp_meBoard: null,
            tmp_allBoard: null,

            tmp_addpost: null,

            // suck_allboard: null,
            // suck_myboard: null,
        }
    }

    static getDerivedStateFromProps(newProps, prevState) {
        console.log(newProps)
        console.log(prevState)
        console.log('++++++++++++ WEBBOARD 1 ++++++++++++')

        if (newProps.data_addpost && newProps.data_addpost != null) {
            if (prevState.tmp_addpost != newProps.data_addpost) {
                // newProps.addNewPost(newProps.data_addpost)
                newProps.addMyNewPost(newProps.data_addpost)
                return {
                    tmp_addpost: newProps.data_addpost
                }
            }
        }

        //****************************** DATA MY BOARD *****************************//
        if (newProps.data_meBoard && newProps.data_meBoard != null) {
            if (prevState.tmp_meBoard != newProps.data_meBoard && (!newProps.tmp_my || newProps.tmp_my == null)) {
                let data = []
                newProps.data_meBoard.map((e, i) => {
                    data.push({
                        id: e.id,
                        updated_at: e.updated_at,
                        status: false,
                    })
                })
                newProps.setMyBoard(data)
                return {
                    tmp_meBoard: newProps.data_meBoard
                }
            }
            else if (prevState.tmp_meBoard != newProps.data_meBoard && newProps.tmp_my && newProps.tmp_my != null) {
                return {
                    tmp_meBoard: newProps.data_meBoard
                }
            }

            if (newProps.tmp_my && newProps.tmp_my != null) {
                if (newProps.tmp_my.length == newProps.data_meBoard.length && is_new1 == true) {  // กรณี คอมเม้น
                    is_new1 = false
                    newProps.data_meBoard.map((e, i) => {
                        newProps.tmp_my.map((b, index) => {
                            if (e.id == b.id && e.updated_at != b.updated_at) {
                                newProps.updateMyBoard(e.id, e.updated_at, true)  // new redux
                            }
                        })
                    })
                } else if (newProps.tmp_my.length != newProps.data_meBoard.length) { // กรณีสร้างโพสใหม่
                    // เพิ่ม ข้อมูลโพสใหม่อีกช่องใส่ tmp_my แล้ว => รอเช็คจาก IF อันบน

                    // ** ส่วน my post เรียบร้อยแล้ว เหลือ 1. สร้างวิวจุดแดงมาโชว์ 2.เมื่อเข้าไปหน้าคอมเม้น ให้เซ็ต status จุดแดง=false **
                } else if (!newProps.data_meBoard || newProps.data_meBoard.length == 0) {
                    // กรณีไม่มีโพสของฉัน
                }
            }
        }
        //****************************** DATA MY BOARD *********************************//


        //****************************** DATA ALL BOARD ********************************//
        if (newProps.data_allBoard && newProps.data_allBoard != null) {
            if (prevState.tmp_allBoard != newProps.data_allBoard && (!newProps.tmp_all || newProps.tmp_all == null)) {
                let data = []
                newProps.data_allBoard.map((e, i) => {
                    if (newProps.profile.user_id == e.user_id) {  // เก็บโพส เฉพาะโพสของเรา ใน data_allpost
                        data.push({
                            id: e.id,
                            updated_at: e.updated_at,
                            status: false,
                        })
                    }
                })
                newProps.setAllBoard(data)
                return {
                    tmp_allBoard: newProps.data_allBoard
                }
            }
            else if (prevState.tmp_allBoard != newProps.data_allBoard && newProps.tmp_all && newProps.tmp_all != null) {
                return {
                    tmp_allBoard: newProps.data_allBoard
                }
            }

            // ส่วน all post เราจะต้องมี tmp_my เพื่อเอามาอ้างอิง โพสของเรา ในกระทู้ทั้งหมด
            // filter id ใน all post == tmp_my
            if (newProps.tmp_all && newProps.tmp_all != null && newProps.profile) {
                let tmp = newProps.data_allBoard.filter(e => e.user_id == newProps.profile.user_id)
                // ใน data_allBoard เราเอาแค่ กระทู้ของเรา มาเช็ค UPDATE_AT กับ tmp_all 
                if (tmp && tmp != null && newProps.tmp_all.length == tmp.length && is_new == true) {  // กรณี คอมเม้น
                    // console.log('FAILURE 00')
                    is_new = false
                    if (tmp && tmp != null) {
                        tmp.map((e, i) => {
                            // console.log('FAILURE 1')
                            newProps.tmp_all.map((b, index) => {
                                // console.log('FAILURE 2')
                                if (e.id == b.id && e.updated_at != b.updated_at) {  // e ใหม่ , b เก่า
                                    newProps.updateAllBoard(e.id, e.updated_at, true)
                                }
                            })
                        })
                    }

                } else if (newProps.tmp_all.length != tmp.length) { // กรณีสร้างโพสใหม่
                    // ** ให้เพิ่ม โพสของเราอันใหม่ใน tmp_all แล้ว
                    // ** เหลือ 1. สร้างวิวจุดแดง 2. เข้าไปดูเนื้อหา แล้วเปลี่ยน status จุดแดง = false **
                } else if (!tmp) {
                    // กรณีมีแต่โพสคนอื่น
                }

            }
        }
        //****************************** DATA ALL BOARD ********************************//


        return {

        }
    }

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};

        return {
            headerRight: (
                <TouchableOpacity onPress={params.newItem}>
                    <Icon2 name={'plus-circle'} color={'white'} size={40} style={{ paddingRight: 10 }} />
                </TouchableOpacity>
            ),
        };
    };

    componentWillMount() {
        // this.props.navigation.setParams({ newItem: this._newItem });
    }

    _newItem = () => {
        this.popupDialog.show()
    }

    componentDidMount() {
        this.props.navigation.setParams({ newItem: this._newItem });
        count = 1
        this.props.getProfile()
        this.props.getListAll(count)
    }

    componentWillUnmount() {
        this.props.clearListMyAll()
        count = 1
        is_new = true
        is_new1 = true
    }

    _reload = () => {
        count = 1
        this.props.getListAll(count)
    }

    _onScrollEndList = () => {
        if (this.props.data_allBoard && this.props.data_allBoard.length >= 10 && (this.props.request == false || this.props.request == null)) {
            count++
            this.props.getListAll(count)
        }
    }

    _goToBoard = (item) => {
        this.props.setWebboard(item)
        if (this.props.profile.role == 'admin') {
            console.log('You are admin')
            this.props.navigation.navigate('web2')
        } else {
            this.props.navigation.navigate("webboard2")
        }
    }

    // _newPost = () => {
    //     this.popupDialog.show()
    // }

    _post = () => {
        if (this.state.topic && this.state.content) {
            this.props.addPost(this.state.topic, this.state.content)
            this.popupDialog.dismiss()
        }
        else
            alert('checkData')
    }

    _pressG1 = () => {
        if (this.state.color1 != 'green') {
            this.setState({ color1: 'green', color2: 'lightgrey' })
            count = 1
            this.props.getListAll(count)
        }
    }
    _pressG2 = () => {
        if (this.state.color2 != 'green') {
            this.setState({ color1: 'lightgrey', color2: 'green' })
            count = 1
            this.props.getListMe(count)
        }
    }

    _reload2 = () => {
        count = 1
        this.props.getListMe(count)
    }

    _onScrollEndList2 = () => {
        if (this.props.data_meBoard && this.props.data_meBoard.length >= 10 && (this.props.request1 == false || this.props.request1 == null)) {
            count++
            this.props.getListMe(count)
        }
    }

    _renderItem2 = ({ item, index }) => {
        let date = moment.unix(item.created_at).format("DD MMM YYYY (HH:mm)")
        return (
            <TouchableOpacity style={styles.eachList} onPress={() => this._goToBoard(item)}>
                <View>
                    <View style={styles.eachList2}>
                        {/* picture */}
                        <View style={styles.imageView}>
                            {item.profile && item.profile.image != null && item.profile.image && <Image source={{ uri: 'https://s3-ap-southeast-1.amazonaws.com/core-profile/images/' + item.profile.image }} style={styles.eachListImage} />}
                            {item.profile && item.profile.fb_id != null && item.profile.fb_id && <Image source={{ uri: 'https://graph.facebook.com/' + item.profile.fb_id + '/picture' }} style={styles.eachListImage} />}
                            {(item.profile == null) && <Image source={Images.user} style={styles.eachListImage} />}
                        </View>
                        <View style={styles.nameView}>
                            {/* name & time */}
                            <Text style={styles.eachListText1}>{item.profile && item.profile.firstname != null && item.profile.firstname ? (item.profile.firstname + " " + (item.profile.lastname ? item.profile.lastname : "")) : 'CheckPhra User'}</Text>
                            <Text style={styles.eachListText2}>{date}</Text>
                        </View>
                    </View>

                    <View style={styles.topicView}>
                        {/* topic numLike numComment */}
                        <Text style={styles.eachListText3} numberOfLines={1}>{item.topic}</Text>

                        <View style={styles.countCommentView}>
                            <Icon2 name={'commenting-o'} size={26} style={styles.iconComment} />
                            <Text style={styles.textComment}>{item.count}</Text>
                        </View>
                    </View>
                </View>

                {/* MY BOARD */}
                {this.props.tmp_my && this.props.tmp_my.find(e => e.id == item.id).status == true && <View
                    style={{ width: 11, height: 11, backgroundColor: 'red', borderRadius: 5.5, borderColor: 'white', borderWidth: 1, position: 'absolute', top: 1, right: 1 }}></View>}
            </TouchableOpacity>
        )
    }

    _renderItem = ({ item, index }) => {
        let date = moment.unix(item.created_at).format("DD MMM YYYY (HH:mm)")
        return (
            <TouchableOpacity style={styles.eachList} onPress={() => this._goToBoard(item)}>
                <View>
                    <View style={styles.eachList2}>
                        {/* picture */}
                        <View style={styles.imageView}>
                            {item.profile && item.profile.image != null && item.profile.image && <Image source={{ uri: 'https://s3-ap-southeast-1.amazonaws.com/core-profile/images/' + item.profile.image }} style={styles.eachListImage} />}
                            {item.profile && item.profile.fb_id != null && item.profile.fb_id && <Image source={{ uri: 'https://graph.facebook.com/' + item.profile.fb_id + '/picture' }} style={styles.eachListImage} />}
                            {(item.profile == null) && <Image source={Images.user} style={styles.eachListImage} />}
                        </View>
                        <View style={styles.nameView}>
                            {/* name & time */}
                            <Text style={styles.eachListText1}>{item.profile && item.profile.firstname != null && item.profile.firstname ? (item.profile.firstname + " " + (item.profile.lastname ? item.profile.lastname : "")) : 'CheckPhra User'}</Text>
                            <Text style={styles.eachListText2}>{date}</Text>
                        </View>
                    </View>

                    <View style={styles.topicView}>
                        {/* topic numLike numComment */}
                        <Text style={styles.eachListText3} numberOfLines={1}>{item.topic}</Text>

                        <View style={styles.countCommentView}>
                            <Icon2 name={'commenting-o'} size={26} style={styles.iconComment} />
                            <Text style={styles.textComment}>{item.count}</Text>
                        </View>
                    </View>

                </View>
                {/* ALL BOARD */}
                {this.props.tmp_all && this.props.tmp_all != null && this.props.tmp_all.find(e => e.id == item.id) && this.props.tmp_all.find(e => e.id == item.id).status == true && <View
                    style={{ width: 11, height: 11, backgroundColor: 'red', borderRadius: 5.5, borderColor: 'white', borderWidth: 1, position: 'absolute', top: 1, right: 1 }}></View>}
            </TouchableOpacity>
        )
    }

    render() {
        I18n.locale = this.props.language
        // const data = [{ name: 'Olive oil', topic: "แฉพระชื่อดัง", detail: "เมื่อวันที่ 16 มกราคม 2562 เวลาประมาณ 16.24น. ได้มีการค้นพบพระชื่อดังจาก หลุมลึกขนาดใหญ่ บริเวณไซต์ก่อสร้าง เบื้องต้นคาดว่าน่าจะเป็นพระสมเด็จโต จากซากวัดในสมัยก่อน", comment: [{ com: '5555', like: 12, name: 'Janeny', date: '1 Jan 19' }, { com: '666', like: 13, name: 'Johny Wat', date: '2 Jan 19' }, { com: '777', like: 0, name: 'Johny Wat', date: '14:36' }], date: '16/01/2562' },
        // { name: 'Doggy', topic: "New Amulet SOMDEJ", detail: "เมื่อวันที่ 16 มกราคม 2562 เวลาประมาณ 16.24น. ได้มีการค้นพบพระชื่อดังจาก หลุมลึกขนาดใหญ่ บริเวณไซต์ก่อสร้าง เบื้องต้นคาดว่าน่าจะเป็นพระสมเด็จโต จากซากวัดในสมัยก่อน", comment: [{ com: 'somdej to', like: 1229, name: 'WTF', date: '11 Jan 19' }, { com: 'Sathu', like: 13000, name: 'AdminBLue', date: '15:58' }], date: '16/01/2562' }]
        console.log("---------------------- WEBBOARD 1 ----------------------")
        console.log(this.props.data_allBoard)

        return (
            <LinearGradient colors={["#FF9933", "#FFCC33"]} style={styles.container} >
                <Image source={Images.watermarkbg} style={styles.mainBackground} resizeMode='contain' />

                <View style={{ flexDirection: 'row', width: '100%', borderBottomColor: 'orange', borderBottomWidth: 1 }}>
                    <TouchableOpacity style={{ backgroundColor: Colors.milk, borderTopWidth: 7, borderTopColor: this.state.color1, height: 40, flex: 1, borderRightColor: 'orange', borderRightWidth: 1 }}
                        onPress={this._pressG1}>
                        <Text style={styles.textGroup}>{I18n.t('allBoard')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ backgroundColor: Colors.milk, borderTopWidth: 7, borderTopColor: this.state.color2, height: 40, flex: 1 }}
                        onPress={this._pressG2}>
                        <Text style={styles.textGroup}>{I18n.t('myBoard')}</Text>
                    </TouchableOpacity>
                </View>

                {this.state.color1 == 'green' && <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.request == true}
                            onRefresh={this._reload.bind(this)}
                        />
                    }
                    data={this.props.data_allBoard}
                    renderItem={this._renderItem}
                    onEndReached={this._onScrollEndList}
                    // onEndReachedThreshold={0.025}
                    onEndReachedThreshold={1.2}
                    ListEmptyComponent={() => <Text style={{ marginTop: 50, alignSelf: 'center', fontSize: 20, color: '#aaa' }}>{I18n.t('nonePending')}</Text>}
                />}

                {this.state.color2 == 'green' && <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.request1 == true}
                            onRefresh={this._reload2.bind(this)}
                        />
                    }
                    data={this.props.data_meBoard}
                    renderItem={this._renderItem2}
                    onEndReached={this._onScrollEndList2}
                    // onEndReachedThreshold={0.025}
                    onEndReachedThreshold={1.2}
                    ListEmptyComponent={() => <Text style={{ marginTop: 50, alignSelf: 'center', fontSize: 20, color: '#aaa' }}>{I18n.t('nonePending')}</Text>}
                />}

                <PopupDialog
                    dialogTitle={<View style={styles.popupHead}><Text style={styles.popupTextHead}>{I18n.t('webBoard')}</Text></View>}
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    width={width / 1.05}
                    height={height / 1.5}
                    // height={150}
                    onDismissed={() => { this.setState({ topic: null, content: null }) }}
                >
                    <ScrollView>
                        <View style={styles.popupContainer}>
                            <View style={styles.freeView2}></View>
                            <Text style={styles.textPost2}>Topic</Text>
                            <TextInput value={this.state.topic}
                                underlineColorAndroid={'rgba(0,0,0,0)'}
                                style={styles.textBox}
                                onChangeText={(text) => this.setState({ topic: text })} />

                            <Text style={styles.textPost2}>Content</Text>
                            <TextInput value={this.state.content}
                                underlineColorAndroid={'rgba(0,0,0,0)'}
                                style={styles.textBox2}
                                multiline={true}
                                onChangeText={(text) => this.setState({ content: text })}
                            />

                            <View style={styles.buttonView}>

                                <View style={styles.buttonPost}>
                                    <RoundedButton title={I18n.t('ok')} onPress={this._post} />
                                </View>

                                <View style={styles.buttonPost}>
                                    <RoundedButton title={I18n.t('cancel')} onPress={() => this.popupDialog.dismiss()} />
                                </View>
                            </View>

                            <View style={styles.freeView}></View>
                        </View>
                    </ScrollView>
                </PopupDialog>

                {/* <TouchableOpacity style={styles.iconView} onPress={this._newPost}>
                    <Icon2 name={'plus-square-o'} color={'dark'} size={34} />
                </TouchableOpacity> */}
                <Spinner
                    visible={this.props.request3}
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
        user_id: state.auth.user_id,
        profile: state.auth.profile,

        request: state.webboard.request, // for get list all board
        data_allBoard: state.webboard.data_allBoard, // store all webboard

        request1: state.webboard.request1, // for get list me post board
        data_meBoard: state.webboard.data_meBoard, // store my post board

        request3: state.webboard.request3, // for add post 
        data_addpost: state.webboard.data_addpost, // store my add post board

        tmp_my: state.webboard.tmp_my,  // store temp my webboard
        tmp_all: state.webboard.tmp_all,  // store temp all webboard
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProfile: () => dispatch(QuestionActions.getProfile()),
        setWebboard: (data) => dispatch(WebboardActions.setWebboard(data)),

        getListAll: (page) => dispatch(WebboardActions.getListAll(page)),
        addPost: (topic, content) => dispatch(WebboardActions.addPost(topic, content)),
        getListMe: (page) => dispatch(WebboardActions.getListMe(page)),
        setMyBoard: (data) => dispatch(WebboardActions.setMyBoard(data)),
        setAllBoard: (data) => dispatch(WebboardActions.setAllBoard(data)),

        updateMyBoard: (id, updated_at, status) => dispatch(WebboardActions.updateMyBoard(id, updated_at, status)),
        updateAllBoard: (id, updated_at, status) => dispatch(WebboardActions.updateAllBoard(id, updated_at, status)),

        addMyNewPost: (data) => dispatch(WebboardActions.addMyNewPost(data)),
        clearListMyAll: () => dispatch(WebboardActions.clearListMyAll()),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Webboard)