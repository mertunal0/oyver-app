
import React, { Component } from 'react';
import {View,FlatList,ImageBackground,Pressable,StyleSheet,Dimensions,Text,TouchableOpacity,Alert,Platform, RefreshControl, Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import TopBar from '../../Components/TopBar';
import Services from "../../Util/Service";
import PieChart from 'react-native-pie-chart';
import Octicons from 'react-native-vector-icons/Octicons'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { BannerAdSize, BannerAd, TestIds } from 'react-native-google-mobile-ads';

const window = Dimensions.get('window');

export default class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            secimId: global.seciliSecimId,
            oyVerilmis: false,

            detailedDurumList: [], //!< AdaylikId, DegisimYuzde, Fotograf, Isim, KoalisyonAdi, MevcutOySayisi, MevcutOyYuzdesi, PartiAdi, PartiAmblem
            renkler: ['#F44336','#ce7e00','#8fce00', '#2986cc', '#16537e', '#6a329f', '#c90076', '#660000', '#783f04', '#7f6000', '#274e13', '#0c343d', '#073763', '#20124d', '#741b47'],
            aktifRenkler: []
        };
    }

    componentDidMount = () => 
    {
        this.getGenelSecimDetaylari();
    }

    getGenelSecimDetaylari = () => 
    {
        Services.generalServicePrivate("/Users/GetGenelMevcutDurumBySecimId", {SecimId: this.state.secimId})
        .then(list => {
            this.setState({oyVerilmis: this.props.route.params?.OyVerilmis ? this.props.route.params.OyVerilmis : global.seciliSecimIcinOyVerilmis})
            if(list)
            {   
                var arr = []
                var arr2 = []
                for(let i = 0; i < list.length; i++)
                {
                    arr .push(this.state.renkler[i])
                    arr2.push(list[i].MevcutOySayisi)
                }
                
                this.setState({ detailedDurumList: list, 
                                aktifChartElemanlari: arr2,
                                aktifRenkler: arr}, () => this.setState({loading: false}))
            }
        })
    }

    handleRefresh = () => 
    {
        this.setState({refreshing: true})
        this.getGenelSecimDetaylari()
        this.setState({refreshing: false})
    }

    onEndReached = () =>  
    {
    }

    DegisimYuzdeTextOlustur = (yuzde) => 
    {
        var yuzde_text = "";

        if( (yuzde >= 0 && yuzde <  0.01)  || 
            (yuzde <= 0 && yuzde > -0.01)  )
        {
            yuzde_text = "%0"
        }
        else
        {
            yuzde_text = (yuzde*100).toFixed(2)

            if(yuzde < 0)   yuzde_text = "%"+"-"+yuzde_text;
            else            yuzde_text =     "%"+yuzde_text;
        }

        return yuzde_text;
    }


    render() {
        if(this.state.oyVerilmis == false)
        {
            return(
                <View style={styles.page}>
                    <TopBar props={this.props}/>

                    <ImageBackground source={require("../../Image/bg.png")} blurRadius={Platform.OS === 'ios' ? 90 : 300} resizeMode="stretch" style={{width:"100%", height: "100%", alignItems: 'flex-start'}}>
                        <View style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                            <View style={{width: '80%', flexDirection: "row", justifyContent: 'flex-start', alignItems: 'center', marginTop: window.height / 4}}>
                                <Image style={{width: 20, height: 20}} source={{uri: "https://i.hizliresim.com/lkmlz47.png"}} />
                                <Text style={{fontSize: 12, fontFamily: "Inter-Medium", marginLeft: 4}}>Tüm oylar gizli kalır.</Text>
                            </View>
                        </View>
                        <View style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                            <View style={{width: '80%', alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={styles.title}>Bu seçimin istatistiklerini görebilmek için Oy Ver.</Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("OyverRouter")} style={styles.saveBtn}>
                                    <Text style={styles.saveText}>Oy Ver</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            )
        }
        else
        {
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
                                paddingHorizontal: 15,
                                backgroundColor: 'transparent',
                                height: window.height - 170
                            }}
                            data={this.state.detailedDurumList.length > 0 ? this.state.detailedDurumList : []}
                            keyExtractor={item => item.Isim}
                            renderItem={({ item, idx }) => (
                                <TouchableOpacity key={idx} style={styles.subItemText} onPress={() => this.props.navigation.navigate("AdayDetayliIstatistik", {AdaylikId: item.AdaylikId})}>
                                    <View style={{justifyContent: 'center', alignItems: 'flex-start', flex: 15}}>
                                        <Image style={{height: 50, width: 50, borderRadius: 5, resizeMode: 'contain'}} source={{ uri: item.Fotograf ? item.Fotograf : "https://i.hizliresim.com/ai4h1o9.png"}} />
                                    </View>
                                    <View style={{justifyContent: 'center', alignItems: 'flex-start', flex: 58}}>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Image style={{height: 20, width: 20, borderRadius: 20, resizeMode: 'contain'}} source={{ uri: item.PartiAmblem ? item.PartiAmblem : "https://i.hizliresim.com/m8oy14v.png"}} />
                                            <Text style={styles.adayNameText}   >{item.Isim}</Text>
                                        </View>
                                        { item.KoalisyonAdi != "Koalisyonsuz" && (
                                            <Text style={styles.ittifakAdiText} >{item.KoalisyonAdi}</Text>
                                        )}
                                    </View>
                                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', flex: 22}}>
                                        { item.DegisimYuzde < -0.01 && (<Entypo size={24} name="triangle-down" color={"#f00"}/>)}
                                        { item.DegisimYuzde > 0.01 && (<Entypo size={24} name="triangle-up" color={"#009900"}/>)}
                                        { item.DegisimYuzde <= 0.01  &&
                                        item.DegisimYuzde >= -0.01 && (<Ionicons size={24} name="remove-outline" color={"#333"}/>)}
                                        <Text style={{color: item.DegisimYuzde > 0.01 ? "#009900" : item.DegisimYuzde < -0.01 ? "#f00" : "#333"}}>{this.DegisimYuzdeTextOlustur(item.DegisimYuzde)}</Text>
                                    </View>
                                    <View style={{justifyContent: 'center', alignItems: 'flex-end', flex: 5}}>
                                        <Octicons name='chevron-right' size={24} color={'#8b5e34'} />
                                    </View>
                                </TouchableOpacity>
                            )}
                            ListFooterComponent={(
                                <View style={{height: Platform.OS === 'ios' ? 60 : 10}} />
                            )}
                            ListHeaderComponent={(
                                <View>
                                    <View style={{height: 40}} />
                                    <Text style={styles.title}>Genel Oy Dağılımı</Text>
                                    
                                    <View style={{marginTop: 8}}>
                                        { !this.state.loading && (
                                            <View style={styles.subView1}>
                                                <PieChart
                                                    widthAndHeight={140}
                                                    series={this.state.aktifChartElemanlari}
                                                    sliceColor={this.state.aktifRenkler}
                                                />
                                                <View>
                                                    { this.state.detailedDurumList.map((item, idx) => (
                                                        <View style={styles.subView2} key={idx}>
                                                            <Text style={styles.adayIsmiText}>{item.Isim}</Text>
                                                            <Text style={[styles.yuzdelikText, {color: this.state.aktifRenkler[idx]}]}>%{(item.MevcutOyYuzdesi * 100).toFixed(2)}</Text>
                                                        </View>
                                                    ))}
                                                </View>
                                            </View>
                                        )}
                                    </View>

                                    <View style={{height: 40}} />

                                    <Text style={styles.title}>Adaylar ve Günlük Oy Değişimi</Text>
                                </View>
                            )}
                        />
                    </ImageBackground>

                    <View style={{position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: "transparent", alignItems: 'center'}}>
                        <BannerAd
                            unitId= {Platform.OS === 'ios' ? "ca-app-pub-7764130368146320/2373677975" : "ca-app-pub-7764130368146320/2646158646"}//!< banner2
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
}



