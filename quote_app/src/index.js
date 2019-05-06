import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/* USER STORIES
  1: I can see a wrapper element with a corresponding id="quote-box".
  2: Within #quote-box, I can see an element with a corresponding id="text".
  3: Within #quote-box, I can see an element with a corresponding id="author".
  4: Within #quote-box, I can see a clickable element with a corresponding id="new-quote".
  5: Within #quote-box, I can see a clickable element with a corresponding id="tweet-quote".
  6: On first load, my quote machine displays a random quote in the element with id="text".
  7: On first load, my quote machine displays the random quote's author in the element with id="author".
  8: When the #new-quote button is clicked, my quote machine should fetch a new quote and display it in the #text element.
  9: My quote machine should fetch the new quote's author when the #new-quote button is clicked and display it in the #author element.
  10: I can tweet the current quote by clicking on the #tweet-quote a element. This a element should include the "twitter.com/intent/tweet" path in it's href attribute to tweet the current quote.
  11: The #quote-box wrapper element should be horizontally centered. Please run tests with browser's zoom level at 100% and page maximized.
*/

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [{
        quote: '',
        author: ''
      }]
    };
  }

  async componentDidMount() {
    try {
      const blob = await fetch('https://raw.githubusercontent.com/timcombs/marx-headmon/master/quotes.json');
      const text = await blob.text();
      const json = JSON.parse(text);
      this.setState({
        quotes: json.quotes
      });
      }catch(err){
        console.log(err);
      }
  }

  render() {
    return (
      <div>
        <section className='card'>
          <Quote quotes={this.state.quotes} />
          {/* <AllQuotes quotes={this.state.quotes} /> */}
          <button className='button'>twitter</button>
          <button className='button'>tumblr</button>
          <button className='button getquote'>New Quote</button>
        </section>
      </div>
    );
  }
};

function Quote(props) {
  const quotes = props.quotes;
  const len = props.quotes.length;
  const rnd = Math.floor(Math.random() * len);

  const randQuote = quotes[rnd].quote;
  const randAuthor = quotes[rnd].author;


  return (
    <div>
      <p className='quote'>{randQuote}</p>
      <p className='author'>{randAuthor}</p>
    </div>
  );
}

// function AllQuotes(props) {
//    const quotes = props.quotes.map((quote) => {
//       return (
//         <div key={quote.author + quote.quote.slice(0, 10)}>{quote.quote}</div>
//       );
//     });
//   console.log(props);

//   return (
//     <div>{quotes}</div>
//   );
// }

// ++++++++++++++++++++++++++++++++++++++++++++++
ReactDOM.render(
  <App />,
  document.getElementById('root')
);