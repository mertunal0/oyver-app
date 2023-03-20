import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

const RadioBox = ({ selected, setSelected }) => {
    return (
        <TouchableOpacity onPress={setSelected} style={[
            {
                width: 20,
                height: 20,
                borderRadius: 20,
                borderWidth: 2,
                borderColor: '#6A7B93',
                alignItems: 'center',
                justifyContent: 'center'
            },
            selected && {
                backgroundColor: '#8b5e34',
                borderColor: '#8b5e34'
            },
        ]}>
            {
                selected && (
                    <Ionicons name='checkmark' color='white' size={14} />
                )
            }
        </TouchableOpacity>
    )
}

export default RadioBox

const styles = StyleSheet.create({})