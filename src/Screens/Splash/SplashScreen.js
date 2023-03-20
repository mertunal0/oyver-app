import React, { Component } from 'react';
import { Image,View,Dimensions } from 'react-native';
import Services from "../../Util/Service";
import AsyncBus from "../../Util/AsyncBus";
import DeviceInfo from 'react-native-device-info';
import mobileAds from 'react-native-google-mobile-ads';

const window = Dimensions.get('window');

export default class Splash extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLogin: 0,
            seciliSecimId: -1,
        };
    }

    componentDidMount = () => {
        mobileAds().initialize()
        .then(adapterStatuses => {
        // Initialization complete!
        });

        DeviceInfo.getUniqueId().then(deviceid => {
            Services.generalServicePrivate("/Users/TokenControl", {EmailAddress: deviceid}).then((res) => {
                if (res?.UserId > 0) {
                    this.setState({isLogin: 1});
                    AsyncBus.SetLocalStorage("UserId", res.UserId.toString());
                }
            })
            .then(() => {
                setTimeout( () => {
                    //!< Daha once giris yapildiysa
                    if(this.state.isLogin == 1)
                    {
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
                    //!< Yapilmadiysa logine devam et
                    else
                    {
                        this.props.navigation.navigate("LoginRouter")
                    }
                }, 1000)
            })
        })
    }

    render() {
        return (
            <View style={{backgroundColor:'#f00',width:window.width,height:window.height}}>
                <Image style={{width: "100%", height: "100%", resizeMode: "stretch"}} source={require('../../Image/splash.png')}/>
            </View>
            )
    }
}
