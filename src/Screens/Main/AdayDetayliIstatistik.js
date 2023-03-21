
import React, { Component } from 'react';
import {View,FlatList,ImageBackground,Pressable,StyleSheet,Dimensions,Text,TouchableOpacity,Alert,Platform, RefreshControl, Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import TopBar from '../../Components/TopBar';
import Services from "../../Util/Service";
import PieChart from 'react-native-pie-chart';
import Octicons from 'react-native-vector-icons/Octicons'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { BarChart } from 'react-native-gifted-charts';
import AntIcons from 'react-native-vector-icons/AntDesign'
import { BannerAdSize, BannerAd, TestIds } from 'react-native-google-mobile-ads';


const window = Dimensions.get('window');

export default class AdayDetayliIstatistik extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            secimId: global.seciliSecimId,
            adaylikId: this.props.route.params.AdaylikId,

            adayDetayliIstatistik: {},
            chartDatasi: [],
            filtrelenmisChartDatasi: [],
            chartDatasiMinValue: 0,
            chartDatasiMaxValue: 100,
        };
    }

    componentDidMount = () => 
    {
        Services.generalServicePrivate("/Users/GetAdayDetayliIstatistik", {SecimId: this.state.secimId, AdaylikId: this.state.adaylikId})
        .then(res => {
            if(res)
            {
                var arr  = []
                var arr2 = []
                var max = 0;
                var min = 9999999999;
                for(var i = 0; i < res.HaftalikOyDegisimleri?.length; i++)
                {
                    if(max < res.HaftalikOyDegisimleri[i] + res.HaftalikOyDegisimleriFiltreli[i]) max = res.HaftalikOyDegisimleri[i] + res.HaftalikOyDegisimleriFiltreli[i]
                    if(min > res.HaftalikOyDegisimleri[i] + res.HaftalikOyDegisimleriFiltreli[i]) min = res.HaftalikOyDegisimleri[i] + res.HaftalikOyDegisimleriFiltreli[i]
                    
                    arr.push(
                            {value: res.HaftalikOyDegisimleri[i], frontColor: 'orange'},
                            {value: res.HaftalikOyDegisimleriFiltreli[i], frontColor: '#4ABFF4'},
                          )
                }

                this.setState({ chartDatasi: arr, 
                                chartDatasiMinValue: min,
                                chartDatasiMaxValue: max
                              })

                res.HaftalikOyDegisimleriFiltreli?.forEach(e => {
                    arr2.push({value: e})
                });
                this.setState({filtrelenmisChartDatasi: arr2})

                this.setState({adayDetayliIstatistik: res})
            }
        })
    }

    DegisimYuzdeTextOlustur = (yuzde) => 
    {
        var yuzde_text = "";

        if( (yuzde >= 0 && yuzde <  0.01)  || 
            (yuzde <= 0 && yuzde > -0.01)  )
        {
            yuzde_text = "0%"
        }
        else
        {
            yuzde_text = (yuzde*100).toFixed(2)

            if(yuzde < 0)   yuzde_text = "-"+yuzde_text+"%";
            else            yuzde_text =     yuzde_text+"%";
        }

        return yuzde_text;
    }

    AdayBarYuzdelikHesapla = (adayin_oyu, rakibin_oyu) => 
    {
        if(adayin_oyu  == 0) {rakibin_oyu++; adayin_oyu++; }
        if(rakibin_oyu == 0) {rakibin_oyu++; adayin_oyu++; }

        return ((adayin_oyu/(adayin_oyu+rakibin_oyu))*100).toString() +'%'
    }

    render() {
        return(
            <View style={styles.page}>
                <View style={styles.topBar}>
                    <Octicons name='chevron-left' size={32} color={'#fff'} onPress={() => this.props.navigation.goBack()} />
                    <Text style={styles.topBarText}>{global.seciliSecimAdi}</Text>
                    <Octicons name='chevron-right' size={0} color={'#fff'} onPress={() => {}} />
                </View>

                <ImageBackground source={require("../../Image/bg.png")} blurRadius={300} resizeMode="stretch" style={{flexDirection:"row", width:"100%", height: "100%"}}>
                    <ScrollView style={{paddingHorizontal: 15, height: window.height - 100}} showsVerticalScrollIndicator={false}>
                        <Text style={styles.title}>Aday Profili</Text>

                        <View style={styles.ustProfilView} >
                            <View style={{justifyContent: 'center', alignItems: 'flex-start', flex: 30}}>
                                <Image style={{height: 100, width: 100, borderRadius: 5, resizeMode: 'contain'}} source={{ uri: this.state.adayDetayliIstatistik.Fotograf ? this.state.adayDetayliIstatistik.Fotograf : "https://i.hizliresim.com/ai4h1o9.png"}} />
                            </View>
                            <View style={{justifyContent: 'flex-start', alignItems: 'flex-start', flex: 60}}>
                                <Text style={styles.adayNameText}   >{this.state.adayDetayliIstatistik.Isim}</Text>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 4}}>
                                    { this.state.adayDetayliIstatistik.DestekleyenPartiAmblemleri?.map((item, idx) => (
                                        <Image style={{width: 20, height: 20, marginHorizontal: 2}} key={idx} source={{uri: item}} />
                                    ))}
                                </View>
                                
                                <View style={styles.oyYuzdeView}>
                                    <View style={styles.oyYuzdeSubView1}>
                                        <Text style={{fontFamily: "Inter-ExtraBold", color: "#fff"}}>{this.DegisimYuzdeTextOlustur(this.state.adayDetayliIstatistik.MevcutOyYuzdesi)}</Text>
                                    </View>
                                    <View style={styles.oyYuzdeSubView2}>
                                        { this.state.adayDetayliIstatistik.DegisimYuzde <  -0.01  && (<Entypo size={18} name="triangle-down" color={"#f00"}/>)}
                                        { this.state.adayDetayliIstatistik.DegisimYuzde >   0.01  && (<Entypo size={18} name="triangle-up" color={"#00db50"}/>)}
                                        { this.state.adayDetayliIstatistik.DegisimYuzde <=  0.01  &&
                                        this.state.adayDetayliIstatistik.DegisimYuzde >=  -0.01 && (<Ionicons size={18} name="remove-outline" color={"#333"}/>)}
                                        <Text style={{fontFamily: "Inter-ExtraBold", color: this.state.adayDetayliIstatistik.DegisimYuzde > 0.01 ? "#00db50" : this.state.adayDetayliIstatistik.DegisimYuzde < -0.01 ? "#f00" : "#333"}}>{this.DegisimYuzdeTextOlustur(this.state.adayDetayliIstatistik.DegisimYuzde)}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>


                        <View style={{backgroundColor: "transparent", alignItems: 'center'}}>
                            <BannerAd
                                unitId="ca-app-pub-7764130368146320/7086050815"//!< banner
                                size={BannerAdSize.FULL_BANNER}
                                requestOptions={{
                                requestNonPersonalizedAdsOnly: true,}}
                                onAdLoaded={() => {
                                console.log('Advert loaded');}}
                                onAdFailedToLoad={(error) => {
                                console.error('Advert failed to load: ', error);}}
                            />
                        </View>

                        <Text style={styles.title}>Bugünkü Rekabet Performansı</Text>
                        <View>
                            {this.state.adayDetayliIstatistik?.Rakipler?.map((item, idx) => (
                                <View key={idx} style={styles.subItemView}>
                                    <View style={styles.subItemRowView} >
                                        <View style={{justifyContent: 'center', alignItems: 'center', flex: 20}}>
                                            <Text style={{fontSize: 24, fontFamily: 'Inter-ExtraBold'}}>V.S.</Text>
                                        </View>
                                        <View style={{justifyContent: 'center', alignItems: 'flex-end', flex: 55, paddingHorizontal: 8}}>
                                            <Text style={styles.adayNameText}>{item.Isim}</Text>
                                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 4}}>
                                                { item.DestekleyenPartiAmblemleri?.map((item, idx) => (
                                                    <Image style={{width: 20, height: 20, marginHorizontal: 2}} key={idx} source={{uri: item}} />
                                                ))}
                                            </View>
                                            <Text style={{marginTop: 8, color: "#333"}}>{this.DegisimYuzdeTextOlustur(item.MevcutOyYuzdesi)}</Text>
                                        </View>

                                        <View style={{justifyContent: 'center', alignItems: 'flex-start', flex: 25, paddingBottom: 1}}>
                                            <Image style={{height: 100, width: 100, borderRadius: 10, resizeMode: 'contain'}} source={{ uri: item.Fotograf ? item.Fotograf : "https://i.hizliresim.com/ai4h1o9.png"}} />
                                        </View>
                                    </View>

                                    <View style={styles.subItemRowView2}>
                                        <View style={[styles.barView1, {
                                            backgroundColor: '#4ABFF4', 
                                            width: this.AdayBarYuzdelikHesapla(item.AdayinBugunRakiptenAldigiOy, item.RakibinBugunAdaydanAldigiOy)
                                        }]}>
                                            <AntIcons style={{marginHorizontal: 4}} color="white" name='like2' />
                                            <Text style={styles.smallText}>{item.AdayinBugunRakiptenAldigiOy} oy kazandı.</Text>
                                        </View>
                                        <View style={[styles.barView2, {
                                            backgroundColor: 'red', 
                                            width: this.AdayBarYuzdelikHesapla(item.RakibinBugunAdaydanAldigiOy, item.AdayinBugunRakiptenAldigiOy)
                                        }]}>
                                            <Text style={[styles.smallText, {textAlign: 'right'}]}>{item.RakibinBugunAdaydanAldigiOy} oy kaybetti.</Text>
                                            <AntIcons style={{marginHorizontal: 4}} color="white" name='dislike2' />
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>

                        <Text style={styles.title}>Son 7 Gün Oy Değişimi</Text>
                        <View style={{marginTop: 8}}>
                            <BarChart
                                maxValue={this.state.chartDatasiMaxValue}
                                minValue={this.state.chartDatasiMinValue}
                                yAxisIndicesHeight={100}
                                height={100}
                                width = {260}
                                rotateLabel
                                stepValue={ (this.state.chartDatasiMaxValue) / 4 }
                                barWidth={12}
                                spacing={3}
                                noOfSections={4}
                                barBorderRadius={20}
                                data={this.state.chartDatasi}
                                //data ={this.state.chartDatasi}
                                //minValue={this.state.chartDatasiMinValue}
                                //maxValue={this.state.chartDatasiMaxValue}
                                //height={100}
                                //showVerticalLines={false}
                                //spacing={45}
                                //color1="#a9927d"
                                //color2="#00f"
                                //dataPointsColor1="#a9927d"
                                //dataPointsColor2="#00f"
                                //noOfSections={ 5 }
                                //stepValue={ (this.state.chartDatasiMaxValue) / 5 }
                                //adjustToWidth={true}
                                //thickness={3}
                            />
                        </View>

                    </ScrollView>
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
        marginTop: 20,
        marginBottom: 8,
        fontSize: 18,
        fontFamily: 'Inter-SemiBold',
        color: '#121118'
    },
    adayNameText: {
        fontSize: 17,
        color: 'rgb(18,17,21)',
        fontFamily: 'Inter-SemiBold'
    },
    ustProfilView: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingVertical: 12,
    },
    topBar: {
        backgroundColor: "#a9927d",
        height: 60,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 20,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    topBarText: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'Inter-SemiBold'
    },
    oyYuzdeView: {
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignItems: "center", 
        marginTop: 8,
    },
    oyYuzdeSubView1: {
        paddingVertical: 0,
        paddingHorizontal: 6,
        backgroundColor: '#a9927d',
        borderBottomColor: '#836850',
        borderBottomWidth: 2,
        borderLeftColor: '#836850',
        borderLeftWidth: 2,
        borderTopColor: '#836850',
        borderTopWidth: 2,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    oyYuzdeSubView2: {
        paddingVertical: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start', 
        alignItems: "center", 
        paddingHorizontal: 4,
        borderBottomColor: '#836850',
        borderBottomWidth: 2,
        borderRightColor: '#836850',
        borderRightWidth: 2,
        borderTopColor: '#836850',
        borderTopWidth: 2,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    subItemView: {
        borderColor: '#a9927d',
        borderTopWidth: 1,
        marginVertical: 12,
        paddingVertical: 6,
        paddingRight: 6,
        borderRadius: 4,
    },
    subItemRowView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    subItemRowView2: {
        marginTop: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    barView1: {
        flexDirection: 'row',
        height: 16,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        alignItems: 'center',
    },
    barView2: {
        flexDirection: 'row',
        height: 16,
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    smallText: {
        color: '#fff',
        fontSize: 12,
    }
});
