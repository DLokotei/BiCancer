import AsyncStorage from "@react-native-async-storage/async-storage";
import UserData from "../auth/userData";
import { ActiveSession } from "./session_storage";

export default class SessionRestorer {

    USER_DATA_STORAGE_KEY = 'pref_user_data';
    IS_ONBOARDING_PASSED_STORAGE_KEY = 'pref_is_onboarding_passed';

    restoreAll: () => Promise<UserData> = async () => {
        const userData = await this.restoreUserData()
        const isOnborgingPassed = await this.restoreIsOnborgingPassed()
        return userData
    }

    restoreUserData: () => Promise<UserData> = async () => {
        const data = new UserData()
        try {
            const jsonString = await AsyncStorage.getItem(this.USER_DATA_STORAGE_KEY);
            const lastData: UserData = jsonString != null ? JSON.parse(jsonString) : null;
            if (lastData == null) {
                // not have any
                return data
            }
            ActiveSession.userData = lastData
            return lastData
        } catch (e) {
            // no previous user data
        }
        return data
    }

    /**
    * Lauch job for save data to storage,
    * note: storage not updated immediately
    */
    saveUserData: () => void = () => {
        try {
            const jsonValue = JSON.stringify(ActiveSession.userData);
            AsyncStorage.setItem(this.USER_DATA_STORAGE_KEY, jsonValue);
        } catch (e) {
            // shoult not happen
            console.error('error while call saveUserDataToStorage')
            console.error(e)
        }
    }

    wipeUserData: ()=> void = () => {
        try {
            AsyncStorage.removeItem(this.USER_DATA_STORAGE_KEY);
        } catch (e) {
            // shoult not happen
            console.error('error while call wipeUserData')
            console.error(e)
        }
    }

    restoreIsOnborgingPassed: () => void = async () => {
        try {
            const jsonString = await AsyncStorage.getItem(this.IS_ONBOARDING_PASSED_STORAGE_KEY);
            ActiveSession.isOnboardingPassed = jsonString === 'true'
        } catch (e) {
            console.log('readIsOnborgingPassed no previous user data')
        }
    }

    /**
    * Lauch job for save data to storage,
    * note: storage not updated immediately
    */
    saveIsOnboardingPassed: () => void = () => {
        try {
            AsyncStorage.setItem(this.IS_ONBOARDING_PASSED_STORAGE_KEY, 'true');
            ActiveSession.isOnboardingPassed = true
        } catch (e) {
            // shoult not happen
            console.error('error while call saveIsOnboardingPassed')
            console.error(e)
        }
    }
    resetOnboardingState: () => void = () => {
        try {
            AsyncStorage.setItem(this.IS_ONBOARDING_PASSED_STORAGE_KEY, 'false');
            ActiveSession.isOnboardingPassed = false
        } catch (e) {
            // shoult not happen
            console.error('error while call resetOnboardingState')
            console.error(e)
        }
    }
}