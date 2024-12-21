import { View, Text } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { AppScreenContainer } from '@/components/AppScreenContainer';
import { AppColors } from '@/assets/Colors';
import { CancerType } from '@/features/auth/userData';

export type TreatmentHistoryScreenParams = {
  pageName: string;
  cancerType: CancerType;
}

export default function TreatmentHistoryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<TreatmentHistoryScreenParams>();
  const currentCancerType = params.cancerType

  return (
    <AppScreenContainer style={{ backgroundColor: AppColors.white }}>
      <Stack.Screen
        options={{
          title: params.pageName,
        }}
      />
      <Text
        onPress={() => {
          router.setParams({ pageName: 'Updated' });
        }}>
        Update the title
      </Text>
      <Text>tratment_history_screen of {currentCancerType}</Text>
    </AppScreenContainer>
  )
}
