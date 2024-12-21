import { View } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { router } from 'expo-router';
import { ActiveSession } from '@/features/active_session/session_storage';

/**
 *  This page is not for display
 *  Here is the logic to where send user when app is opened
 */

const entry_point_screen = () => {

  useLayoutEffect(
    () => {
      // call possible navigations only after 'spash' is rendered
      setTimeout(() => {
        if (!ActiveSession.isOnboardingPassed) {
          router.navigate('/onboarding_screen')
        } else {
          // show main content
          router.navigate('/(tabs)')
        }
      }, 200)
    },
    [] // call only on first render
  )

  // return empty view what is shown while all is loading on launch
  return (
    <View></View>
  )
}

export default entry_point_screen

