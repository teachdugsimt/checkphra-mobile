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

class Webboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            one: 1,
            topic: null,
            content: null,

            color1: 'green',
            color2: 'lightgrey',
        }
    }

    static getDerivedStateFromProps(newProps, prevState) {
        console.log(newProps)
        console.log(prevState)
        console.log('++++++++++++ WEBBOARD 1 ++++++++++++')

        return {

        }
    }

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};

        return {
            headerRight: (
                <TouchableOpacity onPress={params.newItem}>
                    <Icon2 name={'plus-square-o'} color={'white'} size={40} style={{ paddingRight: 10 }} />
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
        count = 1
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProfile: () => dispatch(QuestionActions.getProfile()),
        setWebboard: (data) => dispatch(WebboardActions.setWebboard(data)),

        getListAll: (page) => dispatch(WebboardActions.getListAll(page)),
        addPost: (topic, content) => dispatch(WebboardActions.addPost(topic, content)),
        getListMe: (page) => dispatch(WebboardActions.getListMe(page)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Webboard)