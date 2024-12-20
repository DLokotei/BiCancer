import { View, Text, TextInput, StyleSheet } from 'react-native'
import { AppColors } from '@/assets/Colors'
import React from 'react'

export const SecondStepView = () => {

    const onItemChecked = (cancerType: string) => {

    }

    return (
        <View style={styles.allWrap}>
            <Text style={[styles.mainText, styles.headerText]}>Coose your cancer</Text>
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
