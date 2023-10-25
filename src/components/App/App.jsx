import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import React from 'react';
import { fetchPhotos } from 'Services/api';

export class App extends React.Component {
  render() {
    return (
      <div>
        <Searchbar />
        <ImageGallery />
        <Button />
      </div>
    );
  }
}
