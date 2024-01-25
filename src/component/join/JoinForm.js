import React, { useState,useEffect } from 'react';
const JoinForm = () => {
    const [webSocket, setWebSocket] = useState(null);
    useEffect(() => {
        // 웹소켓 연결 생성
        const userToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhY2Nlc3MiLCJleHAiOjE3MDU5NzU0MzYsImlkIjoyLCJlbWFpbCI6ImV4YW1wbGUyQGVtYWlsLmNvbSJ9.8g57o1x0Zn55dfWxJxUVJeRftrb_tykB3VFLnggjEwRoBvlC9jx6X30FEYWHJs6GJ43rQnxYrdoIFaUIkGrfKw';
        const refreshToken = 'test';
        const ws = new WebSocket('ws://localhost:8888/ws/chat');
        ws.onopen = () => {

          ws.send(JSON.stringify({ accessToken: userToken, refreshToken: refreshToken }));



          console.log('Connected to the WebSocket server');
          // 연결이 성공적으로 이루어지면 필요한 로직을 여기에 작성합니다.
        };
    
        ws.onmessage = (event) => {
          // 서버로부터 메시지를 받았을 때의 처리 로직을 여기에 작성합니다.
          console.log('Message from server:', event.data);
        };
    
        ws.onerror = (error) => {
          // 오류 처리 로직을 여기에 작성합니다.
          console.error('WebSocket error:', error);
        };
    
        ws.onclose = () => {
          console.log('Disconnected from the WebSocket server');
          // 연결이 종료되면 필요한 로직을 여기에 작성합니다.
        };
    
        // WebSocket 객체를 상태로 설정
        setWebSocket(ws);
    
        // 컴포넌트가 언마운트될 때 WebSocket 연결을 종료합니다.
        return () => {
          ws.close();
        };
      }, []);
    return (
        <div>
            <h1>join </h1>          
        </div>
    );
};

export default JoinForm;            <h1>join </h1>