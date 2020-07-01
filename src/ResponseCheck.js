import React, { useState, useRef } from "react";

const ResponseCheck = () => {
  const [message, setMessage] = useState("클릭해서 시작하세요.");
  const [state, setState] = useState("waiting");
  const [result, setResult] = useState([]);
  const timeout = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const clickScreen = () => {
    if (state === "waiting") {
      setMessage("초록색이 되면 클릭하세요");
      setState("ready");
      timeout.current = setTimeout(() => {
        setMessage("지금 클릭");
        startTime.current = new Date();
        setState("now");
      }, Math.floor(Math.random() * 1000) + 7000); // 1 ~ 8초 랜덤
    } else if (state === "ready") {
      // 이른 클릭
      setMessage("ㅋㅋ! 아직 아닌데~");
      clearTimeout(timeout.current);
      setState("waiting");
    } else if (state === "now") {
      // 반응속도 체크
      endTime.current = new Date();
      setState("waiting");
      setResult(prev => {
        return [...prev, endTime.current - startTime.current];
      });
      setMessage("클릭해서 시작하세요");
    }
  };

  const onReset = () => {
    setResult([]);
  };

  return (
    <>
      <div id="screen" className={state} onClick={clickScreen}>
        {message}
      </div>
      {result.length === 0 ? null : (
        <>
          <div>time: {result.reduce((a, c) => a + c) / result.length}ms</div>
          <button onClick={onReset}>Reset</button>
        </>
      )}
    </>
  );
};

export default ResponseCheck;
