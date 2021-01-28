




export default class UtilMethods{



    /*static getVersesData  () {
        /!*let value = null
        try {
            const customData = require('../../assets/verses.json');
            return customData
        } catch (e) {
            // error reading value
        }*!/

        return 0.0
    }*/

    static getVersesData = async () => {
        let value = ''
        try {
            value = await require('../../assets/verses.json');
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
