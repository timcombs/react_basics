import React, { Component } from 'react';

import Person from './Person/Person';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <h1>yô̟̔̈ͯ̒ur͚̰̠̲ͫ̃̀̇̀͋ friend ̪͌͑ͨͅis̎͆ͪ̽͒Za͙͉̣͗͌ͫ͒̐́ͯlg̖͖̝̰͑͋͊́̎̈́͗̚o ͉̥̗̣̦̈́̌̎̆ͯ̾te̎ͩ̑ͤ̈́̄xt</h1>
        <p>but this is not</p>
        <Person name='Frida' age='104'/>
        <Person name='Bob' age='84'/>
        <Person name='LaBradford' age='14'>Hobbies: none</Person>
        <Person name='unknown' age='infinite'/>
      </div>
    );
  }
}

export default App;