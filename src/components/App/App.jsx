import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';
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
    imageModal: null,
  };

  async componentDidMount() {
    const { per_page, page } = this.state;
    this.getImages({ per_page, page });
  }

  async componentDidUpdate(_, prevState) {
    const { per_page, page, q } = this.state;
    if (this.state.q !== prevState.q || this.state.page !== prevState.page) {
      this.getImages({ per_page, page, q });
    }
  }

  getImages = async params => {
    this.setState({ loading: true });
    try {
      const data = await fetchPhotos(params);

      const { hits, totalHits } = data;

      this.setState(prevState => ({ images: [...prevState.images, ...hits] }));
      this.setState({
        totalPages: Math.ceil(totalHits / hits.length),
      });

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

  handleSubmit = query => {
    this.setState({
      q: query,
      images: [],
      currentPage: 1,
    });
  };

  handleOpenMOdal = largeImageURL => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
      imageModal: largeImageURL,
    }));
  };

  render() {
    const { images, total, loading, page, totalPages, imageModal, isOpen } =
      this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery handleOpenMOdal={this.handleOpenMOdal} images={images} />
        {totalPages !== page ? <Button onClick={this.handleLoarMore} /> : null}
        {isOpen ? (
          <Modal close={this.handleOpenleModal}>
            <img
              src={imageModal}
              alt="Large size of your chosen img"
              width="100"
              height="100"
            />
          </Modal>
        ) : null}

        {/* <Modal /> */}
      </div>
    );
  }
}
