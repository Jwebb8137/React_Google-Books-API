import React, { Component } from 'react'
import './App.css'
import SearchBar from './SearchBar/SearchBar'
import BookList from './BookList/BookList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

const element = <FontAwesomeIcon icon={faCoffee} />

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: 'Fantasy',
      format: '',
      type: '',
      books: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    console.log(target.name)
    this.setState({searchQuery: e.target.value})
  }

  handleSubmit(e) {
    console.log(this.state.searchQuery);
    e.preventDefault();
    const APIKey = 'AIzaSyBfjFVbvpf9Dov_3xi0uRyZsh4Y3jHTb8c'
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.state.searchQuery}&key=${APIKey}`)
      .then(response => {
        // check if response is ok
        console.log('About to check for errors');
        if(!response.ok) {
          console.log('An error did occur, let\'s throw an error.');
          throw new Error('Something went wrong'); // throw an error
        }
        return response; // ok, so just continue
      })
      .then(response => response.json())
      .then(data => {
        this.setState({
          books: data.items
        });
      })
      .catch(err => {
        // this catch handles the error condition
        console.log('Handling the error here.', err);
      });
  }

  

  render() {
    return (
      <div>
        <div className='container__heading'>
    <h1 className='main__heading'>The Dusty Bookshelf {element}</h1>
        </div>
        <div className='search__box'>
          <SearchBar handleSubmit={this.handleSubmit} state={this.state} handleChange={e => this.handleChange(e)}/>
        </div>
        <div className="books__box">
          <BookList state={this.state.books}/>
        </div>
      </div>
    )
  }
}

export default App