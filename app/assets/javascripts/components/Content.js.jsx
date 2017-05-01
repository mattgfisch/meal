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
    this.changeStates = this.changeStates.bind(this)
    this.changeId = this.changeId.bind(this)
  }

  componentDidMount () {
    var request = $.ajax({
      url: '/sessions',
      type: 'GET'
    })
    request.done((response) => {
      if (response.sessionID) {
        this.changeStates('Home', response.sessionID, response.userName, null)
      } else {
        this.changeMode('Login')
      }
    })
  }

  // changeSession (sessionId) {
  //   this.setState({
  //     session: sessionId
  //   })
  // }
  changeStates (mode, sessionID=null, username=null, pageId=null) {
    const GroupPage = <GroupShow groupId={pageId}/>
    const registration = <RegistrationForm changeStates={this.changeStates} />
    const login = <Login changeStates={this.changeStates} />
    const Home = <UserContent changeStates={this.changeStates} />

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
    if (pageId) {
      this.setState({
        mode: stateVariable,
      })
    } else {
      this.setState({
        mode: stateVariable,
        session: sessionID,
        username: username
      })
    }
  }

  changeId(id){
    this.setState({
      pageId: id
    })
    debugger
  }

  // changeUserName (name) {
  //   this.setState({
  //     username: name
  //   })
  // }

  changeMode (mode) {
    const GroupPage = <GroupShow groupId={this.state.pageId}/>
    const registration = <RegistrationForm changeStates={this.changeStates} />
    const login = <Login changeStates={this.changeStates} />
    const Home = <UserContent changeStates={this.changeStates} />

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
        <NavBar user={this.state.username} session={this.state.session} changeMode={this.changeMode} changeStates={this.changeStates} />
        {this.state.mode}
      </div>
    )
  };
};
