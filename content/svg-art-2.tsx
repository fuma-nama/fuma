"use client";

import { useState } from "react";
import './svg-art-2.css'

const positions = [
  [-9, 16],
  [-1, 46],
  [-9, 82],
];

export function ExampleThumbBox() {
  const [id, setId] = useState(0);

  return (
    <button
      className="relative block w-full border rounded-md bg-neutral-900 border-neutral-700"
      onClick={() => {
        setId((prev) => (prev + 1) % positions.length);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 12 320"
        className="w-[12px] m-auto h-[320px]"
      >
        <path
          d=" M3 12 L3 32 C 3 40 11 36 11 44 L11 64 C 11 72 3 68 3 76 L3 96 C 3 104 11 100 11 108 L11 128 C 11 136 3 132 3 140 L3 160 C 3 168 11 164 11 172 L11 192 C 11 200 11 196 11 204 L11 224 C 11 232 3 228 3 236 L3 256 C 3 264 11 260 11 268 L11 288 C 11 296 11 292 11 300 L11 320"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        ></path>
      </svg>

      <div
        className="absolute size-3 bg-red-400 top-0 left-1/2 rounded-full transition-transform duration-500"
        style={{
          translate: `${positions[id][0]}px ${positions[id][1]}px`,
        }}
      />
      <p className="text-xs text-neutral-400">Try click on me!</p>
    </button>
  );
}


export function ExampleOffsetDistance() {
  
    return (
      <div
        className="relative block w-full border rounded-md bg-neutral-900 border-neutral-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 12 320"
          className="w-[12px] m-auto h-[320px]"
        >
          <path
            d=" M3 12 L3 32 C 3 40 11 36 11 44 L11 64 C 11 72 3 68 3 76 L3 96 C 3 104 11 100 11 108 L11 128 C 11 136 3 132 3 140 L3 160 C 3 168 11 164 11 172 L11 192 C 11 200 11 196 11 204 L11 224 C 11 232 3 228 3 236 L3 256 C 3 264 11 260 11 268 L11 288 C 11 296 11 292 11 300 L11 320"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          ></path>
        </svg>
  
        <div
          className="absolute size-3 bg-red-400 top-0 left-1/2 -translate-x-1.5 rounded-full animate-[example-offset-distance_1500ms_infinite]"
          style={{
            offsetPath: 'path(" M3 12 L3 32 C 3 40 11 36 11 44 L11 64 C 11 72 3 68 3 76 L3 96 C 3 104 11 100 11 108 L11 128 C 11 136 3 132 3 140 L3 160 C 3 168 11 164 11 172 L11 192 C 11 200 11 196 11 204 L11 224 C 11 232 3 228 3 236 L3 256 C 3 264 11 260 11 268 L11 288 C 11 296 11 292 11 300 L11 320")',
            offsetDistance: '10%'
          }}
        />
      </div>
    );
  }
  