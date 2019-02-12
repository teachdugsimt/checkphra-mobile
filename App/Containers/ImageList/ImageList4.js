import React, { Component } from 'react'
import { ScrollView, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Images, Colors } from '../../Themes'

class ImageList2 extends Component {



    _renderItem = ({ item, index }) => {
        // console.log(item)
        // let img = item.images ? JSON.parse(item.images) : []

        let imgName = item ?
            { uri: item, scale: 0.1 } :
            Images.coin0

        return (
            <View style={{ width: 28, height: 28, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', marginLeft: 2 }}>
                <Image source={imgName} style={{ width: 28, height: 28, position: 'absolute', top: 0, left: 0, borderRadius: 8 }} />
            </View>)

    }

    render() {

        return (
            <View style={{ height: 28 }}>
                <FlatList
                    data={this.props.data}
                    renderItem={this._renderItem}
                    numColumns={7}
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

export default connect(mapStateToProps, mapDispatchToProps)(ImageList2)
