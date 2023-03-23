
import React, { Component } from 'react';
import {View,FlatList,ImageBackground,Pressable,StyleSheet,Dimensions,Text,TouchableOpacity,Alert,Platform, RefreshControl, Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Olay from '../../Components/Olay';
import TopBar from '../../Components/TopBar';
import { BannerAdSize, BannerAd, TestIds } from 'react-native-google-mobile-ads';
import Services from "../../Util/Service";

const window = Dimensions.get('window');

export default class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            olaylar: [],
            reachEndPerm: true,
            refreshing: false,

        };
    }

    getOlaylar = (olayCount) => {
        Services.generalServicePrivate("/Users/GetOlaylar", {CurrentOlayCount: olayCount})
        .then(res => {
            if(res)
            {
                if(olayCount > 0)
                {
                    let arr = this.state.olaylar
                    res.forEach(e => {
                        arr.push(e)
                    });
                    this.setState({ olaylar: arr}, () => this.setState({reachEndPerm: true}) )
                }
                else
                {
                    this.setState({ olaylar: res}, () => this.setState({reachEndPerm: true}) )
                }
            }
        })
    }

    componentDidMount = () => 
    {
        this.getOlaylar(0)
    }

    handleRefresh = () => 
    {
        this.setState({refreshing: true})
        this.getOlaylar(0)
        this.setState({refreshing: false})
    }

    onEndReached = () =>  
    {
        if(true == this.state.reachEndPerm)
        {
            this.setState({reachEndPerm: false}, () => {
                this.getOlaylar(this.state.olaylar.length)
            })
        }
    }


    render() {
        return(
            <View style={styles.page}>
                <TopBar props={this.props}/>

                <ImageBackground source={require("../../Image/bg.png")} blurRadius={300} resizeMode="stretch" style={{flexDirection:"row", width:"100%", height: "100%"}}>
                    <FlatList
                        refreshControl={<RefreshControl onRefresh={() => this.handleRefresh()} refreshing={this.state.refreshing}/>}
                        onScroll={(e) => {
                            if (e.nativeEvent.contentOffset.y > e.nativeEvent.contentSize.height - 1200) {this.onEndReached(); }
                        }}
                        style={{
                            paddingHorizontal: 15,
                            flex: 1,
                            paddingTop: 20,
                            backgroundColor: 'transparent'
                        }}
                        data={this.state.olaylar.length > 0 ? this.state.olaylar : []}
                        keyExtractor={item => item.Id}
                        renderItem={({ item }) => (
                            <Olay
                                olayId={item.Id}
                                text={item.OlayText}
                                createdAt={item.OlayCreatedDate}
                                props={this.props}
                            />
                        )}
                        ListHeaderComponent={(
                            <View style={{backgroundColor: "transparent", alignItems: 'center'}}>
                                <BannerAd
                                    unitId="ca-app-pub-7764130368146320/9337072967"//!< banner3
                                    size={BannerAdSize.BANNER}
                                    requestOptions={{
                                    requestNonPersonalizedAdsOnly: true,}}
                                    onAdLoaded={() => {
                                    console.log('Advert loaded');}}
                                    onAdFailedToLoad={(error) => {
                                    console.error('Advert failed to load: ', error);}}
                                />
                            </View>
                        )}
                    />
                </ImageBackground>
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
