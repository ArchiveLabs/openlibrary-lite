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
            {metadata.identifier}<br/>
            {metadata.title}
          </div>
          <div>
            <Button>Read</Button>
            {/*<Button>Favorite</Button>*/}
          </div>
        </div>
      </div>
      <div className="details-bottom">
        {metadata.description}
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
