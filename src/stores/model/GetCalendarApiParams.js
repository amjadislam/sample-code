


class GetCalendarApiParams {
    latitude: string = '';
    longitude: string = '';

    constructor(latitude: string, longitude: string) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    getParams() {
        return {
            latitude: this.latitude,
            longitude: this.longitude,
        }
    }
}

export default GetCalendarApiParams;
