import CalendarType from "./CalendarType";

class Date {
  readable: string = '';
  timestamp: string = '';
  gregorian: CalendarType = undefined;
  hijri: CalendarType = undefined;
}

export default Date;
