import React, { useState } from 'react';

export default function App() {
  const [recording, setRecording] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [transcript, setTranscript] = useState('');
  const [language, setLanguage] = useState('');

  const handleRecord = async () => {
    if (recording) {
      setRecording(false);
    } else {
      setRecording(true);
      setTimeout(() => {
        setRecording(false);
        simulateSendAudio();
      }, 3000);
    }
  };

  const simulateSendAudio = async () => {
    const res = await fetch('https://intellisay-backend.onrender.com/transcribe', {
      method: 'POST',
      body: new FormData(), // Replace with audio data in real version
    });
    const data = await res.json();
    setTranscript(data.transcript);
    setLanguage(data.language);
    setTasks((prev) => [...prev, data.task]);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 text-center">
      <h1 className="text-3xl font-bold mb-6">🎙️ Intellisay</h1>
      <button
        onClick={handleRecord}
        className={`px-6 py-2 text-white rounded-full text-lg ${recording ? 'bg-red-600' : 'bg-blue-600'}`}
      >
        {recording ? 'Recording...' : 'Start Recording'}
      </button>

      {transcript && (
        <div className="mt-6">
          <p className="text-lg font-medium">🗣️ Transcript:</p>
          <p className="text-gray-700 italic">{transcript}</p>
          <p className="mt-2">🌐 Detected Language: <strong>{language}</strong></p>
        </div>
      )}

      <div className="mt-8 text-left max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-2">📝 Tasks</h2>
        <ul className="space-y-2">
          {tasks.map((task, index) => (
            <li key={index} className="p-3 bg-white shadow rounded-lg">{task}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}