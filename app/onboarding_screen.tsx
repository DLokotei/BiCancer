import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const onboarding_screen = () => {
  return (
    <>
    <Stack.Screen options={{ headerShown: false }} />
    <View>
      <Text style={styles.heaterText}>it is onboarding_screen</Text>
    </View>
    </>
    
  )
}

export default onboarding_screen

const styles = StyleSheet.create({
  heaterText: {
    color: '#fff',
    fontSize: 15,
  }
})