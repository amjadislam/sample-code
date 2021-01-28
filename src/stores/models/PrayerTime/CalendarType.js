class CalendarType {
  date: string = '';
  format: string = '';
  day: string = '';
  year: string = '';
  weekday: Weekday = null;
  month: Month = null;
  designation: Designation = null;
  holidays = [] // TODO : type not known...
}

class Weekday {
  en: string = '';
  ar: string = '';
}

class Month {
  number: string = '';
  en: string = '';
  ar: string = '';
}

class Designation {
  abbreviated: string = '';
  expanded: string = '';
}

export default CalendarType;
