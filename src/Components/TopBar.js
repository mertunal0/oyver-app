import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, {useRef, memo} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Services from '../Util/Service'
import { Icon } from 'react-native-elements';
import Octicons from "react-native-vector-icons/Octicons"
import { CommonActions } from '@react-navigation/native';


const TopBar = ({
    props
}) => {
    const rbSheet = useRef();

    backToSecimSecimi = () => {
        const resetAction = CommonActions.reset({
            index: 0,
            key: null,
            routes: [{name: "SecimSecimi", screen: 'SecimSecimi'}]
        });
        props.navigation.dispatch(resetAction); 
    }

    return (
        <View style={styles.topBar}>
            <Image style={{height: 50, width: 50, borderRadius: 5, resizeMode: 'contain'}} source={{ uri: "https://i.hizliresim.com/g8t1gja.png"}}/>
            <Text style={styles.topBarText}>{global.seciliSecimAdi}</Text>
            <Octicons name='chevron-right' size={32} color={'#fff'} onPress={() => backToSecimSecimi()} />
        </View>
    )
}

export default TopBar

const styles = StyleSheet.create({
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
})