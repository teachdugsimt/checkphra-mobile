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
// import Reactotron from 'reactotron-react-native'
I18n.fallbacks = true;
// I18n.currentLocale('th');
// I18n.locale = 'th'  // true
const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});
let { width, height } = Dimensions.get('window')
let count = 1
let date = ''
let check = true
class Webboard2 extends Component {

  constructor(props) {
    super(props)
    this.state = {
      one: 1,
      comment: null,
      tmp_comment: null,
      tmp_addcomment: null,
      tmp_like: null,
      tmp_like2: null,
    }
  }

  componentWillUnmount() {
    this.props.clearComment()  // clear comment, add comment , like ...
    // this.props.getProfile()
    // count = 1
    // this.props.getListAll(count)
    check = true
  }

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerRight: (
        <TouchableOpacity onPress={params.newPost}>
          <Icon2 name={'plus-circle'} color={'white'} size={40} style={{ paddingRight: 10 }} />
        </TouchableOpacity>
      ),
    };
  };

  _newPost = () => {
    this.popupDialog.show()
  }

  componentDidMount() {
    this.props.navigation.setParams({ newPost: this._newPost });
    this.props.getComment()
    count = 1
    check = true
    this.setState({ tmp_comment: this.props.data_comment })
    this.props.editRedDotData(this.props.data_webboard)
  }

  _reload = () => {
    this.props.getComment()
  }

  _goToBoard = (item) => {
    // this.props.setWebboard(item)
    // this.props.navigation.navigate("")
  }

  static getDerivedStateFromProps(newProps, prevState) {
    // console.log(newProps)
    // Reactotron.warn(newProps)
    // Reactotron.warn(prevState)
    console.log('แอบมองเธออยู่นะจ๊ะ 55ห')
    // console.log(prevState)


    // if (newProps.data_addcomment && newProps.data_addcomment != null) {
    //     if (Number(newProps.data_addcomment.post_id) == prevState.tmp_comment.id && prevState.tmp_addcomment != newProps.data_addcomment) {
    //         newProps.editDataComment(newProps.data_addcomment)
    //         return {
    //             tmp_comment: newProps.data_comment,
    //             tmp_addcomment: newProps.data_addcomment
    //         }
    //     }
    // }

    if (newProps.data_addcomment && newProps.data_addcomment != null) {
      if (prevState.tmp_addcomment != newProps.data_addcomment) {
        newProps.editDataComment(newProps.data_addcomment)
        return {
          tmp_addcomment: newProps.data_addcomment
        }
      }
    }

    if (newProps.data_like && newProps.data_like != null && newProps.data_comment) {
      if (prevState.tmp_like != newProps.data_like && newProps.data_like.id == newProps.data_comment.id && newProps.data_like.comments) {  // Like post only
        console.log('--------- LIKE POST  -----------')
        newProps.editLikeData(newProps.data_like)
        return {
          tmp_like: newProps.data_like
        }
      }
      else if (prevState.tmp_like2 != newProps.data_like && newProps.data_like.post_id == newProps.data_comment.id && !newProps.data_like.comments) {  // Like comment only
        console.log('--------- LIKE COMMENT -----------')
        newProps.editLikeData2(newProps.data_like)

        return {
          tmp_like2: newProps.data_like
        }
      }
    }

    return {
      tmp_comment: newProps.data_comment
    }
  }

  _likePost = (item) => {
    this.props.like(this.props.data_comment.id, 'post', 'like')
  }

  _dislikePost = (item) => {
    this.props.like(this.props.data_comment.id, 'post', 'dislike')
  }

  _likeComment = (item) => {
    this.props.like(item.id, 'comment', 'like')
  }

  _dislikeComment = (item) => {
    this.props.like(item.id, 'comment', 'dislike')
  }

  tagname = (item) => {
    this.popupDialog.show()
    this.setState({ comment: "@" + item + " " })
  }

  _renderItem = ({ item, index }) => {
    let date = moment.unix(item.created_at).format("DD MMM YYYY (HH:mm)")
    if (index == 0) {
      return (
        <View>
          <View style={styles.topicViewRender}>
            <View style={styles.commentContainer2}>

              <View style={styles.topRow}>
                <Text style={styles.topicText}>{this.props.data_comment.topic}</Text>
                <View style={styles.subTopRow}>
                  <TouchableOpacity onPress={() => this.tagname(this.props.data_comment.profile && this.props.data_comment.profile.display_name ? this.props.data_comment.profile.display_name : this.props.data_comment.profile && this.props.data_comment.profile.firstname ? (this.props.data_comment.profile.firstname + " " + (this.props.data_comment.profile.lastname ? this.props.data_comment.profile.lastname : "")) : 'CheckPhra User')}>
                    <Text style={styles.nameText}>{this.props.data_comment.profile && this.props.data_comment.profile.display_name ? this.props.data_comment.profile.display_name : this.props.data_comment.profile && this.props.data_comment.profile.firstname ? (this.props.data_comment.profile.firstname + " " + (this.props.data_comment.profile.lastname ? this.props.data_comment.profile.lastname : "")) : 'CheckPhra User'}</Text>
                  </TouchableOpacity>
                  <Text style={styles.dateText} >{moment.unix(this.props.data_comment.created_at).format("DD MMM YYYY (HH:mm)")}</Text>
                </View>

              </View>

              <View style={styles.row2View}>
                <Text style={styles.commentText}>{this.props.data_comment.content}</Text>
              </View>

              <View style={styles.row3View}>
                <View style={styles.likeView}>
                  <TouchableOpacity style={styles.likeTouch} onPress={() => this._likePost(item)}><Icon2 name={'thumbs-o-up'} size={20} />
                    <Text style={styles.numLikeText}>{this.props.data_comment.like}</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.likeTouch2} onPress={() => this._dislikePost(item)}><Icon2 name={'thumbs-o-down'} size={20} />
                    <Text style={styles.numLikeText2}>{this.props.data_comment.dislike}</Text></TouchableOpacity>
                </View>
              </View>

            </View>
          </View>


          <View style={styles.commentContainer} onPress={() => this._goToBoard(item)}>
            <View style={styles.commentContainer2}>
              <View style={styles.commentTopRow}>
                <TouchableOpacity onPress={() => this.tagname(item.profile && item.profile.display_name ? item.profile.display_name : item.profile && item.profile.firstname ? (item.profile.firstname + " " + (item.profile.lastname ? item.profile.lastname : "")) : 'CheckPhra User')}>
                  <Text style={styles.nameText}>{item.profile && item.profile.display_name ? item.profile.display_name : item.profile && item.profile.firstname ? (item.profile.firstname + " " + (item.profile.lastname ? item.profile.lastname : "")) : 'CheckPhra User'}</Text>
                </TouchableOpacity>
                <Text style={styles.dateText} >{date}</Text>
              </View>

              <View style={styles.row2View}>
                <Text style={styles.commentText}>{item.text}</Text>
              </View>

              <View style={styles.row3View}>
                {/* <TouchableOpacity style={styles.answerView}><Text>คำตอบ()</Text></TouchableOpacity> */}
                <View style={styles.likeView}>
                  <TouchableOpacity style={styles.likeTouch} onPress={() => this._likeComment(item)}><Icon2 name={'thumbs-o-up'} size={20} />
                    <Text style={styles.numLikeText}>{item.like}</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.likeTouch2} onPress={() => this._dislikeComment(item)}><Icon2 name={'thumbs-o-down'} size={20} />
                    <Text style={styles.numLikeText2}>{item.dislike}</Text></TouchableOpacity>
                </View>
              </View>

            </View>
          </View>
        </View>
      )
    } else {
      return (
        <View style={styles.commentContainer} onPress={() => this._goToBoard(item)}>
          <View style={styles.commentContainer2}>
            <View style={styles.commentTopRow}>
              <TouchableOpacity onPress={() => this.tagname(item.profile && item.profile.display_name ? item.profile.display_name : item.profile && item.profile.firstname ? (item.profile.firstname + " " + (item.profile.lastname ? item.profile.lastname : "")) : 'CheckPhra User')}>
                <Text style={[styles.nameText, { color: item.profile && item.profile.display_name ? "red" : Colors.brownTextTran }]}>{item.profile && item.profile.display_name ? item.profile.display_name : item.profile && item.profile.firstname ? (item.profile.firstname + " " + (item.profile.lastname ? item.profile.lastname : "")) : 'CheckPhra User'}</Text>
              </TouchableOpacity>
              <Text style={styles.dateText} >{date}</Text>
            </View>

            <View style={styles.row2View}>
              <Text style={styles.commentText}>{item.text}</Text>
            </View>

            <View style={styles.row3View}>
              {/* <TouchableOpacity style={styles.answerView}><Text>คำตอบ()</Text></TouchableOpacity> */}
              <View style={styles.likeView}>
                <TouchableOpacity style={styles.likeTouch} onPress={() => this._likeComment(item)}><Icon2 name={'thumbs-o-up'} size={20} />
                  <Text style={styles.numLikeText}>{item.like}</Text></TouchableOpacity>
                <TouchableOpacity style={styles.likeTouch2} onPress={() => this._dislikeComment(item)}><Icon2 name={'thumbs-o-down'} size={20} />
                  <Text style={styles.numLikeText2}>{item.dislike}</Text></TouchableOpacity>
              </View>
            </View>

          </View>
        </View>
      )
    }
  }

  // _newComment = () => {
  //     this.popupDialog.show()
  // }

  _comment = () => {
    if (this.state.comment) {
      this.props.addComment(this.state.comment)
      this.popupDialog.dismiss()
    } else {
      alert(I18n.t('checkData'))
    }
  }



  render() {
    I18n.locale = this.props.language
    // console.log(this.props.data_comment)
    console.log(this.props.data_webboard)
    console.log('--------------- WEBBOARD2 Comment Data ----------------')
    // const data = [{ name: 'Olive oil', topic: "แฉพระชื่อดัง", detail: "เมื่อวันที่ 16 มกราคม 2562 เวลาประมาณ 16.24น. ได้มีการค้นพบพระชื่อดังจาก หลุมลึกขนาดใหญ่ บริเวณไซต์ก่อสร้าง เบื้องต้นคาดว่าน่าจะเป็นพระสมเด็จโต จากซากวัดในสมัยก่อน", comment: [{ com: '5555', like: 12 }, { com: '666', like: 13 }], date: '16/01/2562' },
    // { name: 'Doggy', topic: "New Amulet SOMDEJ", detail: "เมื่อวันที่ 16 มกราคม 2562 เวลาประมาณ 16.24น. ได้มีการค้นพบพระชื่อดังจาก หลุมลึกขนาดใหญ่ บริเวณไซต์ก่อสร้าง เบื้องต้นคาดว่าน่าจะเป็นพระสมเด็จโต จากซากวัดในสมัยก่อน", comment: [{ com: 'somdej to', like: 1229 }, { com: 'Sathu', like: 13000 }], date: '16/01/2562' }]
    return (
      <LinearGradient colors={["#FF9933", "#FFCC33"]} style={styles.container} >
        <Image source={Images.watermarkbg} style={styles.mainBackground} resizeMode='contain' />
        {this.props.data_comment && (this.props.data_comment.comments || this.props.data_comment.comments == null) && this.props.data_comment.comments.length == 0 && <View style={styles.topicViewRender}>
          <View style={styles.commentContainer2}>

            <View style={styles.topRow}>
              <Text style={styles.topicText}>{this.props.data_comment.topic}</Text>
              <View style={styles.subTopRow}>
                <Text style={styles.nameText}>{this.props.data_comment.profile && this.props.data_comment.profile.firstname ? (this.props.data_comment.profile.firstname + " " + (this.props.data_comment.profile.lastname ? this.props.data_comment.profile.lastname : "")) : 'CheckPhra User'}</Text>
                <Text style={styles.dateText} >{moment.unix(this.props.data_comment.created_at).format("DD MMM YYYY (HH:mm)")}</Text>
              </View>

            </View>

            <View style={styles.row2View}>
              <Text style={styles.commentText}>{this.props.data_comment.content}</Text>
            </View>

            <View style={styles.row3View}>
              <View style={styles.likeView}>
                <TouchableOpacity style={styles.likeTouch} onPress={() => this._likePost()}><Icon2 name={'thumbs-o-up'} size={20} />
                  <Text style={styles.numLikeText}>{this.props.data_comment.like}</Text></TouchableOpacity>
                <TouchableOpacity style={styles.likeTouch2} onPress={() => this._dislikePost()}><Icon2 name={'thumbs-o-down'} size={20} />
                  <Text style={styles.numLikeText2}>{this.props.data_comment.dislike}</Text></TouchableOpacity>
              </View>
            </View>

          </View>
        </View>}



        <FlatList
          data={this.props.data_comment && this.props.data_comment.comments ? this.props.data_comment.comments : []}
          renderItem={this._renderItem}
          RefreshControl={
            <RefreshControl
              refreshing={this.props.request2 == true}
              onRefresh={this._reload.bind(this)}
            />
          }
          ListEmptyComponent={() => <Text style={{ marginTop: 50, alignSelf: 'center', fontSize: 20, color: '#aaa' }}>{I18n.t('nonePending')}</Text>}
        />

        <PopupDialog
          dialogTitle={<View style={styles.popupHead}><Text style={styles.popupTextHead}>{I18n.t('webBoard')}</Text></View>}
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
          dialogAnimation={slideAnimation}
          width={width / 1.05}
          height={height / 2}
          // height={150}
          onDismissed={() => { this.setState({ comment: null }) }}
        >
          <ScrollView>
            <View style={styles.popupContainer}>
              <View style={styles.freeView2}></View>
              <Text style={styles.textPost2}>Comment</Text>
              <TextInput value={this.state.comment}
                underlineColorAndroid={'rgba(0,0,0,0)'}
                style={styles.textBox3}
                multiline={true}
                onChangeText={(text) => this.setState({ comment: text })} />

              <View style={styles.buttonView}>

                <View style={styles.buttonPost}>
                  <RoundedButton title={I18n.t('ok')} onPress={this._comment} />
                </View>

                <View style={styles.buttonPost}>
                  <RoundedButton title={I18n.t('cancel')} onPress={() => this.popupDialog.dismiss()} />
                </View>
              </View>

              <View style={styles.freeView}></View>
            </View>
          </ScrollView>
        </PopupDialog>

        {/* <TouchableOpacity style={styles.iconView} onPress={this._newComment}>
                    <Icon2 name={'plus-square-o'} color={'dark'} size={34} />
                </TouchableOpacity> */}

        <Spinner
          visible={this.props.request4}
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
    profile: state.auth.profile,   // access token & user_id
    profile2: state.question.profile,  // detail of admin [store, display name, name - last name]

    data_webboard: state.webboard.data_webboard,

    request2: state.webboard.request2, // for request comment post
    data_comment: state.webboard.data_comment,  // store comment data  (have topic detail)

    request4: state.webboard.request4,  // for add comment
    data_addcomment: state.webboard.data_addcomment, // store add comment data

    data_like: state.webboard.data_like,  // like post and comment
    tmp_my: state.webboard.tmp_my,  // store temp my webboard
    tmp_all: state.webboard.tmp_all,  // store temp all webboard
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: () => dispatch(QuestionActions.getProfile()),
    setWebboard: (data) => dispatch(WebboardActions.setWebboard(data)),
    getComment: () => dispatch(WebboardActions.getComment()),
    clearComment: () => dispatch(WebboardActions.clearComment()),
    addComment: (comment) => dispatch(WebboardActions.addComment(comment)),
    editDataComment: (data) => dispatch(WebboardActions.editDataComment(data)),
    like: (id, from, status) => dispatch(WebboardActions.like(id, from, status)),

    editLikeData: (data) => dispatch(WebboardActions.editLikeData(data)),
    editLikeData2: (data) => dispatch(WebboardActions.editLikeData2(data)),
    getListAll: (page) => dispatch(WebboardActions.getListAll(page)),

    editRedDotData: (data) => dispatch(WebboardActions.editRedDotData(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Webboard2)
