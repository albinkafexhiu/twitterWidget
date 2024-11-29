import { TweetsWidget } from './components/TweetsWidget';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <TweetsWidget 
        hashtag="pulseecoskopje"
        refreshInterval={15}
        maxTweets={5}
      />
    </div>
  );
}

export default App;