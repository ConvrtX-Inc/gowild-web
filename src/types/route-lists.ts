export interface NormalRoute {
  id: string;
  user_id: string;
  route_name: string;
  start_point_long: string;
  start_point_lat: string;
  stop_point_long: string;
  stop_point_lat: string;
  created_date: string;
  updated_date: string;
  __entity: string;
}

export interface SingleRoute {
  user_id: string;
  route_name: string;
  route_photo: string;
  start_point_long: number;
  start_point_lat: number;
  stop_point_long: number;
  stop_point_lat: number;
  img_url: string;
  description: string;
}
