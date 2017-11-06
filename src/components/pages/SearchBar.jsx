import React, {Component} from 'react';
import {Link, FormInput} from 'framework7-react';
import {getFramework7} from '../App';

export class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
          'searchValue': ""
        };

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        //this.getFramework7 = this.getFramework7.bind(this)
      }

    handleChange(event) {
        this.setState(
            {'searchValue': event.target.value}
        );
    }

    handleSubmit(event) {
        console.log(this.state.searchValue)
        event.preventDefault();
        // let query = encodeURIComponent('collection:texts ' + this.state.searchValue)
        // //window.location.href = "/#!/search/" + query
        // //window.location.hash = "#!/search/" + this.state.searchValue
        // window.location.assign("/#!/search/" + query)
        getFramework7().mainView.router.loadPage('/test/')
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <FormInput type="text" placeholder="Search" onChange={this.handleChange} value={this.state.searchValue} />
                </form>
            </div>
        );
    }
};
