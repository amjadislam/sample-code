const AsyncStorage = require("react-native/Libraries/Storage/AsyncStorage");



export default class PreferencesStorage {

    static storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value)
            console.log(key,value)
        } catch (e) {
            // saving error
        }
        return 1
    }


    static getData = async (key) => {
        let value = ''
        try {
             value = await AsyncStorage.getItem(key)
            if (value !== null) {
                // value previously stored
                return value
            }
        } catch (e) {
            // error reading value
        }

        return value
    }





}
