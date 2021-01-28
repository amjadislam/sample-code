import BaseResponse from "./BaseResponse";
import {PrayerTime} from "../models";

class GetCalendarResponse extends BaseResponse{
  data : PrayerTime[] = [];
}

export default GetCalendarResponse;
