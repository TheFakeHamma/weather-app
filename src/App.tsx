import React from 'react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <header className="text-4xl font-bold mb-8">Weather App</header>
      <main className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* Weather information will go here */}
      </main>
    </div>
  );
};

export default App;
