export interface GameRoot {
  results: Result[];
}

export interface Result {
  id: number;
  name: string;
  background_image: string;
}

export interface Game extends Result {
  title: string;
  platforms: Array<{ name: string; value: number }>;
  description: string;
  description_raw: string;
  tags: Array<{ name: string; value: number }>;
}
