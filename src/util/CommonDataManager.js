

export default class CommonDataManager {

    static myInstance = null;

    _isLocationSet = false;


    /**
     * @returns {CommonDataManager}
     */
    static getInstance() {
        if (CommonDataManager.myInstance == null) {
            CommonDataManager.myInstance = new CommonDataManager();
        }

        return this.myInstance;
    }

    isLocationSet() {
        return this._isLocationSet;
    }

    setLocationFlag(flag) {
        this._isLocationSet = flag;
    }
}
