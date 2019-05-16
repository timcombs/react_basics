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
      quotes: [],
      currQuote: {},
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
      const { quotes } = await JSON.parse(text);
      this.setState({
        quotes,
        currQuote: this.getQuote(quotes)
      });
    }catch(err){
      console.log(err);
    }

  }
  
  handleClick(e) {
    const { quotes, currQuote: { quote, author } } = this.state;
    const clicked = e.target.name;

    if (clicked === 'newquote') {
      this.setState({
        currQuote: this.getQuote(quotes)
      });
      this.changeColors();
    }else if (clicked === 'twitter') {
      window.open('https://twitter.com/intent/tweet?hashtags=quotes&text=' +
                  encodeURIComponent(
                  `${quote} -${author}`),
                  '_blank');
    }else if (clicked === 'tumblr') {
    window.open('https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' +
                encodeURIComponent(author) + '&content=' +
                encodeURIComponent(quote) +
                '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button',
                '_blank');
    }

  }

  getQuote(arr) {
    const len = arr.length;
    const rnd = Math.floor(Math.random() * len);
    return arr[rnd];
  }

  changeColors() {
    const rnd = Math.floor(Math.random() * 4) + 1;

    this.setState({
      clrScheme: {
        bkg: `elem-clr${rnd}`,
        txt: `txt-clr${rnd}`
      }
    });

  }

  render() {
    // hack to change background color of body
    document.body.classList = '';
    document.body.classList.add(this.state.clrScheme.bkg);
    return (
      <div className={`app ${this.state.clrScheme.bkg}`}>
        <section className='card' >
          <Quote clr={this.state.clrScheme} currQuote={this.state.currQuote} />
          <TwitterButton clr={this.state.clrScheme} onClick={(e) => this.handleClick(e)} />
          <TumblrButton clr={this.state.clrScheme} onClick={(e) => this.handleClick(e)} />
          <NewQuoteButton clr={this.state.clrScheme} onClick={(e) => this.handleClick(e)} />
        </section>
      </div>
    );
  }
}

function NewQuoteButton(props) {
  return (
    <button className={`button getquote ${props.clr.bkg} ${props.clr.txt}`} name='newquote' onClick={props.onClick}>New Quote</button>
  );
}

function TwitterButton(props) {
  return (
    <button className={`button social ${props.clr.bkg} ${props.clr.txt}`} name='twitter' onClick={props.onClick}><FontAwesomeIcon icon={['fab', 'twitter']} /></button>
  );
}

function TumblrButton(props) {
  return (
    <button className={`button social ${props.clr.bkg} ${props.clr.txt}`} name='tumblr' onClick={props.onClick}><FontAwesomeIcon icon={['fab', 'tumblr']} /></button>
  );
}

function Quote(props) {
  return (
    <div>
      <p className={`quote ${props.clr.txt}`}>“{props.currQuote.quote}”</p>
      <p className='author'>- {props.currQuote.author}</p>
    </div>
  );
}

// ++++++++++++++++++++++++++++++++++++++++++++++
ReactDOM.render(
  <App />,
  document.getElementById('root')
);