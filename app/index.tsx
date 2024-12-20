import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { router } from 'expo-router';

/**
 *  This page is not for display
 *  Here is the logic to where send user when app is opened
 */

const entry_point_screen = () => {

  useEffect(
    () => {
      // TODO: read from storage
      let isOnboardingPassed = false;
      if (!isOnboardingPassed) {
        router.navigate('/onboarding_screen')
      }
    },
    [] // call only on first render
  )

  // should not happen for code to reach this place on runtime
  return (
    <View>
      <Text>it a first screen</Text>
      <TouchableOpacity onPress={() => {
        router.navigate('/onboarding_screen')
      }}>
        <Text>Route push onboarding_screen</Text>
      </TouchableOpacity>
    </View>
  )
}

export default entry_point_screen

