import React, { useRef, useEffect } from 'react';

const Sound = () => {
    // AudioContext 초기화
    const audioCtx = useRef(null);

    useEffect(() => {
        audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
    }, []);

    // 건반에 대한 소리를 재생하는 함수
    const playNote = (frequency) => {
        if (!audioCtx.current) return;

        const oscillator = audioCtx.current.createOscillator();
        oscillator.frequency.setValueAtTime(frequency, audioCtx.current.currentTime); // 주파수 설정
        oscillator.type = 'sine'; // 소리의 형태 (sine, square, triangle, sawtooth)
        oscillator.connect(audioCtx.current.destination); // 출력 설정
        oscillator.start(); // 소리 재생 시작
        oscillator.stop(audioCtx.current.currentTime + 1); // 1초 후 소리 재생 멈춤
    };

    // 각 키와 해당 주파수
    const notes = [
        { note: 'C', frequency: 261.63 },
        { note: 'D', frequency: 293.66 },
        { note: 'E', frequency: 329.63 },
        { note: 'F', frequency: 349.23 },
        { note: 'G', frequency: 392.00 },
        { note: 'A', frequency: 440.00 },
        { note: 'B', frequency: 493.88 },
    ];

    return (
        <div>
            {notes.map(({ note, frequency }) => (
                <button key={note} onClick={() => playNote(frequency)}>
                    {note}
                </button>
            ))}
        </div>
    );
};

export default Sound;
