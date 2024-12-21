import { Text, StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import SessionRestorer from '@/features/active_session/session_restorer';
import { AppScreenContainer } from '@/components/AppScreenContainer';
import { ActiveSession } from '@/features/active_session/session_storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AppColors } from '@/assets/Colors';
import { ThemedText } from '@/components/ThemedText';
import { CancerType } from '@/features/auth/userData';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import ImageViewer from '@/components/ImageViewer';
import { router } from 'expo-router';

export default function HomeScreen() {

  const sessionRestorer = new SessionRestorer()

  // for choosed image form device lib
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      console.log(result);
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  }

  return (
    <AppScreenContainer style={{ backgroundColor: AppColors.white }}>
      <ScrollView>
        <UserInfoHeaderView />
        <ThemedText type='default' style={{ color: '#888', marginHorizontal: 24, }}>Track your general feelings</ThemedText>
        <TouchableOpacity
          style={{ marginHorizontal: 24, padding: 16, backgroundColor: AppColors.appPinkLighter, borderRadius: 16 }}
          onPress={() => { }}
        >
          <ThemedText type='defaultSemiBold' style={{ textAlign: 'center' }}>How are you feelings today?</ThemedText>
        </TouchableOpacity>

        <ThemedText type='default' style={{ color: '#888', marginHorizontal: 24, }}>Main diagnostic</ThemedText>
        <MainDiagnosticCardView />

        <View style={{
          flexDirection: "row",
          backgroundColor: AppColors.appPinkLighter,
          justifyContent: 'space-evenly'
        }}>
          <TouchableOpacity
            onPress={() => { }}
          >
            <Ionicons name='add-circle-sharp' color={AppColors.appPinkDarker} size={50} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { pickImageAsync() }}
          >
            <Ionicons name='scan-circle' color={AppColors.appPinkDarker} size={50} />
          </TouchableOpacity>
        </View>

        <ThemedText
          type='default'
          style={{ color: '#888', marginHorizontal: 24 }}
        >
          Selected image:
        </ThemedText>
        <ImageViewer
          imgSource={require('@/assets/images/react-logo.png')}
          selectedImage={selectedImage}
        />


        <TouchableOpacity
          style={{ marginEnd: 30 }}
          onPress={() => { sessionRestorer.resetOnboardingState() }}
        >
          <Text>CLEAR of onboarding states</Text>
        </TouchableOpacity>
      </ScrollView>
    </AppScreenContainer>
  )
}

function UserInfoHeaderView() {
  const userName = ActiveSession.userData.name
  return (
    <View style={{ flexDirection: 'row', margin: 24 }}>
      <View style={{ flexDirection: 'column', flex: 1 }}>
        <View style={{ flexDirection: 'row' }}>
          <ThemedText type='defaultSemiBold'>Hello</ThemedText>
          <HelloWave />
        </View>
        <ThemedText type='subtitle'>{userName}</ThemedText>
      </View>
      <Ionicons name='contract-outline' color={AppColors.black} size={50} />
    </View>
  )
}

function MainDiagnosticCardView() {
  const selectedCancerTypes = ActiveSession.userData.selectedCancerTypes
  const mainCancerType = selectedCancerTypes[0] || CancerType.other
  const userConditionTypes = ActiveSession.userData.otherConditionTypes
  return (
    <View
      style={{
        margin: 24,
        padding: 16,
        backgroundColor: '#eee',
        borderRadius: 16
      }}
    >
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={() => {
          router.navigate({
            pathname: '/treatment_history_screen',
            params: { cancerType: mainCancerType }
          })
        }}
      >
        <Ionicons name='contract-outline' color={AppColors.black} size={50} />
        <ThemedText type='subtitle'>{mainCancerType}</ThemedText>
      </TouchableOpacity>
      <View style={{ height: 16 }} />
      <ThemedText type='default'>Other diagnostics</ThemedText>
      <View style={{
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: 'flex-start',
        justifyContent: 'space-between'
      }}>
        {
          userConditionTypes.map(item => (
            <View style={{
              flexDirection: 'row',
              alignItems: "center",
              borderRadius: 16,
              backgroundColor: AppColors.appPinkLighter,
              paddingHorizontal: 9
            }}
              key={item}>
              <Ionicons name='heart' color={AppColors.black} size={15} />
              <ThemedText type='default'>{item}</ThemedText>
            </View>
          ))
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  }
});
