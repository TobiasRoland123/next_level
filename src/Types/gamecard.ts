export interface GameCardRoot {
  id: number;
  title: string;
  name: string;
  slug: string;
  description: string;
  description_raw: string;
  background_image: string;
  platforms: Array<{ name: string; value: number }>;
  tags: Array<{ name: string; value: number }>;
}

/* export type PlatformArr = Platform[];

export interface Platform {
  id: string;
  name: string;
  slug: string;
  image: any;
  year_end: any;
  year_start?: number;
  games_count: number;
  image_background: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  language: string;
  games_count: number;
  image_background: string;
}
 */
