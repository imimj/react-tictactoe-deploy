import './App.css';
import Board from './Components/Board';
import {useState} from'react';

function App() {
  const [history, setHistory] = useState([{squares:Array(9).fill(null)}]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  const calculateWinner = (squares) =>{
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]
    for(let index=0; index<lines.length; index++){
      const [a,b,c] = lines[index];
            if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
              return squares[a];    //lines[index]에 따른 lines에 있는 배열값을 가져와서 if문에 squares[배열값]을 가져와 같은 값인지 비교 
                                    //즉 [a,b,c]값이 [0,4,8]일때 squares[0]===squares[4]===squares[8]이면 true를 반환함. 
            }
    }
    return null;
  }

  const current = history[stepNumber]; //lengh가 3이라면 제일 마지막 배열의 인덱스는 2. 0부터 시작하기 때문에
  const winner = calculateWinner(current.squares);  

  let status;
  if(winner){
    status = 'winner: ' + winner;
  }else{
    status = `Next Player : ${xIsNext ? 'X' : 'O'}`;
  }

  const handleClick = (i) => {
    
    const newHistory = history.slice(0, stepNumber+1);    //만약 jumpTo()로 이전 단계로 돌아왔을때 그 뒤의 단계들은 다 사라져야하기 때문에 0번부터 현재 스텝+1(slice는 두번째 인자값의 의미가 두번째 인자값 직전 값까지를 복사한다는 뜻이기에 +1 ) 
    const newCurrent = newHistory[newHistory.length-1];   //newHistory의 인덱스는 0부터 시작하기 때문에 마지막 history배열값을 가져오려면 -1을 해줘야함
    const newSquares = newCurrent.squares.slice(); //현재의 history객체를 복사
    if(calculateWinner(newSquares)||newSquares[i]){
      return;
    }
    newSquares[i] = xIsNext? 'X' : 'O';
    setHistory([...newHistory,{squares:newSquares}]) //...는 전개연산자로 history안에 있는 모든 배열들을 자동으로 복사해서 가져옴.{squares:newSquares}는 현재 새롭게 복사한 squares객체를 추가하는것.
    setXIsNext(prev=>!prev);
    
    setStepNumber(newHistory.length);
  }

  const moves = history.map((step, move) => {   //step는 history에서 각 squares를 뜻함. move는 history안의 배열 값들의 인덱스를 말함. 즉 각 squares
    const desc = move? 'Go to move #' + move :  //인덱스값이 0인 경우, 즉 제일 처음 시작할때 squares가 하나만 있다면 0은 false를 반환하기에 'Go to game start'가 들어감
    'Go to game start';
    return(
      <li key={move}>
        <button className='move-button' onClick={()=>jumpTo(move)}>{desc}</button>
      </li>
    )
  })            //const move는 페이지가 로딩될 때 같이 실행이 되며 state가 바뀌던가 하면 화면이 재 랜더링 되면서 또 실행되는듯?

  const jumpTo =(step)=>{
    setStepNumber(step);
    setXIsNext((step%2)===0);  //step넘버가 짝수일때마다 setXIsNext를 트루로 설정하는것. true일땐 X값이며 X값은 0번째,2번째,4번째 이렇게 순서가 되기때문에/
  };

  return (
    <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick2={(i)=>handleClick(i)}/>
        </div>
        <div className="game-info">
          <div className='status'>{status}</div>
          <ol style={{listStyle:'none'}}>{moves}</ol>
        </div>
    </div>
  );
}

export default App;
