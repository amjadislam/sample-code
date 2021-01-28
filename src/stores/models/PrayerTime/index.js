import Timing from "./Timing";
import Date from "./Date";
import CalendarType from "./CalendarType";

class PrayerTime {
  timings: Timing = null;
  date: Date = null;
  meta = null;
}

//       "meta": {
//         "latitude": 51.508515,
//         "longitude": -0.1254872,
//         "timezone": "Europe\/London",
//         "method": {
//           "id": 2,
//           "name": "Islamic Society of North America (ISNA)",
//           "params": {
//             "Fajr": 15,
//             "Isha": 15
//           }
//         },
//         "latitudeAdjustmentMethod": "ANGLE_BASED",
//         "midnightMode": "STANDARD",
//         "school": "STANDARD",
//         "offset": {
//           "Imsak": 0,
//           "Fajr": 0,
//           "Sunrise": 0,
//           "Dhuhr": 0,
//           "Asr": 0,
//           "Maghrib": 0,
//           "Sunset": 0,
//           "Isha": 0,
//           "Midnight": 0
//         }
//       }
//     }

export default PrayerTime;

export {Date, Timing, CalendarType};