const styles = StyleSheet.create({
    page: {
        backgroundColor: "#a9927d",
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 40 : 0,
    },
    title: {
        marginBottom: 8,
        fontSize: 18,
        fontFamily: 'Inter-SemiBold',
        color: '#121118'
    },
    adayIsmiText: {
        fontSize: 14,
        color: 'rgb(18,17,21)',
        fontFamily: 'Inter-Regular'
    },
    yuzdelikText: {
        marginLeft: 8,
        fontSize: 14,
        color: 'rgb(18,17,21)',
        fontFamily: 'Inter-SemiBold'
    },
    subView1: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        width: "100%",
    },
    subView2: {
        padding: 4,
        flexDirection: 'row', 
        justifyContent: 'space-between',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    adayNameText: {
        marginLeft: 8,
        fontSize: 16,
        color: 'rgb(18,17,21)',
        fontFamily: 'Inter-Regular'
    },
    ittifakAdiText: {
        marginLeft: 28,
        fontSize: 14,
        color: 'rgb(18,17,21)',
        fontFamily: 'Inter-SemiBold'
    },
    partiAdiText: {
        marginLeft: 8,
        fontSize: 14,
        color: 'rgb(18,17,21)',
        fontFamily: 'Inter-SemiBold'
    },
    subItemText: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderColor: '#a9927d',
        borderWidth: 1,
        marginVertical: 8,
        paddingRight: 6,
        borderRadius: 6,
    },
    saveBtn: {
        marginTop: 8,
        height: 36,
        width: '50%',
        backgroundColor: '#8b5e34',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    saveText: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'Inter-Medium'
    },
});
