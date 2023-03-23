import React, { Component } from 'react';
import { Image,View,Dimensions, StyleSheet, ImageBackground, ScrollView,Text, TouchableOpacity } from 'react-native';
import Services from "../../Util/Service";
import AsyncBus from "../../Util/AsyncBus";
import DeviceInfo from 'react-native-device-info';
import Entypo from 'react-native-vector-icons/Entypo'
import { BannerAdSize, BannerAd, TestIds } from 'react-native-google-mobile-ads';

const window = Dimensions.get('window');

export default class SecimSecimi extends Component {
    constructor(props) {
        super(props);

        this.state = {
            aktifSecimler: [], //secim elemani: {SecimId, SecimIsmi, KalanZamanSaat}
        };
    }

    componentDidMount = () => {
        Services.generalServicePrivate("/Users/GetSecimler", {}).then(res => {
            if(res)
            {
                this.setState({aktifSecimler: res})
            }
        })
    }

    secimiSec = (secimId, secimAdi) => {
        //!< Globali setleyelim
        global.seciliSecimId    = secimId
        global.seciliSecimAdi   = secimAdi

        //!< Storagei da setleyelim ki tekrar appe girince kullanalim
        AsyncBus.SetLocalStorage("SeciliSecimId"    , secimId.toString())
        AsyncBus.SetLocalStorage("SeciliSecimAdi"   , secimAdi.toString())

        //!< Main routera gidebiliriz
        this.props.navigation.navigate("MainRouter")
    }

    KalanZamanTextiOlustur = (kalanSaat) => 
    {
        var gun     = (kalanSaat / 24).toFixed();
        var saat    = kalanSaat % 24;

        return (gun.toString() + " gün " + saat.toString() + " saat")
    }

    render() {
        return (
            <View style={styles.page}>
                

                <ImageBackground source={require("../../Image/bg.png")} blurRadius={300} resizeMode="stretch" style={{width:"100%", height: "100%"}}>
                    <View style={styles.topBar}>
                        <Image style={{height: 50, width: 50, borderRadius: 5, resizeMode: 'contain'}} source={{ uri: "https://i.hizliresim.com/lkmlz47.png"}}/>
                    </View>

                    <View style={{paddingHorizontal: 15}}>
                        <Text style={styles.title}>Aktif Seçimler</Text>
                        <Text style={styles.subTitle}>En çok merak ettiğinden başlayalım!</Text>

                        <ScrollView style={{marginTop: 30, height: window.height - 170}} showsVerticalScrollIndicator={false}>
                            {this.state.aktifSecimler.map((item, idx) => (
                                <TouchableOpacity key={idx} style={styles.secimCard} onPress={() => this.secimiSec(item.SecimId, item.SecimIsmi)}>
                                    <Text style={styles.secimAdiText}  >{item.SecimIsmi}</Text>
                                    <View style={{flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center'}}>
                                        <Entypo color={"#8b5e34"} size={20} name='back-in-time' />
                                        <Text style={styles.secimKalanText}>{this.KalanZamanTextiOlustur(item.KalanZamanSaat)}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                    <Image style={{position: 'absolute', bottom: 60, width: "100%", height: 100, resizeMode: 'contain'}} source={{uri: "https://i.hizliresim.com/p03faqo.png"}}/>
                </ImageBackground>

                <View style={{position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: "transparent", alignItems: 'center'}}>
                    <BannerAd
                        unitId="ca-app-pub-7764130368146320/8023991293"//!< banner4
                        size={BannerAdSize.BANNER}
                        requestOptions={{
                        requestNonPersonalizedAdsOnly: true,}}
                        onAdLoaded={() => {
                        console.log('Advert loaded');}}
                        onAdFailedToLoad={(error) => {
                        console.error('Advert failed to load: ', error);}}
                    />
                </View>
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
    topBar: {
        marginTop: 10,
        height: 60,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    title: {
        marginTop: 80,
        fontSize: 24,
        fontFamily: 'Inter-SemiBold',
        color: '#121118'
    },
    subTitle: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: '#777'
    },
    secimCard: {
        width: "100%",
        height: 100,
        paddingVertical: 4,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderColor: '#8b5e34',
        borderWidth: 1,
        backgroundColor: "#dcc9b6",
        justifyContent: 'space-around'
    },
    secimAdiText: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'Inter-Bold',
        color: '#fff'
    },
    secimKalanText: {
        marginLeft: 4,
        alignSelf: 'flex-end',
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'Inter-Bold',
        color: '#8b5e34'
    }
});