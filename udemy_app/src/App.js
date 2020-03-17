import React, { Component } from 'react';

import Person from './Person/Person';
import './App.css';

class App extends Component {
  state = {
    persons: [
      { name: 'Frida', age: 104 },
      { name: 'Bob', age: 84 },
      { name: 'LaBradford', age: 14 },
      { name: 'unknown', age: 'infinite' }
    ]
  }

  render() {
    return (
      <div className='App'>
        <h1>yô̟̔̈ͯ̒ur͚̰̠̲ͫ̃̀̇̀͋ friend ̪͌͑ͨͅis̎͆ͪ̽͒Za͙͉̣͗͌ͫ͒̐́ͯlg̖͖̝̰͑͋͊́̎̈́͗̚o ͉̥̗̣̦̈́̌̎̆ͯ̾te̎ͩ̑ͤ̈́̄xt</h1>
        <p>but this is not</p>
        <br></br>
        <button>Switch Name</button>
        <Person
          name={this.state.persons[0].name}
          age={this.state.persons[0].age}
        />
        <Person
          name={this.state.persons[1].name}
          age={this.state.persons[1].age}
        />
        <Person
          name={this.state.persons[2].name}
          age={this.state.persons[2].age}
        >Hobbies: none
        </Person>
        <Person
          name={this.state.persons[3].name}
          age={this.state.persons[3].age}
        />
      </div>
    );
  }
}

export default App;