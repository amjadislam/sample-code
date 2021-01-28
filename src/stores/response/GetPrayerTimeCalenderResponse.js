import BaseResponse from "./BaseResponse";
import PrayerDateTime from "../model/PrayerDateTime";

class GetPrayerTimeCalenderResponse extends BaseResponse{

  data: PrayerDateTime[] = [];
}

export default GetPrayerTimeCalenderResponse;
