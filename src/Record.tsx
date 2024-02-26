import  { useState, useRef } from 'react';

function Record() {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const handleClick = async () => {
    if (!recording) {
      try {
        const standardOptions: MediaStreamConstraints = {
          audio: false,
          video: true,
          preferCurrentTab: true,
        };

        const stream = await navigator.mediaDevices.getDisplayMedia(standardOptions);

        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = function (e) {
          const blob = new Blob([e.data], { type: 'video/webm' });
          const url = URL.createObjectURL(blob);
          const randomNumber = Math.floor(Math.random() * 10000);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${randomNumber}.webm`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };

        mediaRecorderRef.current.start();
        setRecording(true);
      } catch (err) {
        console.error('Error: ' + err);
      }
    } else {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current = null; 
        setRecording(false); 
      }
    }
  };

  return (
      <button onClick={handleClick}>{recording ? 'Stop Recording' : 'Start Recording'}</button>
  );
}

export default Record;