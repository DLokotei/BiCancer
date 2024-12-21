import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react'
import { Stack } from 'expo-router'
import { AppColors } from '@/assets/Colors';
import { FirstStepView } from '@/features/onboarding/components/first_step_screen';
import { SecondStepView } from '@/features/onboarding/components/second_step_screen';
import { ThirdStepView } from '@/features/onboarding/components/third_step_screen';
import SessionRestorer from '@/features/active_session/session_restorer';


const availableSteps: Array<() => React.ReactNode> = [
  FirstStepView, SecondStepView, ThirdStepView
]

const onboarding_screen = () => {
  const sessionRestorer = new SessionRestorer()
  let [getCurrentStep, setCurrentStep] = useState(0)

  function displayCurrentStep(step: number): React.ReactNode {
    switch (step) {
      case 0:
        return FirstStepView()
      case 1:
        return SecondStepView()
      case 2:
        return ThirdStepView()
      default:
        return FirstStepView()
    }
  }

  function changeStep(newStepIndex: number) {
    // user probaly change something, so save it
    sessionRestorer.saveUserData()
    const maximumIndex = availableSteps.length - 1
    const minimumIndex = 0
    if (newStepIndex > maximumIndex) {
      setCurrentStep(maximumIndex)
      return
    }
    if (newStepIndex < minimumIndex) {
      setCurrentStep(minimumIndex)
      return
    }
    setCurrentStep(newStepIndex)
  }

  function renderNavigationArrows(): React.ReactNode {
    const showBackButton = getCurrentStep > 0
    const isLastScreenShown = getCurrentStep == availableSteps.length - 1
    const nextButtonContent = isLastScreenShown ? (<>
      <Text style={styles.textCommon}>Done</Text>
    </>) : (<>
      <Text style={styles.textCommon}>Next</Text>
      <Ionicons name='arrow-forward' size={20} color="#FFF" />
    </>)

    return (
      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={[styles.navigationButton, { display: showBackButton ? 'flex' : 'none' }]}
          onPress={() => { changeStep(getCurrentStep - 1) }}
        >
          <Text style={styles.textCommon}>Prev</Text>
          <Ionicons name='arrow-back' size={20} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={() => { changeStep(getCurrentStep + 1) }}
        >
          {nextButtonContent}
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.allWrap}>
        {displayCurrentStep(getCurrentStep)}
        {renderNavigationArrows()}
      </View>
    </>
  )
}

export default onboarding_screen

const styles = StyleSheet.create({
  allWrap: {
    backgroundColor: AppColors.appPinkDarker,
    flex: 1
  },
  textCommon: {
    fontFamily: 'SpaceMono',
    color: '#fff',
    fontSize: 15,
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    marginVertical: 24
  },
  navigationButton: {
    borderWidth: 0,
    borderRadius: 8,
    backgroundColor: AppColors.appPinkLighter,
    padding: 10,
    flexDirection: 'row'
  }
})