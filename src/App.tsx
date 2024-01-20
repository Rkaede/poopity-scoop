import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './App.css';
import {
  AnimationPlaybackControls,
  AnimationSequence,
  animate,
} from 'framer-motion';

const highlightA = {
  scale: [1, 1.1, 1],
  backgroundColor: 'rgba(244,172,54,.4)',
};
const highlightB = {
  scale: [1, 1.1, 1],
  backgroundColor: 'rgba(104,222,122,.4)',
};
const highlightC = {
  scale: [1, 1.1, 1],
  backgroundColor: 'rgba(39,181,234,.4)',
};
const highlightOptions = { type: 'spring' as const, duration: 0.2 };

const timeline = [
  ['#a1', highlightA, { at: 5.27, ...highlightOptions }],
  ['#a2', highlightB, { at: 5.4, ...highlightOptions }],
  ['#a3', highlightB, { at: 5.5, ...highlightOptions }],
  ['#a4', highlightA, { at: 5.92, ...highlightOptions }],
  //
  ['#b1', highlightA, { at: 7.08, ...highlightOptions }],
  ['#b2', highlightC, { at: 7.22, ...highlightOptions }],
  ['#b3', highlightB, { at: 7.3, ...highlightOptions }],
  ['#b4', highlightA, { at: 7.7, ...highlightOptions }],
  //
  ['#c1', highlightA, { at: 8.3, ...highlightOptions }],
  ['#c2', highlightB, { at: 8.76, ...highlightOptions }],
  ['#c3', highlightA, { at: 8.9, ...highlightOptions }],
  ['#c4', highlightB, { at: 9.35, ...highlightOptions }],
  ['#c5', highlightA, { at: 9.5, ...highlightOptions }],
  //
  ['#d1', highlightA, { at: 10.18, ...highlightOptions }],
  ['#d2', highlightB, { at: 10.4, ...highlightOptions }],
  ['#d3', highlightA, { at: 10.79, ...highlightOptions }],
  ['#d4', highlightB, { at: 10.9, ...highlightOptions }],
  //
  ['#e1', highlightA, { at: 11.7, ...highlightOptions }],
  ['#e2', highlightB, { at: 11.8, ...highlightOptions }],
  ['#e3', highlightA, { at: 12.0, ...highlightOptions }],
  //
  ['#f1', highlightA, { at: 13.0, ...highlightOptions }],
  ['#f2', highlightC, { at: 13.3, ...highlightOptions }],
  ['#f3', highlightB, { at: 13.4, ...highlightOptions }],
  ['#f4', highlightA, { at: 13.6, ...highlightOptions }],
  ['#f5', highlightA, { at: 13.9, ...highlightOptions }],
  ['#f6', highlightA, { at: 14.3, ...highlightOptions }],

  ['#g1', highlightA, { at: 15.0, ...highlightOptions }],
  ['#g2', highlightC, { at: 15.3, ...highlightOptions }],
  ['#g3', highlightB, { at: 15.4, ...highlightOptions }],
  ['#g4', highlightA, { at: 15.6, ...highlightOptions }],
  ['#g5', highlightA, { at: 15.9, ...highlightOptions }],
  //
  ['#h1', highlightA, { at: 16.8, ...highlightOptions }],
  ['#h2', highlightA, { at: 18.1, ...highlightOptions }],
  //
  ['#i1', highlightA, { at: 19.1, ...highlightOptions }],
  ['#i2', highlightC, { at: 19.4, ...highlightOptions }],
  ['#i3', highlightB, { at: 19.6, ...highlightOptions }],
  ['#i4', highlightA, { at: 19.8, ...highlightOptions }],

  ['#j-1', highlightA, { at: 21.0, ...highlightOptions }],
  ['#j-2', highlightC, { at: 21.2, ...highlightOptions }],
  ['#j-3', highlightB, { at: 21.3, ...highlightOptions }],
  ['#j-4', highlightA, { at: 21.6, ...highlightOptions }],

  //
  ['#k1', highlightA, { at: 22.8, ...highlightOptions }],
  ['#k2', highlightC, { at: 23.0, ...highlightOptions }],
  ['#k3', highlightB, { at: 23.1, ...highlightOptions }],
  ['#k4', highlightA, { at: 23.4, ...highlightOptions }],
  ['#k5', highlightA, { at: 23.7, ...highlightOptions }],
] as AnimationSequence;

function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const animateRef = useRef<AnimationPlaybackControls | null>(null);

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
  }

  useEffect(() => {
    if (isPlaying) {
      animateRef.current?.play();
    } else {
      animateRef.current?.pause();
    }
  }, [isPlaying]);

  return (
    <div className="main">
      <button onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      <audio ref={audioRef} src="/poopity.opus" onTimeUpdate={handleTick} />

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
