import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/* TODOS for future learning - descending order of difficulty
  - Display the location for each move in the format (col, row) in the move history list.
  - Bold the currently selected item in the move list.
  - Rewrite Board to use two loops to make the squares instead of hardcoding them.
  - Add a toggle button that lets you sort the moves in either ascending or descending order.
  - When someone wins, highlight the three squares that caused the win.
  - When no one wins, display a message about the result being a draw.
*/

function Square(props) {
  return (
    <button className='square'
            onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {  
    return (
      <Square value={this.props.squares[i]}
              onClick={() => this.props.onClick(i)} />
    );
  }

  render() {
   return (
      <div>
        <div className='board-row'>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>

        <div className='board-row'>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>

        <div className='board-row'>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
          squares: Array(9).fill(null)
        }],
      // keeps track of move we are viewing
      stepNumber: 0,
      xIsNext: true
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];

    // makes shallow copy of arr that represents squares on board
    // to manipulate w/out mutating state
    const squares = current.squares.slice();

    // returns early if we have a winner or click on filled square
    if (calculateWinner(squares) || squares[i]) {return;}

    // puts the correct symbol on square
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      // toggles X or O
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2 === 0)
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    
    // maps over history array and displays buttons for past moves
    const moves = history.map((step, move) => {
      const desc = move ?
                      'Go to move #' + move :
                      'Go to game start';
      return (
        /* use move 4 key cuz moves are never reordered or deleted */
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    
    let status;
    winner ?
      status ='Winner: ' + winner :
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    
    return (
      <div className='game'>
        <div className='gameBoard'>
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)} />
          

        </div>

        <div className='game-info'>
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}