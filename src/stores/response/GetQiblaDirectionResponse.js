import BaseResponse from "./BaseResponse";
import PrayerDateTime from "../model/PrayerDateTime";
import QiblaDirection from "../model/QiblaDirection";

class GetQiblaDirectionResponse extends BaseResponse{

  data: QiblaDirection = null;
}

export default GetQiblaDirectionResponse;
