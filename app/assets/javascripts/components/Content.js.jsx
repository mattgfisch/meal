class Content extends React.Component {
  constructor () {
    super()
    this.state = {
      mode: null,
      session: null,
      username: null,
      pageId: null
    }
    this.changeMode = this.changeMode.bind(this)
    this.changeSession = this.changeSession.bind(this)
    this.changeUserName = this.changeUserName.bind(this)
    this.changeId = this.changeId.bind(this)
  }

  componentDidMount () {
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

  changeId(id){
    this.setState({
      pageId: id
    })
    debugger
  }

  changeUserName (name) {
    this.setState({
      username: name
    })
  }

  changeMode (mode) {
    const GroupPage = <GroupShow groupId={this.state.pageId}/>
    const registration = <RegistrationForm changeMode={this.changeMode} changeSession={this.changeSession} changeUserName={this.changeUserName} />
    const login = <Login changeMode={this.changeMode}  changeSession={this.changeSession} changeUserName={this.changeUserName} />
    const Home = <UserContent changeId={this.changeId} changeMode={this.changeMode} />

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
      case 'GroupPage':
        stateVariable = GroupPage
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
