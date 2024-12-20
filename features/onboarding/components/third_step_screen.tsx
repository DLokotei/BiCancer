import { View, Text, TextInput, StyleSheet } from 'react-native'
import { AppColors } from '@/assets/Colors'
import React from 'react'

export const ThirdStepView = () => {

    const onItemChecked = (cancerType: string) => {

    }

    return (
        <View style={styles.allWrap}>
            <Text style={[styles.mainText, styles.headerText]}>When where u diagnosed?</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    allWrap: {
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1
    },
    mainText: {
        color: AppColors.white,
        fontSize: 14,
        fontFamily: 'SpaceMono',
        fontWeight: '600',
        textAlign: 'center'
    },
    headerText: {
        fontSize: 25,
        fontWeight: '400'
    }
})
