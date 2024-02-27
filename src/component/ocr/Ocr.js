import React, { useEffect, useRef, useState } from 'react';

const Ocr = () => {
    const videoRef = useRef(null);
    const ws = useRef(null);
    const [canCapture, setCanCapture] = useState(true); // 캡처 가능 상태

    useEffect(() => {
        ws.current = new WebSocket('ws://localhost:8000/ocr/ws');
        ws.current.onopen = () => console.log("WebSocket opened");
        ws.current.onclose = () => console.log("WebSocket closed");
        ws.current.onmessage = (event) => {
            console.log("서버로부터 응답 받음:", event.data);
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
            ws.current.close();
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
                if (text.toLowerCase().includes("캡처") && canCapture) {
                    console.log("이미지 캡쳐를 실행합니다.");
                    captureImage();
                    setCanCapture(false); // 캡처 후 3초 동안 추가 캡처 방지
                    setTimeout(() => setCanCapture(true), 3000); // 3초 후에 다시 캡처 가능
                }
            };

            recognition.start();
        } else {
            console.error("이 브라우저는 음성 인식을 지원하지 않습니다.");
        }
    }, [canCapture]); // canCapture 상태 변경 시 useEffect 재실행

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

    return (
        <div>
            <h1>OCR</h1>
            <video ref={videoRef} autoPlay style={{width: '720px'}}></video>
        </div>
    );
};

export default Ocr;
