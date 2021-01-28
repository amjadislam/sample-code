import BaseResponse from "./BaseResponse";
import {Surah} from "../models";

class GetSurahsResponse extends BaseResponse{
  data : Surah[] = [];
}

export default GetSurahsResponse;
