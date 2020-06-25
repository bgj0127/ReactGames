import React, { useState } from "react";

const WordRelay = () => {
  const [word, setWord] = useState("나무");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  const onSubmitForm = e => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setResult("정답!");
      setWord(value);
      setValue("");
    } else {
      setResult("오답");
      setValue("");
    }
  };
  const onChangeInput = e => {
    setValue(e.target.value);
  };

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input value={value} onChange={onChangeInput} />
        <button>입력</button>
        <div>{result}</div>
      </form>
    </>
  );
};

export default WordRelay;
