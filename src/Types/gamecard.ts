export interface GameCardRoot {
  id: number;
  title: string;
  description: string;
  background_image: string;
  platforms: { id: number; name: string; slug: string }[];
  tags: { id: number; name: string; slug: string }[];
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
