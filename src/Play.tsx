import React, { useState } from 'react';

function Play() {
  const [src, setSrc] = useState<string | null>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (e.dataTransfer.items) {
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        if (e.dataTransfer.items[i].kind === 'file') {
          const file = e.dataTransfer.items[i].getAsFile();
          if(file === null) {
            alert('no file')
            return;
          }
          const url = URL.createObjectURL(file);
          setSrc(url);
        }
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <div onDrop={handleDrop} onDragOver={handleDragOver} style={{ height: '100px', width: '100px', border: '1px solid black' }}>
        Drop .webm file here
      </div>
      {src && <video controls src={src} />}
    </div>
  );
}


export default Play;