export interface User {
  id: string;
  avatar: string;
  email: string;
  name: string;

  [key: string]: any;
}

export interface AxiosAdmin {
  address_line1?: string;
  address_line2?: string;
  created_date: string;
  deleted_date?: string;
  email: string;
  full_name: string;
  id: string;
  phone_no?: number;
  profile_photo?: string;
  updated_date: string;
  username: string;
  __entity: string;
}
