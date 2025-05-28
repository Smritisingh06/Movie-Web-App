import React, { useState } from 'react';
import { FaRobot, FaTimes } from 'react-icons/fa';

const exampleSuggestions = [
  { label: "Latest", question: "Here are some latest movies for you" },
  { label: "Comedy", question: "Check out these great comedy movies" },
  { label: "Horror", question: "Here are the best horror movies to watch" },
  { label: "Action", question: "Top action movies you might like" },
  { label: "Romantic", question: "Best romantic movies to enjoy" },
  { label: "Thriller", question: "Recommended thrilling movies" },
  { label: "Family", question: "Some wonderful family-friendly movies" },
  { label: "Sci-Fi", question: "Best sci-fi movies for you" },
  { label: "Drama", question: "Top drama movies you should see" },
  { label: "Adventure", question: "Exciting adventure movies to watch" },
  { label: "Fantasy", question: "Magical fantasy movies you will love" },
  { label: "Animation", question: "Popular animated movies for all ages" },
  { label: "Mystery", question: "Intriguing mystery movies to explore" },
  { label: "Crime", question: "Best crime movies to watch" },
];

const qaData = [
  { question: "Here are some latest movies for you", answer: "Check out 'Avatar: The Way of Water', 'Top Gun: Maverick', or 'Black Panther: Wakanda Forever'." },
  { question: "Check out these great comedy movies", answer: "You might enjoy 'The Hangover', 'Superbad', or '3 Idiots'." },
  { question: "Here are the best horror movies to watch", answer: "Try 'The Conjuring', 'Hereditary', or 'Stree'." },
  { question: "Top action movies you might like", answer: "Watch 'Mad Max: Fury Road', 'John Wick', or 'War'." },
  { question: "Best romantic movies to enjoy", answer: "You may like 'The Notebook', 'La La Land', or 'Dilwale Dulhania Le Jayenge'." },
  { question: "Recommended thrilling movies", answer: "Try 'Inception', 'Andhadhun', or 'Gone Girl'." },
  { question: "Some wonderful family-friendly movies", answer: "Watch 'Finding Nemo', 'Chhichhore', or 'Paddington'." },
  { question: "Best sci-fi movies for you", answer: "'Interstellar', 'Arrival', and 'Koi Mil Gaya' are great choices." },
  { question: "Top drama movies you should see", answer: "You can watch 'Forrest Gump', 'Taare Zameen Par', or 'The Pursuit of Happyness'." },
  { question: "Exciting adventure movies to watch", answer: "'Indiana Jones', 'Jumanji', or 'The Jungle Book' are thrilling picks." },
  { question: "Magical fantasy movies you will love", answer: "'Harry Potter', 'The Hobbit', and 'Pan's Labyrinth' are amazing fantasy films." },
  { question: "Popular animated movies for all ages", answer: "'Toy Story', 'Coco', and 'Zootopia' are fantastic animated movies." },
  { question: "Intriguing mystery movies to explore", answer: "'Sherlock Holmes', 'Knives Out', and 'Gone Girl' will keep you guessing." },
  { question: "Best crime movies to watch", answer: "'The Godfather', 'Pulp Fiction', and 'Sicario' are top crime movies." },
];



const MovieChatbot = () => {
    const [showAll, setShowAll] = useState(false);
  const maxVisible = 9;
  const visibleChips = showAll ? exampleSuggestions : exampleSuggestions.slice(0, maxVisible);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! Ask me for movie suggestions by genre or mood." }
  ]);
  const [input, setInput] = useState('');
