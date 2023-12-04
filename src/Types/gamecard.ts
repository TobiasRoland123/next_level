export interface GameCardRoot {
  id: string;
  slug: string;
  title: string;
  name: string;
  background_image: string;
  platforms: Platform[];
  description: string;
  tags: Tag[];
}

export type PlatformArr = Platform[];

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
