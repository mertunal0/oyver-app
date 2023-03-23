
import React, { Component } from 'react';
import {TextInput,StatusBar,View,BackHandler,ImageBackground,Pressable,StyleSheet,Dimensions,Text,TouchableOpacity,Alert,Platform} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import AsyncBus from '../../Util/AsyncBus';
import Services from "../../Util/Service";

const window = Dimensions.get('window');

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            surname: "",

            deviceId: "",
            isLogin: 0,
        };
    }


    onRegisterPress = () => {
        DeviceInfo.getUniqueId().then(deviceId => {
            Services.generalServicePrivate("/Users/TokenControl", {EmailAddress: deviceId}).then((res) => {
                if (res?.UserId > 0) {
                    this.setState({isLogin: 1});
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
        <ImageBackground style={styles.page} source={require('../../Image/bg.png')}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>İlk defa mı geliyorsun? Hadi başlayalım.</Text>
                <Text style={styles.subtitle}>Hiçbir bilgi zorunlu değil. İstersen boş bırakabilirsin!</Text>
                <Text style={[styles.label, styles.label1]}>İsim</Text>
                <TextInput
                    style={styles.input}
                    value={this.state.name}
                    onChangeText={(text) => this.setState({name: text})}
                    underlineColorAndroid={'transparent'}
                />
                <Text style={[styles.label, styles.label2]}>Soy İsim</Text>
                <View>
                    <TextInput
                        style={styles.input}
                        value={this.state.surname}
                        onChangeText={(text) => this.setState({surname: text})}
                        underlineColorAndroid={'white'}
                    />
                </View>

                <TouchableOpacity style={styles.loginButton} onPress={() => this.onRegisterPress()}>
                    <Text style={styles.loginButtonText}>Başla</Text>
                </TouchableOpacity>

            </ScrollView>
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
        marginTop: 100,
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
});
