class Content extends React.Component {
  constructor() {
    super()
    this.state = {
      mode: 'Login'
    }
    this.changeMode = this.changeMode.bind(this)
  }

  changeMode (mode) {
  this.setState({
    mode: mode,
  })
};

  render () {
    return (
      <div>
        {
        (this.state.mode === 'Login') ?  <Login changeMode={this.changeMode} /> : <RegistrationForm />
      }
      </div>
    )
  };
};
