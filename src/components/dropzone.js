import React from 'react';
import Dropzone from 'react-dropzone';

class dropImage extends React.Component {
  render() {
    return (
      <Dropzone onDrop={this.onDrop}>
        <p>Try dropping some files here, or click to select files to upload.</p>
      </Dropzone>
    );
  }
}

export default dropImage;
