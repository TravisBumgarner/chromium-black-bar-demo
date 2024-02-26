import  { useState, useRef } from 'react';
import Record from './Record';
import Play from './Play';
import './App.css'

function App() {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  return (
    <div className="App">
      <strong>Instructions</strong>
      <li>
        <li>Click "Start Recording" to start recording</li>
        <li>Click "Stop Recording" to stop recording</li>
        <li>Drag and drop the .webm file into the box to play the video</li>
        </li>
      <Record />
      <Play />
    </div>
  );
}

export default App;