import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native'
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

  let someValue = false
  let [getCurrentStep, setCurrentStep] = useState(0);

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

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.allWrap}>
        {displayCurrentStep(getCurrentStep)}
        <View style={styles.buttonsRow} >
          {getCurrentStep != 0 &&
            <TouchableOpacity
              style={[styles.nextButton, { marginEnd: 30 }]}
              onPress={() => { changeStep(getCurrentStep - 1) }}
            >
              <Text style={styles.headerText}>Prev</Text>
              <Image
                source={require('@/assets/images/arrow_left_white_20.png')}
                style={{ height: 20, width: 23, opacity: 1, marginLeft: 7 }}
              />
            </TouchableOpacity>
          }
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => { changeStep(getCurrentStep + 1) }}
          >
            <Text style={styles.headerText}>Next</Text>
            <Image
              source={require('@/assets/images/arrow_right_white_20.png')}
              style={{ height: 20, width: 23, opacity: 1, marginLeft: 7 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

export default onboarding_screen

const styles = StyleSheet.create({
  allWrap: {
    backgroundColor: AppColors.appPinkDarker,
    flex: 1,
    alignItems: 'center'
  },
  headerText: {
    color: '#fff',
    fontSize: 15,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24
  },
  nextButton: {
    width: 'auto',
    borderWidth: 0,
    borderRadius: 8,
    backgroundColor: AppColors.appPinkLighter,
    alignContent: 'center',
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row'
  }
})