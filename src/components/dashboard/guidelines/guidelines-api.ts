import axios, { AxiosResponse } from "axios";
import { GuidelineType } from "src/enums";
import { Guideline, GuidelineLog } from "src/types/guidelines";

const accessToken = sessionStorage.getItem("token");
const userId = sessionStorage.getItem("user_id");
const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1`;
const GUIDELINES_URL = `${BASE_URL}/guidelines`;
const LOG_URL = `${BASE_URL}/guideline-logs`;

const CONFIG = {
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  },
};

const getGuidelinelogs = async (): Promise<AxiosResponse> => {
  return await axios.get(`${LOG_URL}?sort=last_update_date,ASC`, CONFIG);
};
const createGuidelineLog = async (
  type: GuidelineType
): Promise<AxiosResponse> => {
  const DATA: GuidelineLog = {
    user_id: userId,
    guideline_type: type,
    last_update_date: String(new Date()),
  };

  return await axios.post(LOG_URL, DATA, CONFIG);
};

const createGuideline = async (
  type: GuidelineType,
  description: string
): Promise<AxiosResponse> => {
  const DATA: Guideline = {
    type: type,
    description: description,
    last_updated_user: userId,
  };
  return await axios.post(`${GUIDELINES_URL}`, DATA, CONFIG);
};

const updateGuideline = async (
  guideline: Guideline,
  updateDescription: string
): Promise<AxiosResponse> => {
  const DATA: Guideline = {
    type: guideline.type,
    description: updateDescription,
    last_updated_user: userId,
  };
  return await axios.patch(`${GUIDELINES_URL}/${guideline.id}`, DATA, CONFIG);
};

const getGuidelines = async () : Promise<AxiosResponse> => {
    return await axios.get(GUIDELINES_URL, CONFIG);
}

export {
  getGuidelinelogs,
  createGuidelineLog,
  createGuideline,
  updateGuideline,
  getGuidelines
};
