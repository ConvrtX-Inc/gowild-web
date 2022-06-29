import { AccountStatus, OnlineStatus } from "src/enums/user-list";

export interface Status {
  id?: string;
  status_name?: AccountStatus;
  is_active?: OnlineStatus;
  created_date?: string;
  updated_date?: string;
}
