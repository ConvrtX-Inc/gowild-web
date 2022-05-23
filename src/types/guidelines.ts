import { GuidelineType } from "src/enums";

export interface Guideline {
  id?: string;
  created_date?: string;
  updated_date?: string;
  type: GuidelineType;
  description: string;
  last_updated_user: string;
}

export interface GuidelineLog {
  id?: string;
  user_id?: string;
  guideline_type: GuidelineType;
  last_update_date: string;
}
