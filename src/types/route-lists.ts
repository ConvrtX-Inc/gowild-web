export interface NormalRoute {
  isProspect?: boolean;
  isReturning?: boolean;
  isVerified?: boolean;
  id: string;
  user_id: string;
  route_name: string;
  start_point_long: string;
  start_point_lat: string;
  stop_point_long: string;
  stop_point_lat: string;
  created_date: string
  updated_date: string;
  __entity: string;
}
