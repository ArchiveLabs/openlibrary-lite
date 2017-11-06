import React from 'react';
import {Page, ContentBlock, Navbar, Link, Button} from 'framework7-react';
import jQuery from 'jquery';

/**
 * Search results page
 */

export const Search = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'search': {},
      'query': props.query
    };
  }

  fetchData(q) {
    jQuery.getJSON({
      'url': 'https://archive.org/advancedsearch.php?callback=?',
      'data': {
        'q': q,
        'output': 'json',
        'rows': 50,
        'fl': 'identifier,title,loans__status__status,creator'
      }
    }).then((data) => {
      console.log(data);
      this.setState({'search': {
        docs: data.response.docs,
        numFound: data.response.numFound,
        start: data.response.start,
        'q': q
      }});
    });
  }

  componentDidMount() {
    this.fetchData(this.state.query);
  }

  render() {
    let resultEls;

    if (this.state.search.docs) {
      resultEls = <div className="search-results">
        {this.state.search.docs.map((row) => {
          return (<Link className="search-row" href={"/details/" + row.identifier}>
              <div className="search-row-image-wrapper">
                <img
                  className="search-image"
                  src={'https://archive.org/services/img/' + row.identifier}
                  alt={row.title}
                />
              </div>
              <div className="search-row-info">
                <div className="search-title">{row.title}</div>
                <div className="search-author">{row.creator}</div>
                <div>
                  <Button
                      external={true}
                      href={'https://archive.org/stream/' + row.identifier}>
                      {row.loans__status__status === 'UNAVAILABLE' ? 'Join Waitlist' : row.loans__status__status === 'AVAILABLE' ? 'Borrow' : 'Read Now'}
                  </Button>
                  <Button
                    external={true}
                    href={'http://api.archivelab.org:8000/?ocaid=' + row.identifier}>
                      Audio
                  </Button>
                </div>
              </div>
          </Link>)
        })}
      </div>
    }

    return (<Page>
        <Navbar title="Search Results" backLink="Back" sliding />
        <ContentBlock inner>
            <div>
              {resultEls}
            </div>
        </ContentBlock>
    </Page>);
  }
}