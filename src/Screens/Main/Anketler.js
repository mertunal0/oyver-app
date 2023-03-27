
import React, { Component } from 'react';
import {View,FlatList,ImageBackground,Pressable,StyleSheet,Dimensions,Text,TouchableOpacity,Alert,Platform, RefreshControl, Image} from 'react-native';
import TopBar from '../../Components/TopBar';
import { BannerAdSize, BannerAd, TestIds } from 'react-native-google-mobile-ads';
import Services from "../../Util/Service";
import Anket from "../../Components/Anket"

const window = Dimensions.get('window');

export default class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anketler: [],
            reachEndPerm: true,
            refreshing: false,
            secimId: global.seciliSecimId,
        };
    }

    getAnketler = (anketCount) => {
        Services.generalServicePrivate("/Users/GetAnketlerBySecimId", {SecimId: this.state.secimId, AnketSayaci: anketCount})
        .then(res => {
            if(res)
            {
                if(anketCount > 0)
                {
                    let arr = this.state.anketler
                    res.forEach(e => {
                        arr.push(e)
                    });
                    this.setState({ anketler: arr}, () => this.setState({reachEndPerm: true}) )
                }
                else
                {
                    this.setState({ anketler: res}, () => this.setState({reachEndPerm: true}) )
                }
            }
        })
    }

    componentDidMount = () => 
    {
        this.getAnketler(0)
    }

    handleRefresh = () => 
    {
        this.setState({refreshing: true})
        this.getAnketler(0)
        this.setState({refreshing: false})
    }

    onEndReached = () =>  
    {
        if(true == this.state.reachEndPerm)
        {
            this.setState({reachEndPerm: false}, () => {
                this.getAnketler(this.state.anketler.length)
            })
        }
    }


    render() {
        return(
            <View style={styles.page}>
                <TopBar props={this.props}/>

                <ImageBackground source={require("../../Image/bg.png")} blurRadius={Platform.OS === 'ios' ? 90 : 300} resizeMode="stretch" style={{flexDirection:"row", width:"100%", height: "100%"}}>
                    
                    <FlatList
                        refreshControl={<RefreshControl onRefresh={() => this.handleRefresh()} refreshing={this.state.refreshing}/>}
                        onScroll={(e) => {
                            if (e.nativeEvent.contentOffset.y > e.nativeEvent.contentSize.height - 1200) {this.onEndReached(); }
                        }}
                        style={{
                            height: window.height - 100,
                            paddingHorizontal: 15,
                            flex: 1,
                            paddingTop: 20,
                            backgroundColor: 'transparent'
                        }}
                        data={this.state.anketler.length > 0 ? this.state.anketler : []}
                        keyExtractor={item => item.AnketId}
                        renderItem={({ item }) => (
                            <Anket
                                anketId={item.AnketId}
                                anketSorusu={item.AnketSorusu}
                                popularite={item.AnketPopularite}
                                kalanZamanSaat={item.KalanZamanSaat}
                                anketFotograf={item.AnketFotograf}
                                sikFotograflari={item.SikFotograflari}
                                props={this.props}
                                goToAnket={() => this.props.navigation.navigate("AnketPage", {  AnketId:            item.AnketId, 
                                                                                                AnketPopularite:    item.AnketPopularite, 
                                                                                                AnketSorusu:        item.AnketSorusu, 
                                                                                                SikFotograflari:    item.SikFotograflari, 
                                                                                                AnketFotograf:      item.AnketFotograf,
                                                                                                KalanZaman:         item.KalanZamanSaat    })}
                            />
                        )}
                        ListHeaderComponent={(
                            <>
                                <Text style={styles.title}>Anketler</Text>
                                <View style={{backgroundColor: "transparent", alignItems: 'center'}}>
                                    <BannerAd
                                        unitId= {Platform.OS === 'ios' ? "ca-app-pub-7764130368146320/2373677975" : "ca-app-pub-7764130368146320/9337072967"}//!< banner3
                                        size={BannerAdSize.BANNER}
                                        requestOptions={{
                                        requestNonPersonalizedAdsOnly: true,}}
                                        onAdLoaded={() => {
                                        console.log('Advert loaded');}}
                                        onAdFailedToLoad={(error) => {
                                        console.error('Advert failed to load: ', error);}}
                                    />
                                </View>
                            </>
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
    title: {
        marginBottom: 4,
        fontSize: 18,
        fontFamily: 'Inter-SemiBold',
        color: '#121118',
    },
});


/*
<View style={{
        height: window.height - 100,
        paddingHorizontal: 15,
        flex: 1,
        paddingTop: 20,
        backgroundColor: 'transparent'
    }}>
    <Text style={styles.title}>Anketler</Text>
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
    {this.state.anketler.map((item, idx) => (
        <Anket
            anketId={item.AnketId}
            anketSorusu={item.AnketSorusu}
            popularite={item.AnketPopularite}
            kalanZamanSaat={item.KalanZamanSaat}
            anketFotograf={item.AnketFotograf}
            sikFotograflari={item.SikFotograflari}
            props={this.props}
            goToAnket={() => this.props.navigation.navigate("AnketPage", {  AnketId:            item.AnketId, 
                                                                            AnketPopularite:    item.AnketPopularite, 
                                                                            AnketSorusu:        item.AnketSorusu, 
                                                                            SikFotograflari:    item.SikFotograflari, 
                                                                            AnketFotograf:      item.AnketFotograf   })}
        />
    ))}

</View>

*/