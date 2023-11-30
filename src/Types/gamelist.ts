export interface GameRoot {
  count: number;
  next: string;
  previous: any;
  results: Result[];
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  seo_h1: string;
  noindex: boolean;
  nofollow: boolean;
  description: string;
  nofollow_collections: string[];
}

export interface Result {
  id: number;
  slug: string;
  name: string;
  background_image: string;
  platforms: Platform[];
  description: string;
  genres: Genre[];
  tags: Tag[];
}

export interface Platform {
  platform: Platform2;
}

export type PlatformArr = Platform2[];

export interface Platform2 {
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
