import axios from 'axios';
import { Tweet } from '../types/tweet';

const twitterApi = axios.create({
  baseURL: 'https://api.twitter.com/2',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TWITTER_API_TOKEN}`
  }
});

export const fetchTweets = async (hashtag: string, maxResults: number = 5): Promise<Tweet[]> => {
  try {
    // This will create: /tweets/search/recent?query=#pulseecoskopje -is:retweet&max_results=5&...
    const response = await twitterApi.get('/tweets/search/recent', {
      params: {
        query: `#${hashtag}`, // This will be URI encoded automatically by axios
        max_results: maxResults,
      }
    });

    // Handle the response data
    if (!response.data.data) {
      return [];
    }

    return response.data.data.map((tweet: any) => ({
      id: tweet.id,
      text: tweet.text,
      created_at: tweet.created_at || new Date().toISOString(),
      author: {
        username: 'user',
        name: 'Twitter User',
        profile_image_url: '/default-avatar.png'
      }
    }));
  } catch (error) {
    console.error('Error fetching tweets:', error);
    throw error;
  }
};