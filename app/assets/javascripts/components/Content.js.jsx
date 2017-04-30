class Content extends React.Component {
  constructor () {
    super()
    this.state = {
      mode: null,
      session: null,
      username: null
    }
    this.changeMode = this.changeMode.bind(this)
    this.changeSession = this.changeSession.bind(this)
    this.changeUserName = this.changeUserName.bind(this)
  }

  componentDidMount () {
    this.changeSession(null)
    this.changeUserName(null)

    var request = $.ajax({
      url: '/sessions',
      type: 'GET'
    })
    request.done((response) => {
      if (response.sessionID) {
        this.changeMode('Home')
        this.changeSession(response.sessionID)
        this.changeUserName(response.userName)
      } else {
        this.changeMode('Login')
      }
    })
  }

  changeSession (sessionId) {
    this.setState({
      session: sessionId
    })
  }

  changeUserName (name) {
    this.setState({
      username: name
    })
  }

  changeMode (mode) {
    const registration = <RegistrationForm changeMode={this.changeMode} changeSession={this.changeSession} changeUserName={this.changeUserName} />
    const login = <Login changeMode={this.changeMode}  changeSession={this.changeSession} changeUserName={this.changeUserName} />
    const Home = <UserContent />
    let stateVariable = null

    switch (mode) {
      case 'Register':
        stateVariable = registration
        break
      case 'Login':
        stateVariable = login
        break
      case 'Home':
        stateVariable = Home
        break
      default:
        console.log('OMG errorz')
        stateVariable = login
        break
    }
    this.setState({
      mode: stateVariable
    })
  };
  render () {
    return (
      <div>
        <NavBar user={this.state.username} session={this.state.session} changeMode={this.changeMode} changeSession={this.changeSession} changeUserName={this.changeUserName} />
        {this.state.mode}
      </div>
    )
  };
};
