import React, { Component } from 'react'
import { ScrollView, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Images, Colors } from '../../Themes'

class ImageList3 extends Component {



    _renderItem = ({ item, index }) => {
        // console.log(item)
        // let img = item.images ? JSON.parse(item.images) : []
        if (index > 0) {
            let imgName = item ?
                { uri: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/market/thumbs/tmb_100x100_' + item, scale: 0.1 } :
                Images.coin0

            return (
                <View style={{ width: 30, height: 30, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', marginLeft: 2 }}>
                    <Image source={imgName} style={{ width: 30, height: 30, position: 'absolute', top: 0, left: 0, borderRadius: 8 }} />
                </View>)
        }
    }

    render() {

        return (
            <View style={{ height: 30, marginLeft: 5 }}>
                <FlatList
                    data={this.props.data}
                    renderItem={this._renderItem}
                    numColumns={6}
                />
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageList3)
