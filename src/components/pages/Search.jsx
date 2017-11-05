import React from 'react';
import {Page, ContentBlock, Navbar, Link} from 'framework7-react';
import jQuery from 'jquery';

/**
 * Search results page
 */

export const Search = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'search': {},
    };
  }

  fetchData(query) {
    jQuery.getJSON({
      'results': 'https://archive.org/advancedsearch.php?' + query + '/?callback=?'
    }).then((data) => {
      this.setState({'search': data});
    });
  }

  componentDidMount() {
    this.state.query = 'q=collection%3A%28inlibrary%29+AND+loans__status__status%3AAVAILABLE+AND+openlibrary_work%3A%28*%29+AND+languageSorter%3A%28%22English%22%29+AND+openlibrary_subject%3Aopenlibrary_staff_picks&fl%5B%5D=identifier&fl%5B%5D=title&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=50&page=1&output=json')
    this.fetchData(this.state.query);
  }

  render() {
    let resultKeys = Object.keys(this.state.search);
    let result = resultKeys.map((key) => {
      return (<div>
      <div className="result-top">
        <div className="result-top-image-wrapper">
          <img
              className="result-image"
              src={'https://archive.org/services/img/' + result.identifier}
              alt={result.title}
          />
        </div>
        <div className="result-top-info">
          <div className="result-top-info-text">
            {result.identifier}<br/>
            {result.title}
          </div>
          <div>
            <Button>Read</Button>
          </div>
        </div>
      </div>
      <div className="result-bottom">
        {result.description}
      </div>
    </div>);
    });

    return (<Page>
        <Navbar title="Searc Results" backLink="Back" sliding />
        <ContentBlock inner>
            <div>
              {result}
            </div>
        </ContentBlock>
    </Page>);
  }
}
