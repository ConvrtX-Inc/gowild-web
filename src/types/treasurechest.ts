export type Byte64Image = string | ArrayBuffer;

export interface TreasureChest {
  id?: string;
  title: string;
  description: string;
  location_long: number;
  location_lat: number;
  event_date: string;
  event_time: string;
  no_of_participants: number;
  thumbnail_img: Byte64Image;
  a_r: Byte64Image;
  created_date?: string;
  img_url: string;
}

export interface Sponsor {
  id?: string;
  treasure_chest_id: string;
  link: string;
  img: Byte64Image;
  img_url: string;
}
