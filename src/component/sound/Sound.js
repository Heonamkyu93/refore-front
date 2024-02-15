import React, { useRef, useEffect } from 'react';
import styles from './Sound.module.css'; // CSS 모듈 임포트 위치 확인 필요

const Sound = () => {
    const audioCtx = useRef(null);
    const oscillatorRef = useRef(null);

    useEffect(() => {
        audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
    }, []);

    const playNote = (frequency) => {
        if (!audioCtx.current) return;

        // 이전 오실레이터가 있으면 중지
        if (oscillatorRef.current) {
            oscillatorRef.current.stop();
        }

        const oscillator = audioCtx.current.createOscillator();
        oscillator.frequency.setValueAtTime(frequency, audioCtx.current.currentTime);
        oscillator.type = 'sine';
        oscillator.connect(audioCtx.current.destination);
        oscillator.start();
        oscillator.stop(audioCtx.current.currentTime + 1); // 1초 후 소리 재생 멈춤

        // 현재 오실레이터를 참조에 저장
        oscillatorRef.current = oscillator;
    };

    // 각 키와 해당 주파수
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
        { note: 'B', frequency: 493.88, color: 'white' },
        // 추가 옥타브 및 검은 건반을 위해 필요한 나머지 노트들 추가
    ];

    return (
        <div className={styles.piano}>
            {notes.map(({ note, frequency, color }) => (
                <button
                    key={note}
                    onClick={() => playNote(frequency)}
                    className={`${styles.key} ${styles[color]}`}
                >
                    {note}
                </button>
            ))}
        </div>
    );
};

export default Sound;
