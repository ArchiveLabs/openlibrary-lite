import React from 'react';
import {Page, ContentBlock, Navbar, Link} from 'framework7-react';
import jQuery from 'jquery';


/**
 * Browse page
 */

function getStatusText(availability) {
  if (availability == 'UNAVAILABLE') {
    return 'Join Waitlist';
  } else if (availability == 'AVAILABLE') {
    return 'Borrow';
  } else {
    return 'Read now';
  }
}

export const Browse = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'carousels': {},
    };
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  fetchData() {
    let dataUrls = {
      'Books we love': 'NOT loans__status__status:UNAVAILABLE AND openlibrary_work:(* ) AND languageSorter:("English") AND openlibrary_subject:openlibrary_staff_picks',
      'Recently Returned': 'collection:(inlibrary) AND loans__status__status:AVAILABLE AND openlibrary_work:(*)',
      'Romance': 'collection:(inlibrary) AND NOT loans__status__status:UNAVAILABLE AND openlibrary_work:(*) AND subject:(romance)',
      'Kids': 'collection:(inlibrary) AND loans__status__status:AVAILABLE AND openlibrary_work:(*) AND (creator:("parish, Peggy") OR creator:("avi") OR title:("goosebumps") OR creator:("Dahl, Roald") OR creator:("ahlberg, allan") OR creator:("Seuss, Dr") OR creator:("Carle, Eric") OR creator:("Pilkey, Dav"))',
      'Comics': 'collection:(inlibrary) AND loans__status__status:AVAILABLE AND openlibrary_work:(*) AND (subject:"comics" OR creator:("Gary Larson") OR creator:("Larson, Gary") OR creator:("Charles M Schulz") OR creator:("Schulz, Charles M") OR creator:("Jim Davis") OR creator:("Davis, Jim") OR creator:("Bill Watterson") OR creator:("Watterson, Bill") OR creator:("Lee, Stan"))',
      'Thrillers': 'collection:(inlibrary) AND loans__status__status:AVAILABLE AND openlibrary_work:(*) AND (creator:"Clancy, Tom" OR creator:"King, Stephen" OR creator:"Clive Cussler" OR creator:("Cussler, Clive") OR creator:("Dean Koontz") OR creator:("Koontz, Dean") OR creator:("Higgins, Jack")) AND !publisher:"Pleasantville, N.Y. : Reader\'s Digest Association" AND languageSorter:"English"',
      'Success': 'collection:(inlibrary) AND loans__status__status:AVAILABLE AND openlibrary_work:(*) AND subject:(success)',
      'Textbooks': 'collection:(inlibrary) AND loans__status__status:AVAILABLE AND openlibrary_work:(*) AND openlibrary_subject:textbooks'
    };

    // Initialize with empty data
    let newCarousels = {};
    let key;
    for (key in dataUrls) {
      if (!dataUrls.hasOwnProperty(key)) continue;
      newCarousels[key] = {docs: [], numFound: 0, start: 0};
    }

    this.setState({'carousels': newCarousels});

    console.log('after first set state');
    for (key in dataUrls) {
      if (!dataUrls.hasOwnProperty(key)) continue;
      this.fetchSingleData(key, dataUrls[key]);
    }
  }

  // Fetch the data via ajax
  fetchSingleData(key, q) {
    jQuery.getJSON({
      'url': 'https://archive.org/advancedsearch.php?callback=?',
      'data': {
        'q': q,
        'output': 'json',
        'rows': 10,
        'fl': 'identifier,title,loans__status__status'
      }
    }).then((data) => {
      let updatedCarousels = this.state.carousels;
      updatedCarousels[key] = {
        docs: data.response.docs,
        numFound: data.response.numFound,
        start: data.response.start,
        'q': q
      };
      this.setState({'carousels': updatedCarousels});

    });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    let carouselKeys = Object.keys(this.state.carousels);
    let carouselsEl = carouselKeys.map((key) => {
      return (<div>
        <h3 className="carousel-title"><Link href={"search/" + this.state.carousels[key].q}>{key}</Link></h3>
        <div className="carousel-row">
          {this.state.carousels[key].docs.map((row) => {
            return (<Link href={"details/" + row.identifier}>
              <div class="carousel-image-wrap">
                <img
                    className="carousel-image"
                    src={'https://archive.org/services/img/' + row.identifier}
                    alt={row.title}
                />
                <span>{getStatusText(row.loans__status__status)}</span>
              </div>
            </Link>)
          })}
        </div>

      </div>);
    });
    console.log(carouselsEl);

    return (<Page>
        <Navbar title="Browse" backLink="Back" sliding />
        <ContentBlock inner>
            <p>Browse Open Library</p>
            <div>
              {carouselsEl}
            </div>
        </ContentBlock>
    </Page>);
  }
}
