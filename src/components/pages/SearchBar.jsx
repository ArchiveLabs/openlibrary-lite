import React, {Component} from 'react';
import {Link, FormInput} from 'framework7-react';
import {getFramework7} from '../App';

export class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
          'searchValue': ''
        };

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
      }

    handleChange(event) {
        this.setState(
            {'searchValue': event.target.value}
        );
    }

    handleSubmit(event) {
        console.log(this.state.searchValue)
        event.preventDefault();
        let query =  encodeURIComponent('(collection:texts OR collection:inlibrary) AND ' + this.state.searchValue)
        window.getFramework7().mainView.router.load({'url':'search/' + query})
    }

    render() {
        return (
            <div className="search-bar">
                <form onSubmit={this.handleSubmit}>
                    <span className="search-label">Search</span>
                    <FormInput type="text" placeholder="Search" onChange={this.handleChange} value={this.state.searchValue} />
                    <input type="submit" name="Search"/>
                </form>
            </div>
        );
    }
};
