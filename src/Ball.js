import React, { PureComponent } from "react";

class Ball extends PureComponent {
  render() {
    const { number } = this.props;
    let background;
    if (number <= 10) {
      background = "orange";
    } else if (number <= 20) {
      background = "yellow";
    } else if (number <= 30) {
      background = "blue";
    } else if (number <= 40) {
      background = "red";
    } else {
      background = "green";
    }
    return (
      <div className="ball" style={{ background }}>
        {number}
      </div>
    );
  }
}

export default Ball;
