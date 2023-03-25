
import React, { Component } from 'react';
import {FlatList,StatusBar,View,BackHandler,ImageBackground,Pressable,StyleSheet,Dimensions,Text,TouchableOpacity,RefreshControl,Platform,Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { FancyAlert } from 'react-native-expo-fancy-alerts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import RadioBox from '../../Components/RadioBox';
import Services from "../../Util/Service";
import TopBar from '../../Components/TopBar';
import Octicons from 'react-native-vector-icons/Octicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'

const window = Dimensions.get('window');

export default class AnketPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anketId:            this.props.route.params.AnketId,
            anketSorusu:        this.props.route.params.AnketSorusu,
            anketFotosu:        this.props.route.params.AnketFotograf,
            sikFotograflari:    this.props.route.params.SikFotograflari,
            anketPopularite:    this.props.route.params.AnketPopularite,
            kalanZamanSaat:     this.props.route.params.KalanZaman,

            loading: true,
            refreshing: false,
            anketDetayi: {},
            
            seciliSikId: -1,
            oyVerildi: false,
        };
    }

    KalanZamanTextiOlustur = (kalanSaat) => 
    {
        var gun     = (kalanSaat / 24).toFixed();
        var saat    = kalanSaat % 24;

        return (gun.toString() + " gün " + saat.toString() + " saat")
    }

    anketDetayCek = () => {
        Services.generalServicePrivate("/Users/GetAnketDetaylarById", {AnketId: this.state.anketId})
        .then(res => {
            if(res)
            {
                this.setState({ anketDetayi: res, 
                                loading: false, 
                                refreshing: false,
                                oyVerildi: res.KullanicininSectigiSik > 0 ? true : false,
                                seciliSikId: res.KullanicininSectigiSik
                            })
            }
        })
    }


    componentDidMount = () => {     
        this.anketDetayCek()
    }

    oyuGonder = () => {
        if( 0 < this.state.seciliSikId)
        {
            Services.generalServicePrivate("/Users/AnketOyuVer", {AnketId: this.state.anketId, VerilenSikId: this.state.seciliSikId})
            .then(res => {
                if(res.Response == 2)
                {
                    this.anketDetayCek()
                    this.setState({oyVerildi: true})
                }
            })
        }
    }

    handleRefresh = () => {
        this.setState({refreshing: true})
        this.anketDetayCek()
    }


    render() {
        if(this.state.loading)
        {
            return(
                <View style={styles.page}>
                    <View style={styles.topBar}>
                        <Octicons name='chevron-left' size={32} color={'#fff'} onPress={() => this.props.navigation.goBack()} />
                        <Text style={styles.topBarText}>{global.seciliSecimAdi}</Text>
                        <Octicons name='chevron-right' size={0} color={'#fff'} onPress={() => {}} />
                    </View>
                    <ImageBackground source={require("../../Image/bg.png")} blurRadius={300} resizeMode="stretch" style={{flexDirection:"row", width:"100%", height: "100%"}}>
                        
                    </ImageBackground>
                </View>
            )
        }
        return(
            <View style={styles.page}>
                <View style={styles.topBar}>
                    <Octicons name='chevron-left' size={32} color={'#fff'} onPress={() => this.props.navigation.goBack()} />
                    <Text style={styles.topBarText}>{global.seciliSecimAdi}</Text>
                    <Octicons name='chevron-right' size={0} color={'#fff'} onPress={() => {}} />
                </View>

                <ImageBackground source={require("../../Image/bg.png")} blurRadius={300} resizeMode="stretch" style={{flexDirection:"row", width:"100%", height: "100%"}}>

                    <FlatList
                        refreshControl={<RefreshControl onRefresh={() => this.handleRefresh()} refreshing={this.state.refreshing}/>}
                        style={{
                            height: window.height - 100,
                            paddingHorizontal: 15,
                            flex: 1,
                            paddingTop: 20,
                            backgroundColor: 'transparent'
                        }}
                        data={this.state.anketDetayi.AnketSiklari?.length > 0 ? this.state.anketDetayi.AnketSiklari : []}
                        keyExtractor={item => item.Id}
                        renderItem={({ item }) => (
                            <>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16}}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        {item.Fotograf && (<Image style={{width: 40, height: 40, marginRight: 12}} source={{uri: item.Fotograf}}/> )}
                                        <Text style={styles.sikText}>{item.Text}</Text>
                                    </View>
                                    
                                    {this.state.oyVerildi == false && (
                                        <RadioBox selected={this.state.seciliSikId == item.Id } setSelected={() => this.setState({seciliSikId: item.Id})} />
                                    )}
                                </View>
                                {this.state.oyVerildi && (
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <View style={{flexDirection: 'row', width: '80%', height: 15, alignItems: 'center', marginTop: 8}}>
                                            <View style={{width: item.TercihOrani == 0 ? '50%' : item.TercihOrani * 100+'%', borderRadius: 20, height: 15, backgroundColor: '#8b5e34', justifyContent: 'center'}}>
                                                <View style={{backgroundColor: '#fff', borderRadius: 20, width: 12, height: 12, marginLeft: 2, justifyContent: 'center', alignItems: 'center'}}>
                                                    <Image style={{width: 10, height: 10}} source={{uri: "https://i.hizliresim.com/lkmlz47.png"}} /> 
                                                </View>
                                            </View>
                                            <Text style={{fontSize: 14, marginTop: -2, marginLeft: 4}}>%{ ((item.TercihOrani * 100) % 1 != 0) ? (item.TercihOrani * 100).toFixed(2) : (item.TercihOrani * 100)}</Text>
                                        </View>
                                    </View>
                                )}
                            </>
                        )}
                        ListHeaderComponent={(
                            <View style={{borderBottomColor: '#ccc', borderBottomWidth: 1, paddingBottom: 8, marginBottom: 8}}>
                                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                                    <View style={{flexDirection: 'row', marginLeft: 8}}>
                                        <AntDesign color={"#AB20FD"} size={20} name='star' />
                                        <Text style={styles.popularityText}>{this.state.anketPopularite}</Text>
                                    </View>
                                    
                                    <View style={{flexDirection: 'row', marginRight: 8}}>
                                        <Entypo color={"#8b5e34"} size={20} name='back-in-time' />
                                        <Text style={styles.dateText}>{this.KalanZamanTextiOlustur(this.state.kalanZamanSaat)}</Text>
                                    </View>
                                </View>

                                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 16, width: '100%'}}>
                                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: '95%'}}>
                                        <View style={{width: this.state.anketFotosu ? '50%' : '100%', marginLeft: 8, justifyContent: 'center'}}>
                                            <Text style={styles.sikText}>{this.state.anketSorusu}</Text>
                                        </View>

                                        <View>
                                        {this.state.anketFotosu && (
                                            <View style={{width: '50%', flexDirection: 'row', marginRight: 8}}>
                                                <Image style={{width: 80 , height: 80 }} source={{ uri: this.state.anketFotosu}} />
                                            </View>
                                        )}
                                        </View>
                                    </View>

                                    <View style={{width: '5%', alignItems: 'center', justifyContent: 'center'}}>
                                        <Octicons name='chevron-right' size={0} color={'#8b5e34'} onPress={() => {}} />
                                    </View>
                                </View>

                            </View>
                        )}
                        ListFooterComponent={(
                            this.state.oyVerildi == false && (
                            <View style={{marginTop: 8}}>
                                <TouchableOpacity onPress={() => this.oyuGonder()} style={styles.saveBtn}>
                                    <Text style={styles.saveText}>Oyunu Gönder</Text>
                                </TouchableOpacity>
                            </View>)
                        )}
                    />

                    <View style={{height: 30}} />

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
        marginBottom: 34,
        fontSize: 18,
        fontFamily: 'Inter-SemiBold',
        color: '#121118'
    },
    sikText: {
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        color: '#121118'
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
    dateText: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: '#6A7B93',
        marginLeft: 2,
    },
    popularityText: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: '#AB20FD',
        marginLeft: 2,
    },
    saveBtn: {
        marginTop: 16,
        height: 36,
        width: '100%',
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
