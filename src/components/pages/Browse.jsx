import React from 'react';
import {Page, ContentBlock, Navbar, Link} from 'framework7-react';
import jQuery from 'jquery';




/**
 * Browse page
 */

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
      'Books we love': 'https://archive.org/advancedsearch.php?q=collection%3A%28inlibrary%29+AND+loans__status__status%3AAVAILABLE+AND+openlibrary_work%3A%28*%29+AND+languageSorter%3A%28%22English%22%29+AND+openlibrary_subject%3Aopenlibrary_staff_picks&fl%5B%5D=identifier&fl%5B%5D=title&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=10&page=1&output=json&save=yes',
      'Recently Returned': 'https://archive.org/advancedsearch.php?q=collection%3A%28inlibrary%29+AND+loans__status__status%3AAVAILABLE+AND+openlibrary_work%3A%28*%29&fl%5B%5D=identifier&fl%5B%5D=title&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=10&page=1&output=json&save=yes',
      'Romance': 'https://archive.org/advancedsearch.php?q=collection%3A%28inlibrary%29+AND+loans__status__status%3AAVAILABLE+AND+openlibrary_work%3A%28*%29+AND+subject%3A%28romance%29&fl%5B%5D=identifier&fl%5B%5D=title&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=10&page=1&output=json&save=yes',
      'Kids': 'https://archive.org/advancedsearch.php?q=collection%3A%28inlibrary%29+AND+loans__status__status%3AAVAILABLE+AND+openlibrary_work%3A%28*%29+AND+%28creator%3A%28%22parish%2C+Peggy%22%29+OR+creator%3A%28%22avi%22%29+OR+title%3A%28%22goosebumps%22%29+OR+creator%3A%28%22Dahl%2C+Roald%22%29+OR+creator%3A%28%22ahlberg%2C+allan%22%29+OR+creator%3A%28%22Seuss%2C+Dr%22%29+OR+creator%3A%28%22Carle%2C+Eric%22%29+OR+creator%3A%28%22Pilkey%2C+Dav%22%29%29&fl%5B%5D=identifier&fl%5B%5D=title&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=10&page=1&output=json&callback=callback&save=yes',
      'Comics': 'https://archive.org/advancedsearch.php?q=collection%3A%28inlibrary%29+AND+loans__status__status%3AAVAILABLE+AND+openlibrary_work%3A%28*%29+AND+%28subject%3A%22comics%22+OR+creator%3A%28%22Gary+Larson%22%29+OR+creator%3A%28%22Larson%2C+Gary%22%29+OR+creator%3A%28%22Charles+M+Schulz%22%29+OR+creator%3A%28%22Schulz%2C+Charles+M%22%29+OR+creator%3A%28%22Jim+Davis%22%29+OR+creator%3A%28%22Davis%2C+Jim%22%29+OR+creator%3A%28%22Bill+Watterson%22%29+OR+creator%3A%28%22Watterson%2C+Bill%22%29+OR+creator%3A%28%22Lee%2C+Stan%22%29%29&fl%5B%5D=identifier&fl%5B%5D=title&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=10&page=1&output=json&save=yes',
      'Thrillers': 'https://archive.org/advancedsearch.php?q=collection%3A%28inlibrary%29+AND+loans__status__status%3AAVAILABLE+AND+openlibrary_work%3A%28*%29+AND+%28creator%3A%22Clancy%2C+Tom%22+OR+creator%3A%22King%2C+Stephen%22+OR+creator%3A%22Clive+Cussler%22+OR+creator%3A%28%22Cussler%2C+Clive%22%29+OR+creator%3A%28%22Dean+Koontz%22%29+OR+creator%3A%28%22Koontz%2C+Dean%22%29+OR+creator%3A%28%22Higgins%2C+Jack%22%29%29+AND+%21publisher%3A%22Pleasantville%2C+N.Y.+%3A+Reader%27s+Digest+Association%22+AND+languageSorter%3A%22English%22&fl%5B%5D=identifier&fl%5B%5D=title&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=10&page=1&output=json&save=yes',
      'Success': 'https://archive.org/advancedsearch.php?q=collection%3A%28inlibrary%29+AND+loans__status__status%3AAVAILABLE+AND+openlibrary_work%3A%28*%29+AND+subject%3A%28success%29&fl%5B%5D=identifier&fl%5B%5D=title&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=10&page=1&output=json&save=yes',
      'Textbooks': 'https://archive.org/advancedsearch.php?q=collection%3A%28inlibrary%29+AND+loans__status__status%3AAVAILABLE+AND+openlibrary_work%3A%28*%29+AND+openlibrary_subject%3Atextbooks&fl%5B%5D=identifier&fl%5B%5D=title&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=10&page=1&output=json&save=yes'
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
  fetchSingleData(key, url) {
    jQuery.getJSON({'url': url + '&callback=?'}).then((data) => {
      let updatedCarousels = this.state.carousels;
      updatedCarousels[key] = {
        docs: data.response.docs,
        numFound: data.response.numFound,
        start: data.response.start,
      };
      this.setState({'carousels': updatedCarousels});
      console.log('after second set state');

    });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    let carouselKeys = Object.keys(this.state.carousels);
    let carouselsEl = carouselKeys.map((key) => {
      return (<div>
        <h3>{key}</h3>
        <div className="carousel-row">
          {this.state.carousels[key].docs.map((row) => {
            return (<Link href={"/details/" + row.identifier}>
              <img
                  className="carousel-image"
                  src={'https://archive.org/services/img/' + row.identifier}
                  alt={row.title}
              />
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