const fetchLatestMovies = async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTk2YzljMDExYjcwZmY2NzAwZjU3ZmZkNDQ1YWI2ZiIsIm5iZiI6MTc0ODI2ODU1MS41NjE5OTk4LCJzdWIiOiI2ODM0NzYwN2ZjYTVkYTY3MDMyYjc1MjYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.L0XIt3Q4yAXOTIOFIbWEDaro9ahbzBon5eWbyOnUWvQ'
    }
  };

  try {
    const res = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options);
    const data = await res.json();

    if (data?.results?.length > 0) {
      const top5 = data.results.slice(0, 5);
      return top5.map(movie => `• ${movie.title} (${movie.release_date})`);
    } else {
      return ["Couldn't fetch latest movies. Try again later."];
    }
  } catch (error) {
    console.error("❌ Failed to fetch latest movies:", error);
    return ["Couldn't fetch latest movies. Try again later."];
  }
};

 const handleSend = async (msg) => {
  const userInput = typeof msg === 'string' ? msg : input;
  if (!userInput.trim()) return;

  const userMessage = { from: 'user', text: userInput };
  let botReply = { from: 'bot', text: "Sorry, I don't have a suggestion for that. Try asking by genre!" };

  // Check if user asked for latest movies
  if (userInput.toLowerCase().includes("latest")) {
    const latestMovies = await fetchLatestMovies();
    botReply = { from: 'bot', text: <div>
  <p>Latest Movies:</p>
  {latestMovies.map((movie, index) => (
    <p key={index}>{movie}</p>
  ))}
</div>
 };
  } else {
    // Match from static Q&A
    const found = qaData.find(q =>
      userInput.toLowerCase().includes(q.question.toLowerCase().split(' ')[2]) ||
      q.question.toLowerCase().includes(userInput.toLowerCase())
    );
    if (found) {
      botReply = { from: 'bot', text: found.answer };
    }
  }

  setMessages(prev => [...prev, userMessage, botReply]);
  setInput('');
};


  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          className="fixed bottom-6 right-6 bg-gradient-to-l from-red-500 to-orange-500 text-white rounded-full p-4 shadow-lg z-50 flex items-center justify-center text-3xl hover:scale-110 transition-all duration-200"
          onClick={() => setOpen(true)}
          aria-label="Open chatbot"
        >
          <FaRobot />
        </button>
      )}

      {/* Chatbot UI */}
      {open && (
        <div className="fixed bottom-4 right-4 w-80 max-w-sm bg-white bg-opacity-70 backdrop-blur-md border border-gray-300 rounded-xl shadow-2xl z-50 flex flex-col animate-fadeIn">
          <div className="bg-gradient-to-l from-red-500 to-orange-500 text-white px-4 py-3 rounded-t-xl flex items-center justify-between font-semibold text-lg">
            <span>🎬 MovieBot</span>
            <button onClick={() => setOpen(false)} className="text-white hover:text-gray-200 text-xl">
              <FaTimes />
            </button>
          </div>

          {/* Suggestions */}
  <div
  className="p-3 bg-white/80 flex flex-wrap gap-2 overflow-y-auto max-h-32 scrollbar-thin scrollbar-thumb-gray-400"
>
  {(showAll ? exampleSuggestions : exampleSuggestions.slice(0, maxVisible)).map((chip) => (
    <button
      key={chip.label}
      onClick={() => handleSend(chip.question)}
      className="bg-orange-100 text-sm text-orange-800 px-3 py-1 rounded-full hover:bg-orange-200 transition duration-150"
    >
      {chip.label}
    </button>
  ))}

  {exampleSuggestions.length > maxVisible && (
    <button
      onClick={() => setShowAll(!showAll)}
      className="bg-gray-200 text-sm text-gray-800 px-3 py-1 rounded-full hover:bg-gray-300 transition duration-150"
    >
      {showAll ? "Show Less" : "Show More"}
    </button>
  )}
</div>



          {/* Messages */}
          <div className="p-4 h-64 overflow-y-auto flex flex-col gap-3 scrollbar-thin scrollbar-thumb-gray-300">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`px-3 py-2 max-w-[75%] text-sm rounded-lg ${
                    msg.from === 'user'
                      ? 'bg-gradient-to-l from-red-100 to-orange-100 text-black'
                      : 'bg-white border border-gray-300 text-gray-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex border-t border-gray-200">
            <input
              className="flex-1 p-3 text-sm outline-none bg-transparent placeholder-gray-500 "
               style={{ color: 'rgb(31, 41, 55)' }}
              placeholder="Ask for a movie..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-gradient-to-l from-red-500 to-orange-500 px-4 text-white hover:opacity-90 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieChatbot;
