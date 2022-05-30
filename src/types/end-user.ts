import { Byte64Image } from "./others";
import { Status } from "./status";

export interface EndUser {
  id?: string;
  full_name?: string;
  username?: string;
  email?: string;
  phone_no?: string;
  address_line1?: string;
  address_line2?: string;
  profile_photo?: Byte64Image;
  img_url?: string;
  created_date?: string;
  updated_date?: string;
  deleted_date?: string;
  status?: Status;
}
