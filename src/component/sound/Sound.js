import React, { useRef, useEffect, useState } from 'react';
import styles from './Sound.module.css'; // CSS 모듈 경로 확인 필요

const Sound = () => {
    const audioCtx = useRef(null);
    const [octave, setOctave] = useState(4); // 현재 옥타브 상태
    const activeOscillators = useRef({});
    useEffect(() => {
        audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
    }, []);

    const playNote = (frequency, note) => {
        if (!audioCtx.current) return;

        if (activeOscillators.current[note]) {
            activeOscillators.current[note].stop();
        }

        const oscillator = audioCtx.current.createOscillator();
        oscillator.frequency.setValueAtTime(frequency * Math.pow(2, octave - 4), audioCtx.current.currentTime);
        oscillator.type = 'sine';
        oscillator.connect(audioCtx.current.destination);
        oscillator.start();
        oscillator.stop(audioCtx.current.currentTime + 1);

        activeOscillators.current[note] = oscillator;
    };

    // 옥타브 변경 함수
    const changeOctave = (amount) => {
        setOctave(octave + amount);
    };

    // 기본 노트 정보
    const notes = [
        { note: 'C', frequency: 261.63, color: 'white' },
        { note: 'C#', frequency: 277.18, color: 'black' },
        { note: 'D', frequency: 293.66, color: 'white' },
        { note: 'D#', frequency: 311.13, color: 'black' },
        { note: 'E', frequency: 329.63, color: 'white' },
        { note: 'F', frequency: 349.23, color: 'white' },
        { note: 'F#', frequency: 369.99, color: 'black' },
        { note: 'G', frequency: 392.00, color: 'white' },
        { note: 'G#', frequency: 415.30, color: 'black' },
        { note: 'A', frequency: 440.00, color: 'white' },
        { note: 'A#', frequency: 466.16, color: 'black' },
        { note: 'B', frequency: 493.88, color: 'white' }
    ];

    return (
        <div>
            <div className={styles.controls}>
                <button onClick={() => changeOctave(-1)}>옥타브 내리기</button>
                <button onClick={() => changeOctave(1)}>옥타브 올리기</button>
            </div>
            <div className={styles.piano}>
                {notes.map(({ note, frequency, color }) => (
                    <div key={note} 
                        className={`${styles.key} ${color === 'black' ? styles.blackKey : styles.whiteKey}`}
                        onClick={() => playNote(frequency)}>
                        {note}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sound;
