import React, { memo } from "react";

/*PureComponent는 props와 state를 비교하여 변화가 있을때만 렌더링 하는 것이다. 
  성능향상에 도움이 된다. (클래스 컴포넌트)*/
// class Try extends PureComponent {
//   render() {
//     const { tryInfo } = this.props;
//     return (
//       <li>
//         <div>{tryInfo.try}</div>
//         <div>{tryInfo.result}</div>
//       </li>
//     );
//   }
// }

/*memo는 Hooks에서 사용할 수 있다. 기능은 PureComponent와 같다. */

const Try = memo(({ tryInfo }) => {
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
});

export default Try;
