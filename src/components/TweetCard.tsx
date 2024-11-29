import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Tweet } from '../types/tweet';

export const TweetCard: React.FC<{ tweet: Tweet }> = ({ tweet }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg mb-4 animate-slide-up">
    <div className="flex items-start space-x-4">
      <img
        src={tweet.author.profile_image_url}
        alt={tweet.author.name}
        className="w-12 h-12 rounded-full"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline">
          <h3 className="text-xl font-bold truncate">{tweet.author.name}</h3>
          <span className="ml-2 text-gray-500 text-lg">@{tweet.author.username}</span>
        </div>
        <p className="text-2xl mt-2 leading-relaxed">{tweet.text}</p>
        <p className="text-gray-500 text-lg mt-2">
          {formatDistanceToNow(new Date(tweet.created_at), { addSuffix: true })}
        </p>
      </div>
    </div>
  </div>
);