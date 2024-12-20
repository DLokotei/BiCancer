import UserData from "../auth/userData"

class ActiveSessionStorage {
    isOnboardingPassed: boolean = false
    userData: UserData
    constructor() {
        // for unknown reason code in constructor as 'userData: UserData = new UserData()' is not working
        this.userData = new UserData()
    }

}

export const ActiveSession = new ActiveSessionStorage()