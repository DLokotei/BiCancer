import { AppColors } from "@/assets/Colors";
import { PropsWithChildren } from "react";
import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export function AppScreenContainer({ children }: PropsWithChildren) {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.allWrap}>
                {children}
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    allWrap: {
        backgroundColor: AppColors.appPinkDarker,
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
})
