import React from 'react';
import ReactDOM from 'react-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab /* faTumblrSquare, faTwitterSquare */ } from '@fortawesome/free-brands-svg-icons';
import './index.css';

library.add(fab /* faTumblrSquare, faTwitterSquare */);


/* TODOs
  4 - figure out how to bundle it for the desolidstate website
  4.5 - get the newDevCity.io website and bundle it there.
*/

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [{
        quote: '',
        author: ''
      }],
      currQuote: {
        quote: '',
        author: ''
      },
      clrScheme: {
        bkg: 'elem-clr1',
        txt: 'txt-clr1'
      }
    };
  }

  async componentDidMount() {
    try {
      const blob = await fetch('https://raw.githubusercontent.com/timcombs/marx-headmon/master/quotes.json');
      const text = await blob.text();
      const json = await JSON.parse(text);
      this.setState({
        quotes: json.quotes,
        currQuote: this.getQuote(json.quotes)
      });
    }catch(err){
      console.log(err);
    }

  }
  
  handleClick(e) {
    if (e.target.name === 'newquote') {
      this.setState({
        currQuote: this.getQuote(this.state.quotes)
      });
      this.changeColors();
    }else if (e.target.name === 'twitter') {
      window.open('https://twitter.com/intent/tweet?hashtags=quotes&text=' + encodeURIComponent(`${this.state.currQuote.quote} -${this.state.currQuote.author}`), '_blank');
    }else if (e.target.name === 'tumblr') {
    window.open('https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' + encodeURIComponent(this.state.currQuote.author) + '&content=' + encodeURIComponent(this.state.currQuote.quote)+'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button', '_blank');
    }

  }

  getQuote(arr) {
    const len = arr.length;
    const rnd = Math.floor(Math.random() * len);
    return arr[rnd];
  }

  changeColors() {
    const buttons = document.querySelectorAll('.button');
    const bkg = document.querySelector('body');
    const quoteText = document.querySelector('.quote');

    const rnd = Math.floor(Math.random() * 4) + 1;

    buttons.forEach((button) => {
      button.classList.replace(this.state.clrScheme.bkg, `elem-clr${rnd}`);
      button.classList.replace(this.state.clrScheme.txt, `txt-clr${rnd}`);
    });

    bkg.classList.contains(this.state.clrScheme.bkg) ?
      bkg.classList.replace(this.state.clrScheme.bkg, `elem-clr${rnd}`) :
      bkg.classList.add(`elem-clr${rnd}`);
    
    quoteText.classList.replace(this.state.clrScheme.txt, `txt-clr${rnd}`);

    this.setState({
      clrScheme: {
        bkg: `elem-clr${rnd}`,
        txt: `txt-clr${rnd}`
      }
    })

  }

  render() {
    console.log(window.innerWidth);
    return (
      <div>
        <section className='card'>
          <Quote currQuote={this.state.currQuote} />
          <TwitterButton onClick={(e) => this.handleClick(e)} />
          <TumblrButton onClick={(e) => this.handleClick(e)} />
          <NewQuoteButton onClick={(e) => this.handleClick(e)} />
        </section>
      </div>
    );
  }
}

function NewQuoteButton(props) {
  return (
    <button className='button getquote elem-clr1 txt-clr1' name='newquote' onClick={props.onClick}>New Quote</button>
  );
}

function TwitterButton(props) {
  return (
    <button className='button social elem-clr1 txt-clr1' name='twitter' onClick={props.onClick}><FontAwesomeIcon icon={['fab', 'twitter']} /></button>
  );
}

function TumblrButton(props) {
  return (
    <button className='button social elem-clr1 txt-clr1' name='tumblr' onClick={props.onClick}><FontAwesomeIcon icon={['fab', 'tumblr']} /></button>
  );
}

function Quote(props) {
  return (
    <div>
      <p className='quote txt-clr1'>“{props.currQuote.quote}”</p>
      <p className='author'>- {props.currQuote.author}</p>
    </div>
  );
}

// ++++++++++++++++++++++++++++++++++++++++++++++
ReactDOM.render(
  <App />,
  document.getElementById('root')
);