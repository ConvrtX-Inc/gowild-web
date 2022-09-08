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
  count?: 0;
  total?: 0;
  page?: 0;
  pageCount?: 0;
}

// GET ONE ROUTE
export interface SingleRoute {
  created_date?: string;
  description: string;
  id: string;
  img_url: string;
  route_name: string;
  route_photo?: string;
  start_point_lat: number;
  start_point_long: number;
  stop_point_lat: number;
  stop_point_long: number;
  updated_date: string;
  user_id: string;
  __entity?: string;
}
