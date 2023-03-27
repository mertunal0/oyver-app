
import React, { Component } from 'react';
import {TextInput,StatusBar,View,BackHandler,ImageBackground,Pressable,StyleSheet,Dimensions,Text,TouchableOpacity,Alert,Platform,Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { FancyAlert } from 'react-native-expo-fancy-alerts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import RadioBox from '../../Components/RadioBox';
import Services from "../../Util/Service";
import TopBar from '../../Components/TopBar';
import { CommonActions } from '@react-navigation/native';

const window = Dimensions.get('window');

export default class OyVer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            secimId: global.seciliSecimId,

            seciliAdayId: -1,
            userSonOy: {OyVerilmis: false, VerilenOyId: 0, SeciliAdayId: 0, GecenSureSn: 24*60*60 + 1},
            adayList: [],

            showSureAlert: false,
            showOyVerildiAlert: false,
        };
    }

    sonOyuCek = () => {
        Services.generalServicePrivate("/Users/GetUserSonOyBySecimId", {SecimId: this.state.secimId})
        .then(oy => {
            if(oy?.OyVerilmis)
            {
                this.setState({ userSonOy: oy,
                                seciliAdayId: oy.SeciliAdayId})
            }
        })
    }

    componentDidMount = () => {
        this.sonOyuCek();
        
        Services.generalServicePrivate("/Users/GetAdayListesiBySecimId", {SecimId: this.state.secimId})
        .then(list => {
            if(list)
            {
                this.setState({adayList: list, loading: false})
            }
        })
    }

    oyuGonder = () => {
        if( 0 < this.state.seciliAdayId)
        {
            Services.generalServicePrivate("/Users/OyunuDegistir", {SecimId: this.state.secimId, VerilenOyId: -1, OncekiAdayId: -1, YeniAdayId: this.state.seciliAdayId})
            .then(res => {
                if(res.Response == 2)
                {
                    this.sonOyuCek()
                    this.setState({showOyVerildiAlert: true})
                }
            })
        }
    }

    oyuDegistir = () => {
        //!< Karar degistiyse
        if ( this.state.seciliAdayId != this.state.userSonOy.SeciliAdayId)
        {
            Services.generalServicePrivate("/Users/OyunuDegistir", {SecimId: this.state.secimId, VerilenOyId: this.state.userSonOy.VerilenOyId, OncekiAdayId: this.state.userSonOy.SeciliAdayId, YeniAdayId: this.state.seciliAdayId})
            .then(res => {
                if(res.Response == 2)
                {
                    this.sonOyuCek();
                    this.setState({showOyVerildiAlert: true}, () => global.seciliSecimIcinOyVerilmis = true)
                }
            })
        }
    }

    yeniSecimYap = (idx) => {
        //!< Eger en son karar degistirmeden itibaren 24 saat gectiyse
        let GUN_2_SN = 24 * 60 * 60;
        if(this.state.userSonOy?.GecenSureSn > GUN_2_SN)
        {
            //!< degistir
            this.setState({seciliAdayId: idx})
        }
        //!< gecmediyse ve alert kapaliysa
        else if(false == this.state.showSureAlert)
        {
            //!< alerti ac
            this.setState({showSureAlert: true})
        }
        else
        {
            //!< hicbir sey yapma
        }
    }


    render() {
        if(this.state.loading)
        {
            return(
                <View style={styles.page}>
                    <TopBar props={this.props}/>
                    <ImageBackground source={require("../../Image/bg.png")} blurRadius={Platform.OS === 'ios' ? 90 : 300} resizeMode="stretch" style={{flexDirection:"row", width:"100%", height: "100%"}}>
                        
                    </ImageBackground>
                </View>
            )
        }
        return(
            <View style={styles.page}>
                <TopBar props={this.props}/>

                <ImageBackground source={require("../../Image/bg.png")} blurRadius={Platform.OS === 'ios' ? 90 : 300} resizeMode="stretch" style={{flexDirection:"row", width:"100%", height: "100%"}}>
                    <ScrollView style={{paddingHorizontal: 15, height: window.height - 110}} showsVerticalScrollIndicator={false}>
                        <View style={{height: 60}}></View>
                        
                        { false == this.state.userSonOy?.OyVerilmis && (
                            <Text style={styles.title}>Hemen seçimini yaparak oyunu ver. Tercihin tamamen gizli kalacak.</Text>
                        )}
                        { true == this.state.userSonOy?.OyVerilmis && (
                            <Text style={styles.title}>Fikrin mi değişti? Hemen yeni tercihini belirt.</Text>
                        )}
                        
                        {this.state.adayList.map((item, idx) => (
                            <View key={idx} style={styles.subItemText}>
                                <View style={{justifyContent: 'center', flex: 2}}>
                                    <Image style={{height: 80, width: 80, borderRadius: 5, resizeMode: 'contain'}} source={{ uri: item.Fotograf ? item.Fotograf : "https://i.hizliresim.com/ai4h1o9.png"}} />
                                </View>
                                <View style={{justifyContent: 'center', alignItems: 'flex-start', flex: 6}}>
                                    <Text style={styles.adayNameText}   >{item.Isim}</Text>
                                    { item.KoalisyonAdi != "Koalisyonsuz" && (
                                        <Text style={styles.ittifakAdiText} >{item.KoalisyonAdi}</Text>
                                    )}
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Image style={{height: 20, width: 20, borderRadius: 20, resizeMode: 'contain'}} source={{ uri: item.PartiAmblem ? item.PartiAmblem : "https://i.hizliresim.com/m8oy14v.png"}} />
                                        <Text style={styles.partiAdiText}>{item.PartiAdi}</Text>
                                    </View>
                                </View>
                                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                                    <RadioBox selected={this.state.seciliAdayId == item.AdaylikId } setSelected={() => this.yeniSecimYap(item.AdaylikId)}/>
                                </View>
                            </View>
                        ))}
                        
                        <View style={{flexDirection: "row", alignItems: 'center', marginTop: 40}}>
                            <Image style={{width: 20, height: 20}} source={{uri: "https://i.hizliresim.com/lkmlz47.png"}} />
                            <Text style={{fontSize: 12, fontFamily: "Inter-Medium", marginLeft: 4}}>Dikkatli ol! Oyunu 24 saatte bir defa değiştirebilirsin.</Text>
                        </View>
                        
                        { false == this.state.userSonOy?.OyVerilmis && (
                            <TouchableOpacity onPress={() => this.oyuGonder()} style={styles.saveBtn}>
                                <Text style={styles.saveText}>Oyunu Gönder</Text>
                            </TouchableOpacity>
                        )}
                        { true == this.state.userSonOy?.OyVerilmis && (
                            <TouchableOpacity onPress={() => this.oyuDegistir()} style={styles.saveBtn}>
                                <Text style={styles.saveText}>Oyunu Değiştir</Text>
                            </TouchableOpacity>
                        )}

                        <View style={{height: Platform.OS === 'ios' ? 80 : 30}} />

                        <FancyAlert
                            icon={<View style={styles.fancyAlertIcon}><MaterialIcons name='update' size={40} color='#a9927d'/></View>}
                            visible={this.state.showSureAlert}
                            style={{ backgroundColor: 'white' }}
                        >
                            <Text style={{ fontFamily: 'Inter-Bold', fontSize: 20, color: '#000', margin: 15, marginTop: -16, marginBottom: 32 }}>ÇOK HIZLISIN</Text>
                            <Text style={{ fontFamily: 'Inter-Regular', fontSize: 18, color: '#000', margin: 15, marginTop: -16, marginBottom: 32, }}>
                                Sadece 24 saatte bir fikrini değiştirebilirsin. Henüz sürenin dolmasına {parseInt(24 - this.state.userSonOy?.GecenSureSn/3600) } saat var.
                            </Text>
                            <TouchableOpacity onPress={() => this.setState({showSureAlert: false})} style={styles.fancyAlertBtn}>
                                <Text style={styles.fancyAlertBtnText}>Tamam</Text>
                            </TouchableOpacity>
                        </FancyAlert>

                        <FancyAlert
                            icon={<View style={styles.fancyAlertIcon}><MaterialIcons name='update' size={40} color='#a9927d'/></View>}
                            visible={this.state.showOyVerildiAlert}
                            style={{ backgroundColor: 'white' }}
                        >
                            <Text style={{ fontFamily: 'Inter-Bold', fontSize: 20, color: '#000', margin: 15, marginTop: -16, marginBottom: 32 }}>HARİKA</Text>
                            <Text style={{ fontFamily: 'Inter-Regular', fontSize: 18, color: '#000', margin: 15, marginTop: -16, marginBottom: 32, }}>
                                Oyunu kullandın. Şimdi gelişmeleri takip et ve fikrin değişirse bize haber ver. Bu sırada istatistik sayfasının keyfini çıkar!
                            </Text>
                            <TouchableOpacity onPress={() => {
                                this.setState({ showOyVerildiAlert: false}, () => {
                                    global.seciliSecimIcinOyVerilmis = true
                                    const resetAction = CommonActions.reset({
                                        index: 0,
                                        key: null,
                                        routes: [{name: "StatisticsRouter", screen: 'Statistics', params: {OyVerilmis: true}}]
                                    });
                                    this.props.navigation.dispatch(resetAction); 
                                })
                                
                                }} style={[styles.fancyAlertBtn, {backgroundColor: '#a9927d'}]}>
                                <Text style={styles.fancyAlertBtnText}>Tamam</Text>
                            </TouchableOpacity>
                        </FancyAlert>

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
        marginBottom: 34,
        fontSize: 18,
        fontFamily: 'Inter-SemiBold',
        color: '#121118'
    },
    adayNameText: {
        fontSize: 20,
        color: 'rgb(18,17,21)',
        fontFamily: 'Inter-Regular'
    },
    ittifakAdiText: {
        fontSize: 16,
        color: 'rgb(18,17,21)',
        fontFamily: 'Inter-SemiBold'
    },
    partiAdiText: {
        marginLeft: 8,
        fontSize: 16,
        color: 'rgb(18,17,21)',
        fontFamily: 'Inter-SemiBold'
    },
    subItemText: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#6a7b93',
        marginVertical: 8,
    },
    saveBtn: {
        marginTop: 8,
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
    fancyAlertIcon: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 50,
        width: '100%',
    },
    fancyAlertBtn: {
        backgroundColor: '#a9927d', 
        width: 200, 
        height: 32, 
        marginBottom: 15,
        alignItems: 'center', 
        justifyContent: 'center', 
        margin: 10, 
        borderRadius: 15
    },
    fancyAlertBtnText: { 
        fontFamily: 'Inter-Regular', 
        fontSize: 16, 
        color: '#fff' 
    }
});
