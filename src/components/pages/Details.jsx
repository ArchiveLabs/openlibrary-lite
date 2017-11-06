import React from 'react';
import {Page, ContentBlock, Navbar, Link, Button, ButtonsSegmented} from 'framework7-react';
import jQuery from 'jquery';

/**
 * Details page
 */

export const Details = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'identifier': props.identifier,
      'metadata': null
    };
  }

  fetchData(identifier) {
    jQuery.getJSON({
      'url': 'https://archive.org/metadata/' + identifier + '/?callback=?'
    }).then((data) => {
      this.setState({'metadata': data});
      // let updatedCarousels = this.state.carousels;
      // updatedCarousels[key] = {
      //   docs: data.response.docs,
      //   numFound: data.response.numFound,
      //   start: data.response.start,
      // };
      // this.setState({'carousels': updatedCarousels});
      // console.log('after second set state');
    });
  }

  componentDidMount() {
    this.fetchData(this.state.identifier);
  }

  renderDetailsEl(metadata) {

    if (metadata == null) {
      return (<div>Loading...</div>);
    }

    metadata = metadata.metadata; // just use metadata
    let availability = metadata.loans__status__status;

    let readButtonEl, audioButtonEl;
    if (availability == 'UNAVAILABLE') {
      readButtonEl = <Button
        external={true}
        href={'https://archive.org/stream/' + metadata.identifier}>
          Join Waitlist
      </Button>
    } else if (availability == 'AVAILABLE') {
      readButtonEl = <Button
        external={true}
        href={'https://archive.org/stream/' + metadata.identifier}>
          Borrow
      </Button>
    } else {
      readButtonEl = <Button
        external={true}
        href={'https://archive.org/stream/' + metadata.identifier}>
          Read Now
      </Button>
      audioButtonEl = <Button
        external={true}
        href={'http://api.archivelab.org:8000/?ocaid=' + metadata.identifier}>
          Audio
      </Button>
    }

    let descEl;
    // TODO replace nl with br
    if (metadata.description) {
      descEl = (<div>
        <h3>Description</h3>
        {metadata.description}
      </div>)
    }

    let authors;
    let authorLinks;
    if (metadata.creator instanceof Array) {
      authors = metadata.creator
    } else {
      authors = [metadata.creator]
    }
    authorLinks = (authors.map((author, i) => <Link href={"/search/creator:" + author}>{author}</Link>))

    return (<div>
      <div className="details-top">
        <div className="details-top-image-wrapper">
          <img
              className="details-image"
              src={'https://archive.org/services/img/' + metadata.identifier}
              alt={metadata.title}
          />
        </div>
        <div className="details-top-info">
          <div className="details-top-info-text">
            <div className="details-title">{metadata.title}</div>
            <div className="details-author">by {authorLinks}</div>
          </div>
          <div>
            {readButtonEl}
            {audioButtonEl}
            {/*<Button>Favorite</Button>*/}
          </div>
        </div>
      </div>
      <div className="details-bottom">
        <div>
          {descEl}
        </div>
      </div>
    </div>);
  }

  render() {
    return (<Page>
        <Navbar title="Details" backLink="Back" sliding />
        <ContentBlock inner>
            <div>
              {this.renderDetailsEl(this.state.metadata)}
            </div>
        </ContentBlock>
    </Page>);
  }
}
