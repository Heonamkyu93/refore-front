import React, { useEffect, useRef } from 'react';

const Ocr = () => {
    const videoRef = useRef(null);
    const ws = useRef(null);

    useEffect(() => {
        ws.current = new WebSocket('ws://localhost:8000/ocr/ws');
        ws.current.onopen = () => console.log("WebSocket opened");
        ws.current.onclose = () => console.log("WebSocket closed");

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
                console.log("인식된 텍스트:", text);
                if (text.includes("캡쳐")) {
                    captureImage();
                }
            };

            recognition.start();
        } else {
            console.error("이 브라우저는 음성 인식을 지원하지 않습니다.");
        }
    }, []);

    const captureImage = async () => {
        if (videoRef.current) {
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
