import React, { useRef, useState, memo } from "react";
import Try from "./Try";

function getNumber() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

const Baseball = memo(() => {
  const [result, setResult] = useState("");
  const [value, setValue] = useState("");
  const [answer, setAnswer] = useState(getNumber());
  const [tries, setTries] = useState([]);
  const inputRef = useRef();

  const onSubmitForm = e => {
    e.preventDefault();
    if (value === answer.join("")) {
      setResult("Homerun!");
      setTries(prevTries => {
        return [...prevTries, { try: value, result: "Homerun!" }];
      });
      alert("게임을 다시 시작합니다.");
      inputRef.current.focus();
      setValue("");
      setAnswer(getNumber());
      setTries([]);
    } else {
      const answerArray = value.split("").map(v => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        setResult(`10번 시도했습니다. 답은 ${answer} 였습니다.`);
        alert("게임을 다시 시작합니다.");
        inputRef.current.focus();
        setValue("");
        setAnswer(getNumber());
        setTries([]);
      } else {
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        if (ball === 0 && strike === 0) {
          setTries(prevTries => {
            return [...prevTries, { try: value, result: "Out!" }];
          });
          setValue("");
        } else {
          setTries(prevTries => {
            return [
              ...prevTries,
              { try: value, result: `${strike}strike ${ball}ball` }
            ];
          });
          setValue("");
        }
      }
    }
  };

  const onChangeInput = e => {
    setValue(e.target.value);
  };

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input
          minLength={4}
          maxLength={4}
          ref={inputRef}
          value={value}
          onChange={onChangeInput}
        />
      </form>
      <div>시도: {tries.length}</div>
      <ul>
        {tries.map((v, i) => {
          return <Try key={`${i + 1}차 시도`} tryInfo={v} />;
        })}
      </ul>
    </>
  );
});

export default Baseball;
