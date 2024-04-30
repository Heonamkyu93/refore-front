import React, { useEffect, useRef, useState } from 'react';
import styles from './Ocr.module.css';

const Ocr = () => {
    const videoRef = useRef(null);
    const ws = useRef(null);
    const [canCapture, setCanCapture] = useState(true); // 캡처 가능 상태
    const [serverResponse, setServerResponse] = useState(''); // 서버로부터의 응답을 저장할 상태
    const [recognizedText, setRecognizedText] = useState(''); // 인식된 텍스트를 저장할 상태

    useEffect(() => {
        ws.current = new WebSocket('ws://localhost:8000/ocr/ws');
        ws.current.onopen = () => console.log("WebSocket opened");
        ws.current.onclose = () => console.log("WebSocket closed");
        ws.current.onmessage = (event) => {
            console.log("서버로부터 응답 받음:", event.data);
            speak(event.data); // 응답을 음성으로 출력하는 함수 호출
            setServerResponse(event.data); // 서버로부터 받은 응답을 상태에 저장
        };

        const getVideo = () => {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    videoRef.current.srcObject = stream;
                })
                .catch(console.error);
        };

        getVideo();

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, []);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.lang = 'ko-KR';
            recognition.interimResults = true;

            recognition.onstart = () => {
                console.log("음성 인식 서비스가 시작되었습니다.");
            };

            recognition.onerror = (event) => {
                console.error("음성 인식 오류 발생:", event.error);
            };

            recognition.onend = () => {
                console.log("음성 인식 서비스가 종료되었습니다.");
            };

            recognition.onresult = (event) => {
                const last = event.results.length - 1;
                const text = event.results[last][0].transcript.trim();
                console.log(`인식된 텍스트: "${text}"`);
                setRecognizedText(text); // 인식된 텍스트를 상태에 저장
                if (text.toLowerCase().includes("캡처") && canCapture) {
                    console.log("이미지 캡처를 실행합니다.");
                    captureImage();
                    setCanCapture(false); // 캡처 후 3초 동안 추가 캡처 방지
                    setTimeout(() => setCanCapture(true), 3000); // 3초 후 다시 캡처 가능
                }
            };

            recognition.start();
        } else {
            console.error("이 브라우저는 음성 인식을 지원하지 않습니다.");
        }
    }, [canCapture]);

    const captureImage = async () => {
        if (videoRef.current && canCapture) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
            canvas.toBlob(blob => {
                const reader = new FileReader();
                reader.onload = () => {
                    const data = reader.result.split(',')[1];
                    ws.current.send(data);
                };
                reader.readAsDataURL(blob);
            });
        }
    };

    // 서버로부터 받은 응답을 음성으로 출력하는 함수
    const speak = (text) => {
        const speechSynthesis = window.speechSynthesis;
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = 'ko-KR'; // 음성 언어 설정
        speechSynthesis.speak(speech);
    };

    return (
        <div>
            <div className={styles.container}>
                <video ref={videoRef} autoPlay style={{ width: '720px' }}></video>
                {/* 서버로부터 받은 응답과 인식된 텍스트를 화면에 출력 */}
                <div className={styles.serverResponse}>서버 응답: {serverResponse}</div>
                <div className={styles.recognizedText}>인식된 음성: {recognizedText}</div>
            </div>
        </div>
    );
};

export default Ocr;
