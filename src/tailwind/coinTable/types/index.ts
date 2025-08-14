export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  total_volume: number;
}

export interface CoinDetail {
  id: string;
  symbol: string;
  name: string;
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  market_data: {
    current_price: {
      krw: number;
      usd: number;
    };
    market_cap: {
      krw: number;
      usd: number;
    };
    total_volume: {
      krw: number;
      usd: number;
    };
    price_change_percentage_24h: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
  };
  market_cap_rank: number;
  description: {
    en: string;
  };
  links: {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: string[];
    announcement_url: string[];
    twitter_screen_name: string;
    telegram_channel_identifier: string;
    subreddit_url: string;
    repos_url: {
      github: string[];
      bitbucket: string[];
    };
  };
}
