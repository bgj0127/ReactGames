import React, { Component } from "react";
import Try from "./Try.js";

function getNumber() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

class Baseball extends Component {
  state = {
    result: "",
    value: "",
    answer: getNumber(),
    tries: []
  };

  onSubmitForm = e => {
    e.preventDefault();
    if (this.state.value === this.state.answer.join("")) {
      this.setState({
        result: "Homerun!",
        treis: [
          ...this.state.tries,
          { try: this.state.value, result: "Homerun!" }
        ]
      });
      alert("게임을 다시 시작합니다.");
      this.setState({
        value: "",
        answer: getNumber(),
        tries: []
      });
    } else {
      const answerArray = this.state.value.split("").map(v => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (this.state.tries.length >= 9) {
        this.setState({
          result: `10번 시도했습니다. 답은 ${this.state.answer} 였습니다.`
        });
        alert("게임을 다시 시작합니다.");
        this.setState({
          value: "",
          answer: getNumber(),
          tries: []
        });
      } else {
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === this.state.answer[i]) {
            strike += 1;
          } else if (this.state.answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        if (ball === 0 && strike === 0) {
          this.setState({
            tries: [
              ...this.state.tries,
              { try: this.state.value, result: "Out!" }
            ],
            value: ""
          });
        } else {
          this.setState({
            tries: [
              ...this.state.tries,
              { try: this.state.value, result: `${strike}strike, ${ball}ball` }
            ],
            value: ""
          });
        }
      }
    }
  };

  OnChangeInput = e => {
    this.setState({
      value: e.target.value
    });
  };

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input
            minLength={4}
            maxLength={4}
            value={this.state.value}
            onChange={this.OnChangeInput}
          />
        </form>
        <div>시도: {this.state.tries.length}</div>
        <ul>
          {this.state.tries.map((v, i) => {
            return <Try key={`${i + 1}차 시도`} tryInfo={v} />;
          })}
        </ul>
      </>
    );
  }
}

export default Baseball;
