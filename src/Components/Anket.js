import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, {useRef, memo} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Services from '../Util/Service'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Octicons from 'react-native-vector-icons/Octicons'

const Anket = ({
    anketId,
    anketSorusu,
    popularite,
    kalanZamanSaat,
    anketFotograf,
    sikFotograflari = [],
    goToAnket = () => {},
    props,
}) => {
    const rbSheet = useRef();


    KalanZamanTextiOlustur = (kalanSaat) => 
    {
        var gun     = (kalanSaat / 24).toFixed();
        var saat    = kalanSaat % 24;

        return (gun.toString() + " gün " + saat.toString() + " saat")
    }
    
    return (
        <TouchableOpacity style={styles.page} onPress={() => goToAnket()}>
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <View style={{flexDirection: 'row', marginLeft: 8}}>
                    <AntDesign color={"#AB20FD"} size={20} name='star' />
                    <Text style={styles.popularityText}>{popularite}</Text>
                </View>
                
                <View style={{flexDirection: 'row', marginRight: 8}}>
                    <Entypo color={"#8b5e34"} size={20} name='back-in-time' />
                    <Text style={styles.dateText}>{KalanZamanTextiOlustur(kalanZamanSaat)}</Text>
                </View>
            </View>

            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8, width: '100%'}}>
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: '95%'}}>
                    <View style={{width: anketFotograf ? '50%' : '100%', marginLeft: 8, justifyContent: 'center'}}>
                        <Text style={styles.postText}>{anketSorusu}</Text>
                        {sikFotograflari.length > 0 && (
                            <View style={{flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginTop: 8}}>
                                {sikFotograflari.map((item, idx) => (
                                    <Image key={idx} style={{width: 40, height: 40, marginLeft: 8}} source={{uri: item}} />
                                ))}
                            </View>
                        )}
                    </View>

                    <View>
                    {anketFotograf && (
                        <View style={{width: '50%', flexDirection: 'row', marginRight: 8}}>
                            <Image style={{width: 80 , height: 80 }} source={{ uri: anketFotograf}} />
                        </View>
                    )}
                    </View>
                </View>

                <View style={{width: '5%', alignItems: 'center', justifyContent: 'center'}}>
                    <Octicons name='chevron-right' size={32} color={'#8b5e34'} onPress={() => goToAnket()} />
                </View>
                
            </View>
        </TouchableOpacity >
    )
}

export default Anket

const styles = StyleSheet.create({
    page: {
        borderTopColor: '#ccc',
        borderTopWidth: 1,
        flex: 1,
        marginTop: 15,
        paddingVertical: 8,
    },
    dateText: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: '#6A7B93',
        marginLeft: 2,
    },
    postText: {
        fontSize: 18,
        color: '#121118',
        fontFamily: 'Inter-Regular',
    },
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    popularityText: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: '#AB20FD',
        marginLeft: 2,
    }
})