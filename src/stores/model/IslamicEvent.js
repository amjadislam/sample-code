



export default class IslamicEvent{



    id:number = 0;
    eventName:String = '';
    islamicDate:String = '';
    gregorianDate:String = '';


    constructor(id,eventName,islamicDate,gregorianDate) {
        this.id = id
        this.eventName = eventName
        this.islamicDate = islamicDate
        this.gregorianDate = gregorianDate
    }

}
