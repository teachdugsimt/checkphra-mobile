import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes'
import { Dimensions } from 'react-native'
let { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        flex: 1
    },
    mainBackground: {
        position: 'absolute',
        right: 0, bottom: 0,
        width: width,
        height: width * 95.7 / 100
    },
    eachList: {
        flexDirection: 'row',
        height: 100,
        backgroundColor: Colors.milk,
        borderBottomColor: 'orange',
        borderBottomWidth: 1,
    },
    eachList2: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        marginLeft: 10,
        marginTop: 10
    },
    eachListImage: {
        borderRadius: 25,
        width: 50,
        height: 50,
    },
    eachListText1: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Prompt-SemiBold'
    },
    eachListText2: {
        fontSize: 14,
    },
    eachListText3: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Prompt-SemiBold',
        color: Colors.brownTextTran,
    },
    topicView: {
        marginLeft: 10
    },
    nameView: {
        // backgroundColor: 'red'
        marginLeft: 10
    },
    imageView: {
        // backgroundColor: 'blue'
    },

    // ++++++++++++++++++++++++++++++++++WEBBOARD2++++++++++++++++++++++++++++++++++
    topRow: {
        flexDirection: 'column',
    },
    subTopRow: {
        flexDirection: 'row',
        marginRight: 8,
    },
    nameText: {
        fontSize: 15.5,
        fontWeight: 'bold',
        marginLeft: 10
    },
    dateText: {
        fontSize: 13,
        marginLeft: 10,
        marginTop: 2
    },
    commentText: {
        fontSize: 14,
        marginHorizontal: 10,
        // marginTop: 10
    },
    likeView: {
        flexDirection: 'row',
        // marginRight: 10
        alignSelf: 'flex-end'
    },
    likeTouch: {
        marginRight: 5,
        flexDirection: 'row'
    },
    likeTouch2: {
        marginRight: 5,
        flexDirection: 'row'
    },
    row3View: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginHorizontal: 10,
        marginTop: 5
    },
    row2View: {
        marginTop: 5
    },
    commentContainer: {
        flex: 1,
        backgroundColor: Colors.milk,
        borderBottomColor: 'orange',
        borderBottomWidth: 1
    },
    commentContainer2: {
        marginVertical: 15
    },
    answerView: {
        // marginLeft: 10
    },
    numLikeText: {
        marginHorizontal: 6
    },
    numLikeText2: {
        marginHorizontal: 6
    },
    topicViewRender: {
        backgroundColor: Colors.milk,
        borderBottomColor: 'orange',
        borderBottomWidth: 1,
    },
    topicText: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Prompt-SemiBold',
        color: Colors.brownTextTran,
        marginLeft: 10,
        marginTop: 5
    },
    commentTopRow: {
        flexDirection: 'row'
    },
    iconView: {
        position: 'absolute',
        right: 5,
        bottom: 5,
    },

    //***************************** */ popup
    popupHead: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 8,
        borderBottomWidth: 1,
        backgroundColor: 'orange'
    },
    popupContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFE4B5'
    },
    popupTextHead: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textBox: {
        // borderWidth: 1,,
        textAlignVertical: 'center',
        borderRadius: 10,
        backgroundColor: Colors.textInput,
        margin: 10,
        height: 35,
        width: '75%'
    },
    textBox2: {
        // borderWidth: 1,,
        textAlignVertical: 'top',
        borderRadius: 10,
        backgroundColor: Colors.textInput,
        margin: 10,
        height: height / 2.5,
        width: '75%'
    },
    textBox3: {
        // borderWidth: 1,,
        textAlignVertical: 'top',
        borderRadius: 10,
        backgroundColor: Colors.textInput,
        margin: 10,
        height: height / 3.85,
        width: '75%'
    },
    buttonPost: {
        width: '40%',
        height: 25
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    textPost2: {
        fontFamily: 'Prompt-SemiBold',
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.brownTextTran
    },
    freeView: {
        height: 35
    },
    freeView2: {
        height: 15
    },
    textGroup: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.brownTextTran,
        alignSelf: 'center',
        textAlignVertical: 'center',
        marginTop: 5
    }
})