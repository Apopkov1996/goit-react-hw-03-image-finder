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
    per_page: 40,
    q: '',
    isOpen: false,
    totalPages: 0,
    first_load: false,
  };

  async componentDidMount() {
    const { per_page, page } = this.state;
    this.getImages({ per_page, page });
  }

  async componentDidUpdate(_, prevState) {
    const { per_page, page, q } = this.state;
    if (this.state.page !== prevState.page) {
      this.getImages({ per_page, page, q });
    }
  }

  getImages = async params => {
    const { q, per_page, page } = this.state;
    this.setState({ loading: true });
    try {
      const data = await fetchPhotos(params);

      const { hits, totalHits } = data;

      console.log(hits.length);
      console.log(totalHits);

      this.setState(prevState => ({ images: [...prevState.images, ...hits] }));
      this.setState({
        totalPages: Math.ceil(totalHits / hits.length),
      });
      console.log(this.state.totalPages);

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
    const { images, total, loading, page, totalPages } = this.state;
    return (
      <div>
        <Searchbar />
        <ImageGallery images={images} />
        {totalPages !== page ? <Button onClick={this.handleLoarMore} /> : null}
      </div>
    );
  }
}
