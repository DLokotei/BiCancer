import { View, Text, TextInput, StyleSheet } from 'react-native'
import { AppColors } from '@/assets/Colors'
import React from 'react'

export const FirstStepView = () => {

    const onNameChanged = (newName: string) => {

    }

    const oAgeChanged = (newAge: string) => {

    }

    return (
        <View style={styles.allWrap}>
            <Text style={[styles.mainText, styles.headerText]}>Welcome</Text>
            <Text style={styles.mainText}>Let's get to know you</Text>
            <View style={{ height: 24 }} />
            <Text style={styles.mainText}>What's your name?</Text>
            <TextInput
                style={styles.input}
                onChangeText={onNameChanged}
                placeholder=""
                keyboardType="default"
            />
            <View style={{ height: 24 }} />
            <Text style={styles.mainText}>How old are you</Text>
            <TextInput
                style={styles.input}
                onChangeText={oAgeChanged}
                placeholder=""
                keyboardType="numeric"
            />
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
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 0,
        borderRadius: 8,
        backgroundColor: AppColors.white,
        padding: 10,
    },
})
