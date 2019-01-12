import React, {Component, Fragment, createRef} from 'react';
import PostData from '../data/posts.json';
import Tags from './Tags.js';

import './PostList.styles.css';

class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      tags: PostData.reduce(
        (dictionary, album) => Object.assign(dictionary, { [album.id]: [] }),
        {}
      ),
    };

    this.inputRef = createRef();
    this.inputTimer = null;
  }

  componentDidMount() {
    if (this.inputRef.current) {
      this.inputRef.current.focus();
    }

    const localStoredTags = localStorage.getItem('albumTagsDictionary');

    if (localStoredTags) {
      // JSON.parse could throw an error if stored string value has wrong format
      try {
        this.setState({ tags: JSON.parse(localStoredTags) });
      } catch(e) {}
    }
  }

  handleChange = (e) => this.setState({ value: e.target.value });

  setAlbumTags = (albumId, albumTags) => {
    this.setState((prevState) => {
      const newTags = Object.assign(prevState.tags, { [albumId]: albumTags });

      localStorage.setItem('albumTagsDictionary', JSON.stringify(newTags));

      return { tags: newTags };
    });
  };

  render() {
    const { value, tags } = this.state;

    const filteredAlbums = PostData.filter(album => album.title.indexOf(value) !== -1);

    return (
      <Fragment>
        <div className='page-header'>
          <h1>Gallery</h1>
          <label htmlFor="name">Search:&nbsp;</label>
          <input
            ref={this.inputRef}
            type="text"
            name="name"
            placeholder="Search"
            onChange={this.handleChange}
          />
        </div>
        <div>
          {filteredAlbums.map((album) => {
            const {title, id, url} = album;

            return (
              <div key={`album-${id}`} className="wrapper">
                <div className="wrap">
                  <img src={url} alt="img" className="img"/>
                  <p>{title}</p>
                  <Tags
                    albumTags={tags[id]}
                    setAlbumTags={(tags) => this.setAlbumTags(id, tags)}
                  />
                </div>
              </div>
            );
          })}
          {!Boolean(filteredAlbums.length) && <div>Nothing found</div>}
        </div>
      </Fragment>
    );
  }
}

export default PostList;
