import React, { Component } from "react";

function getWinNumbers() {
  console.log("getWinNumbers");
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

class Lotto extends Component {
  state = {
    winNumbers: getWinNumbers(), // 당첨 숫자들
    winBalls: [],
    bonus: null, // 보너스 공
    redo: false
  };

  render() {
    return (
      <div>
        <div>당첨 숫자</div>
        <div id="결과창">
          {winBalls.map(v => (
            <Ball key={v} number={v} />
          ))}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus} />}
        <button onClick={redo ? this.onClickRedo : () => {}}>한 번 더!</button>
      </div>
    );
  }
}

export default Lotto;
