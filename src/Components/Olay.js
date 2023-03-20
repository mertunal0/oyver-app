import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, {useRef, memo} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Services from '../Util/Service'
import { Icon } from 'react-native-elements';

const Olay = ({
    olayId,
    text,
    createdAt,
    props,
}) => {
    const rbSheet = useRef();

    var     dateText    = 'Şimdi'

    if(createdAt > (60*60*24*30*12))
    {
      dateText = parseInt(createdAt / (60*60*24*30*12)) + " yıl önce"
    }
    else if(createdAt > 60*60*24*30)
    {
      dateText = parseInt(createdAt / (60*60*24*30)) + " ay önce"
    }
    else if(createdAt > 60*60*24)
    {
      dateText = parseInt(createdAt / (60*60*24)) + " gün önce"
    }
    else if(createdAt > 60*60 )
    {
      dateText = parseInt(createdAt / (60*60)) + " saat önce"
    }
    else if(createdAt > 60)
    {
      dateText = parseInt(createdAt / 60) + " dk önce"
    }

    return (
        <View style={styles.page}>
            <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
              <View style={styles.brownbar} />
              <Text style={styles.dateText}>{dateText}</Text>
            </View>
            

            <Text style={styles.postText}>{text}</Text>
        </View >
    )
}

export default Olay

const styles = StyleSheet.create({
    page: {
      borderBottomColor: '#ccc',
      flex: 1,
      marginBottom: 30,
    },
    dateText: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: '#6A7B93',
    },
    postText: {
      marginTop: 6,
      fontSize: 16,
      color: '#3B4963',
      fontFamily: 'Inter-Regular'
    },
    absolute: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    brownbar: {
      marginRight: 8,
      flex: 1, 
      backgroundColor: "#8b5e34", 
      height: 4,
      borderRadius: 20,
    }
})