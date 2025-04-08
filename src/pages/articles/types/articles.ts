export interface MediaMetadata {
  url: string;
  format: string;
  height: number;
  width: number;
}

export interface Media {
  type: string;
  subtype: string;
  caption: string;
  copyright: string;
  approved_for_syndication: number;
  ['media-metadata']: MediaMetadata[];
}

export interface Article {
  url: string;
  id: number;
  source: string;
  published_date: string;
  updated?: string;
  byline?: string;
  title: string;
  abstract: string;
}

export interface Articles {
  status: string
  copyright: string
  num_results: number,
  results: Article[]
}
