import React from 'react';
import '../stylesheets/app.scss';
import Header from './Header';
import Footer from './Footer';
import Form from './form/Form';
import Preview from './preview/Preview';
import ResetButton from './preview/ResetButton';
import fetchApi from '../services/fetchApi';
import ls from '../services/localStorage';

class CardGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      palette: 1,
      name: '',
      job: '',
      email: '',
      phone: '',
      linkedin: '',
      github: '',
      isAvatarDefault: true,
      avatar: '',
      serverData: {},
    };
    this.handlePalette = this.handlePalette.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.updateAvatar = this.updateAvatar.bind(this);
    this.handleShare = this.handleShare.bind(this);
  }
  componentDidMount() {
    const localStorageData = ls.get('data');
    if (localStorageData) {
      this.setState(localStorageData);
    }
  }

  componentDidUpdate() {
    ls.set('data', this.state);
  }


  handlePalette(value) {
    this.setState({
      palette: parseInt(value),
    });
  }

  handleInput(data) {
    this.setState({
      [data.inputName]: data.inputValue,
    });
  }

  updateAvatar(avatar) {
    this.setState({ avatar: avatar });
  }

  handleReset() {
    this.setState({
      name: '',
      job: '',
      email: '',
      phone: '',
      linkedin: '',
      github: '',
      palette: 1,
    });
  }

  handleShare() {
    const userData = {
      palette: parseInt(this.state.palette),
      name: this.state.name,
      job: this.state.job,
      email: this.state.email,
      phone: this.state.phone,
      linkedin: this.state.linkedin,
      github: this.state.github,
      photo: this.state.avatar,
    };
    console.log(userData);
  fetchApi(userData).then((response) => {
      if (response.success === true) {
        this.setState({
          serverData: {
            success: response.success,
            cardURL: response.cardURL,
          },
        });
      }
    });
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container__generator">
          <div className="preview">
            <ResetButton handleReset={this.handleReset} />
            <Preview palette={this.state.palette} data={this.state} avatar={this.state.avatar} />
          </div>

          <Form
            data={this.state}
            handleInput={this.handleInput}
            palette={this.state.palette}
            handlePalette={this.handlePalette}
            avatar={this.state.avatar}
            getAvatar={this.updateAvatar}
            handleShare={this.handleShare}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default CardGenerator;
