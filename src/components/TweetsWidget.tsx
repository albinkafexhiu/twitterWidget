import React, { useEffect, useState } from 'react';
import { Tweet, TweetsWidgetProps } from '../types/tweet';
import { fetchTweets } from '../utils/api';
import { TweetCard } from './TweetCard';

export const TweetsWidget: React.FC<TweetsWidgetProps> = ({
  hashtag,
  refreshInterval = 15,
  maxTweets = 5
}) => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadTweets = async () => {
    try {
      const newTweets = await fetchTweets(hashtag, maxTweets);
      setTweets(newTweets);
      setError(null);
    } catch (error) {
      setError('Unable to load tweets');
    }
  };

  useEffect(() => {
    loadTweets();
    const interval = setInterval(loadTweets, refreshInterval * 60 * 1000);
    return () => clearInterval(interval);
  }, [hashtag, refreshInterval, maxTweets]);

  if (error) {
    return (
      <div className="bg-red-50 p-8 rounded-lg text-center">
        <h2 className="text-red-600 text-2xl">{error}</h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-heading font-bold text-center mb-4">
          #{hashtag}
        </h1>
      </header>
      
      <div className="space-y-6">
        {tweets.length === 0 ? (
          <div className="text-center text-2xl text-gray-500 py-12">
            Loading tweets...
          </div>
        ) : (
          tweets.map(tweet => (
            <TweetCard key={tweet.id} tweet={tweet} />
          ))
        )}
      </div>
      
      <footer className="mt-8 text-center text-gray-500 text-lg">
        Updates every {refreshInterval} minutes
      </footer>
    </div>
  );
};