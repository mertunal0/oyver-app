
import React, { Component } from 'react';
import {TextInput,StatusBar,View,BackHandler,ImageBackground,Pressable,StyleSheet,Dimensions,Text,TouchableOpacity,Alert,Platform} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import AsyncBus from '../../Util/AsyncBus';
import Services from "../../Util/Service";
import RadioBox from '../../Components/RadioBox';
import { FancyAlert } from 'react-native-expo-fancy-alerts';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'

const window = Dimensions.get('window');

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            surname: "",

            deviceId: "",
            isLogin: 0,

            privacyPolicyAccepted: false,
            showPolicyAlert: false,

            isLoading: false,
        };
    }


    onRegisterPress = () => {
        if(false == this.state.privacyPolicyAccepted)
        {
            this.setState({showPolicyAlert: true})
            return
        }
        if(true == this.state.isLoading)
        {
            return
        }

        this.setState({isLoading: true})

        DeviceInfo.getUniqueId().then(deviceId => {
            Services.generalServicePrivate("/Users/TokenControl", {EmailAddress: deviceId}).then((res) => {
                if (res?.UserId > 0) {
                    this.setState({isLogin: 1, isLoading: false});
                    AsyncBus.SetLocalStorage("UserId", res.UserId.toString());

                    //!< Daha onceden secilen bir secim id'si var mi?
                    AsyncBus.GetLocalStorage("SeciliSecimId").then(id => {
                        //!< Varsa setleyelim ve direkt main router'a yonlendirelim
                        if(parseInt(id) > 0)
                        {
                            AsyncBus.GetLocalStorage("SeciliSecimAdi").then(ad => {
                                this.setState({seciliSecimAdi: ad})
                                global.seciliSecimAdi = ad

                                this.setState({seciliSecimId: parseInt(id)})
                                global.seciliSecimId    = parseInt(id)

                                this.props.navigation.navigate("MainRouter")
                            })
                        }
                        //!< Yoksa SecimSecimi ekranina yonlendirelim
                        else
                        {
                            this.props.navigation.navigate("SecimSecimi")
                        }
                    });
                }
                else
                {
                    Services.generalService("/Users/NewUser", { Name: this.state.name, Surname: this.state.surname, DeviceId: deviceId}).then((res) => {
                        this.setState({isLoading: false});
                        if (res.UserId > 0) {
                            AsyncBus.SetLocalStorage("IsLogin","1");
                            AsyncBus.SetLocalStorage("IsIntro","1");
                            AsyncBus.SetLocalStorage("Token", res.Token)
                            AsyncBus.SetLocalStorage("UserId", res.UserId.toString())
                            AsyncBus.SetLocalStorage("DeviceId", this.state.deviceId)
            
                            const resetAction = CommonActions.reset({
                                index: 0,
                                key: null,
                                routes: [{name: "SecimSecimi", screen: 'SecimSecimi'}]
                            });
                            this.props.navigation.dispatch(resetAction); 
                        }
                    })
                }
                
            })
        } )
        
    }

    render() {
        return(
        <ImageBackground blurRadius={Platform.OS === 'ios' ? 90 : 300} style={styles.page} source={require('../../Image/bg.png')}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>İlk defa mı geliyorsun? Hadi başlayalım.</Text>
                

                <View style={{marginTop: 40, flexDirection: 'row', alignItems: 'center'}}>
                    <RadioBox selected={this.state.privacyPolicyAccepted == true } setSelected={() => this.setState({privacyPolicyAccepted: !this.state.privacyPolicyAccepted})} />
                    <Text style={{marginLeft: 4, fontSize: 16, color: "#000", fontFamily: 'Inter-Regular'}}>Oy Ver </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("PrivacyPolicy")}>
                        <Text style={{fontSize: 16, color: "#8b5e34", fontFamily: 'Inter-Regular'}}>Gizlilik Politikası</Text>
                    </TouchableOpacity>
                    <Text style={{fontSize: 16, color: "#000", fontFamily: 'Inter-Regular'}}>'nı onaylıyorum.</Text>
                </View>

                <TouchableOpacity style={styles.loginButton} onPress={() => this.onRegisterPress()}>
                    {!this.state.isLoading ? 
                        <Text style={styles.loginButtonText}>Başla</Text>
                        :
                        <Ionicons size={28} color={"#fff"} name='ios-refresh'/>
                    }
                    
                </TouchableOpacity>

            </ScrollView>


            <FancyAlert
                icon={<View style={styles.fancyAlertIcon}><FontAwesome5 name='info' size={32} color='#a9927d'/></View>}
                visible={this.state.showPolicyAlert}
                style={{ backgroundColor: 'white' }}
            >
                <Text style={{ fontFamily: 'Inter-Regular', fontSize: 18, color: '#000', margin: 15, marginTop: -16, marginBottom: 32, }}>
                    Devam etmeden önce gizlilik politikasını onaylaman gerekir.
                </Text>
                <TouchableOpacity onPress={() => this.setState({showPolicyAlert: false})} style={styles.fancyAlertBtn}>
                    <Text style={styles.fancyAlertBtnText}>Tamam</Text>
                </TouchableOpacity>
            </FancyAlert>
        </ImageBackground>
        )
    }
}



const styles = StyleSheet.create({
    page: {
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: '#333',
        paddingTop: Platform.OS === 'ios' ? 40 : 0,
    },
    title: {
        marginTop: 34,
        fontSize: 25,
        fontFamily: 'Inter-SemiBold',
        color: '#121118'
    },
    subtitle: {
        marginTop: 30,
        fontSize: 18,
        fontWeight: '400',
        fontFamily: 'Inter-Regular',
        color: '#3B4963'
    },
    label: {
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        color: '#3B4963'
    },
    label1: {
        marginTop: 40,
    },
    label2: {
        marginTop: 15
    },
    input: {
        marginTop: 10,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#6A7B93',
        fontSize: 18,
        fontFamily: 'Inter-Medium',
        paddingRight: 60,
        color: '#000',
    },
    loginButton: {
        marginTop: 20,
        alignSelf: 'stretch',
        backgroundColor: '#8b5e34',
        height: 60,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginButtonText: {
        fontSize: 18,
        fontFamily: 'Inter-Bold',
        color: '#fff'
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
