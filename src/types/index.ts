export interface Channel {
  id: string;
  name: string;
  alt_names: string[];
  country: string;
  categories: string[];
  is_nsfw: boolean;
  launched: string | null;
  closed: string | null;
  website: string | null;
}

export interface Stream {
  channel: string;
  feed: string;
  title: string;
  url: string;
  quality: string | null;
  referrer: string | null;
  user_agent: string | null;
  label: string | null;
}

export interface Logo {
  channel: string;
  feed: string | null;
  in_use: boolean;
  tags: string[];
  width: number;
  height: number;
  format: string;
  url: string;
}

export interface Country {
  name: string;
  code: string;
  languages: string[];
  flag: string;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
}
