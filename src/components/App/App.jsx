import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import React from 'react';
import { fetchPhotos } from 'Services/api';

export class App extends React.Component {
  state = {
    loading: false,
    error: null,
    images: [],
    page: 1,
    per_page: 12,
    q: '',
    isOpen: false,
    totalPages: 0,
    first_load: false,
  };

  // async componentDidUpdate(_, prevState) {
  //   const { per_page, page, q } = this.state;
  //   if (this.state.q !== prevState.q || this.state.page !== prevState.page) {
  //     this.fetchImages(per_page, page, q);
  //   }
  // }

  async componentDidMount() {
    const { per_page, page } = this.state;
    this.getImages({ per_page, page });
  }

  getImages = async params => {
    const { q, per_page, page } = this.state;
    this.setState({ loading: true });
    try {
      const data = await fetchPhotos(params);

      const { hits, totalHits } = data;

      this.setState(prevState => ({ images: [...prevState.images, ...hits] }));
      this.setState({ totalPages: Math.ceil(totalHits / hits) });
      this.setState({ loading: false });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loading: false });
    }
  };

  handleLoarMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, total, loading, page } = this.state;
    return (
      <div>
        <Searchbar />
        <ImageGallery images={images} />
        {}
        <Button />
      </div>
    );
  }
}
