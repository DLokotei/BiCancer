import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import SessionRestorer from '../active_session/session_restorer';

export function EmitWhenAllDependenciesLoaded(onAllLoaded: () => void) {

    // load fonts
    const [fontsLoaded] = useFonts({
        SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
    })

    // restore last user data
    let [userSessionRestored, setUserSessionRestored] = useState(false)
    useEffect(() => {
        const restorer = new SessionRestorer()
        restorer.restoreAll().then(() => {
            setUserSessionRestored(true)
        })
    }, []);

    //listen computed value
    useEffect(() => {
        if (fontsLoaded && userSessionRestored) {
            onAllLoaded()
        }
    }, [fontsLoaded, userSessionRestored]);

}