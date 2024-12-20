import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { AppColors } from '@/assets/Colors'
import React from 'react'
import SessionRestorer from '@/features/active_session/session_restorer'

export const ThirdStepView = () => {

    const sessionRestorer = new SessionRestorer()

    const onItemChecked = (cancerType: string) => {

    }

    return (
        <View style={styles.allWrap}>
            <Text style={[styles.mainText, styles.headerText]}>When where u diagnosed?</Text>
            <TouchableOpacity
                style={{ marginEnd: 30 }}
                onPress={() => { sessionRestorer.saveIsOnboardingPassed() }}
            >
                <Text style={styles.mainText}>end of onboarding</Text>

            </TouchableOpacity>
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
