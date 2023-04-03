import React, { Component } from 'react';
import {View,FlatList,ImageBackground,Pressable,StyleSheet,Dimensions,Text,TouchableOpacity,Alert,Platform, RefreshControl, Image} from 'react-native';
import WebView from 'react-native-webview';

const SEKIZ_SAAT_2_MS = 8*60*60*1000;

const window = Dimensions.get('window');

export default class AdayDetayliIstatistik extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount = () => 
    {
        
    }

    render() {
        return(
            <View style={styles.page}>
                <WebView source={{uri: this.props.route.params.url}}></WebView>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    page: {
        backgroundColor: "#a9927d",
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 40 : 0,
    },
});
