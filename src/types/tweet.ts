export interface Tweet {
    id: string;
    text: string;
    created_at: string;
    author: {
      username: string;
      name: string;
      profile_image_url: string;
    };
  }
  
  export interface TweetsWidgetProps {
    hashtag: string;
    refreshInterval?: number; // in minutes
    maxTweets?: number;
  }