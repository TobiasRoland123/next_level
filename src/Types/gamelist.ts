export interface GameRoot {
  count: number;
  next: string;
  previous: any;
  results: GameList[];
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  seo_h1: string;
  noindex: boolean;
  nofollow: boolean;
  description: string;
  nofollow_collections: string[];
}

export interface GameList {
  id: string;
  slug: string;
  name: string;
  title: string;
  background_image: string;
  platforms: Platform[];
  description: string;
  tags: Tag[];
}

export interface Platform {
  platform: Platform;
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

export interface Platform3 {
  id: number;
  name: string;
  slug: string;
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
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
