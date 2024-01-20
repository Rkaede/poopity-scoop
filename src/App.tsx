import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './App.css';
import {
  AnimationPlaybackControls,
  AnimationSequence,
  animate,
} from 'framer-motion';

const highlights = {
  A: { scale: [1, 1.3, 1], backgroundColor: '#F6F7C4' },
  B: { scale: [1, 1.3, 1], backgroundColor: '#A1EEBD' },
  C: { scale: [1, 1.3, 1], backgroundColor: '#7BD3EA' },
};
const highlightOptions = { type: 'spring' as const, duration: 0.2 };

const rawTimelineData = [
  ['#a1', 'A', 5.27],
  ['#a2', 'B', 5.4],
  ['#a3', 'B', 5.5],
  ['#a4', 'A', 5.92],
  //
  ['#b1', 'A', 7.08],
  ['#b2', 'C', 7.22],
  ['#b3', 'B', 7.3],
  ['#b4', 'A', 7.7],
  //
  ['#c1', 'A', 8.3],
  ['#c2', 'B', 8.76],
  ['#c3', 'A', 8.9],
  ['#c4', 'B', 9.35],
  ['#c5', 'A', 9.5],
  //
  ['#d1', 'A', 10.18],
  ['#d2', 'B', 10.4],
  ['#d3', 'A', 10.79],
  ['#d4', 'B', 10.9],
  //
  ['#e1', 'A', 11.7],
  ['#e2', 'B', 11.8],
  ['#e3', 'A', 12.0],
  //
  ['#f1', 'A', 13.0],
  ['#f2', 'C', 13.3],
  ['#f3', 'B', 13.4],
  ['#f4', 'A', 13.6],
  ['#f5', 'A', 13.9],
  ['#f6', 'A', 14.5],
  //
  ['#g1', 'A', 15.0],
  ['#g2', 'C', 15.3],
  ['#g3', 'B', 15.4],
  ['#g4', 'A', 15.6],
  ['#g5', 'A', 15.9],
  //
  ['#h1', 'A', 16.8],
  ['#h2', 'A', 18.1],
  //
  ['#i1', 'A', 19.1],
  ['#i2', 'C', 19.4],
  ['#i3', 'B', 19.6],
  ['#i4', 'A', 19.8],
  //
  ['#j-1', 'A', 21.0],
  ['#j-2', 'C', 21.2],
  ['#j-3', 'B', 21.3],
  ['#j-4', 'A', 21.6],
  //
  ['#k1', 'A', 22.8],
  ['#k2', 'C', 23.0],
  ['#k3', 'B', 23.1],
  ['#k4', 'A', 23.4],
  ['#k5', 'A', 23.7],
];

const timeline = rawTimelineData.map(([selector, highlightKey, time]) => {
  return [
    selector,
    highlights[highlightKey as keyof typeof highlights],
    { at: time, ...highlightOptions },
  ];
}) as AnimationSequence;

function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const animateRef = useRef<AnimationPlaybackControls | null>(null);
  const [time, setTime] = useState(0);

  useLayoutEffect(() => {
    animateRef.current = animate(timeline);
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (audio.paused) {
        audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    }
  };

  function handleTick() {
    if (!animateRef.current) return;
    animateRef.current.time = audioRef.current?.currentTime || 0;
    setTime(audioRef.current?.currentTime || 0);
  }

  function handleEnd() {
    setIsPlaying(false);
  }

  useEffect(() => {
    if (isPlaying) {
      animateRef.current?.play();
    } else {
      animateRef.current?.pause();
    }
  }, [isPlaying]);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(event.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setTime(time);
    }
  };

  return (
    <div className="main">
      <button onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      <input
        type="range"
        min="0"
        max={audioRef.current?.duration || 0}
        step="0.01"
        value={time}
        onChange={handleSliderChange}
      />
      <span className="time">
        {new Date(time * 1000).toISOString().substring(14, 19)}
      </span>
      <audio
        ref={audioRef}
        src="/poopity.mp3"
        onTimeUpdate={handleTick}
        onEnded={handleEnd}
      />

      <div className="lyrics">
        <div className="line">
          <div id="a1">Poo</div>
          <div id="a2">py</div>
          <div>-</div>
          <div id="a3">di</div>
          <div>&nbsp;</div>
          <div id="a4">scoop</div>
        </div>
        <div className="line">
          <div id="b1">Scoop</div>
          <div>-</div>
          <div id="b2">did</div>
          <div id="b3">dy</div>
          <div>-</div>
          <div id="b4">whoop</div>
        </div>
        <div className="line">
          <div id="c1">Whoop</div>
          <div>-</div>
          <div id="c2">di</div>
          <div>-</div>
          <div id="c3">scoop</div>
          <div>-</div>
          <div id="c4">di</div>
          <div>-</div>
          <div id="c5">poop</div>
        </div>
        <div className="line">
          <div id="d1">Poop</div>
          <div>-</div>
          <div id="d2">di</div>
          <div>-</div>
          <div id="d3">scoop</div>
          <div id="d4">ty</div>
        </div>
        <div className="line">
          <div id="e1">Scoop</div>
          <div id="e2">ty</div>
          <div>-</div>
          <div id="e3">whoop</div>
        </div>
        <div className="line">
          <div id="f1">Whoop</div>
          <div id="f2">i</div>
          <div id="f3">ty</div>
          <div>-</div>
          <div id="f4">scoop</div>
          <div>,&nbsp;</div>
          <div id="f5">whoop</div>
          <div>-</div>
          <div id="f6">poop</div>
        </div>
        <div className="line">
          <div id="g1">Poop</div>
          <div>-</div>
          <div id="g2">did</div>
          <div id="g3">dy</div>
          <div>,&nbsp;</div>
          <div id="g4">whoop</div>
          <div>-</div>
          <div id="g5">scoop</div>
        </div>
        <div className="line">
          <div id="h1">Poop</div>
          <div>,&nbsp;</div>
          <div id="h2">poop</div>
        </div>
        <div className="line">
          <div id="i1">Scoop</div>
          <div>-</div>
          <div id="i2">did</div>
          <div id="i3">dy</div>
          <div>-</div>
          <div id="i4">whoop</div>
        </div>
        <div className="line">
          <div id="j-1">Whoop</div>
          <div>-</div>
          <div id="j-2">did</div>
          <div id="j-3">dy</div>
          <div>-</div>
          <div id="j-4">scoop</div>
        </div>

        <div className="line">
          <div id="k1">Whoop</div>
          <div>-</div>
          <div id="k2">did</div>
          <div id="k3">dy</div>
          <div>-</div>
          <div id="k4">scoop</div>
          <div>-</div>
          <div id="k5">poop</div>
        </div>
      </div>
    </div>
  );
}

export default App;
