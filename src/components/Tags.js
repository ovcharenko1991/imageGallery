import React from 'react';
import {WithContext as ReactTags} from 'react-tag-input';

import './Tags.styles.css';

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class Tags extends React.Component {
  handleDelete = (i) => {
    const { albumTags, setAlbumTags } = this.props;

    setAlbumTags(albumTags.filter((tag, index) => index !== i));
  };

  handleAddition = (tag) => {
    const tags = this.props.albumTags.slice();

    tags.push(tag);
    this.props.setAlbumTags(tags);
  };

  handleDrag = (tag, currPos, newPos) => {
    const { albumTags, setAlbumTags } = this.props;

    const newTags = albumTags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    setAlbumTags(newTags);
  };

  render() {
    const { albumTags } = this.props;

    return (
      <div className="Tags">
        <ReactTags
          tags={albumTags}
          autofocus={false}
          handleDelete={this.handleDelete}
          handleAddition={this.handleAddition}
          handleDrag={this.handleDrag}
          delimiters={delimiters}
        />
      </div>
    )
  }
};

export default Tags;