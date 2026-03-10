export interface RedditAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  userAgent: string;
  tokenStoragePath?: string;
}

export interface TokenData {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  obtained_at: number;
}

export interface RedditApiError {
  status: number;
  reason: string;
  message: string;
}

export interface RedditListing<T> {
  kind: "Listing";
  data: {
    after: string | null;
    before: string | null;
    children: Array<{
      kind: string;
      data: T;
    }>;
    dist: number;
    modhash: string;
  };
}

export interface RedditPost {
  id: string;
  name: string;
  title: string;
  author: string;
  subreddit: string;
  subreddit_name_prefixed: string;
  selftext: string;
  url: string;
  permalink: string;
  score: number;
  ups: number;
  downs: number;
  num_comments: number;
  created_utc: number;
  is_self: boolean;
  over_18: boolean;
  spoiler: boolean;
  locked: boolean;
  stickied: boolean;
  link_flair_text: string | null;
  thumbnail: string;
}

export interface RedditComment {
  id: string;
  name: string;
  body: string;
  author: string;
  subreddit: string;
  score: number;
  ups: number;
  downs: number;
  created_utc: number;
  parent_id: string;
  link_id: string;
  is_submitter: boolean;
  stickied: boolean;
  distinguished: string | null;
}

export interface RateLimitInfo {
  remaining: number;
  used: number;
  resetSeconds: number;
}
