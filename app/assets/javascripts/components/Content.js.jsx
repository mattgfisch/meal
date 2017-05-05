class Content extends React.Component {
  constructor () {
    super()
    this.state = {
      mode: null,
      session: null,
      username: null,
      pageId: null
    }
    this.changeStates = this.changeStates.bind(this)
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
        this.changeStates('Login')
      }
    })
  }
  changeStates (mode, sessionID = null, username = null, pageId = null) {
    const GroupPage = <GroupShow changeStates={this.changeStates} sessionID={sessionID} groupId={pageId} />
    const registration = <RegistrationForm changeStates={this.changeStates} />
    const login = <Login changeStates={this.changeStates} />
    const Home = <UserContent changeStates={this.changeStates} sessionID={sessionID} username={username} />
    let CreateGroup = <GroupCreationForm changeStates={this.changeStates} sessionID={sessionID} username={username} />
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
      case 'CreateGroup':
        stateVariable = CreateGroup
        break
      default:
        stateVariable = login
        break
    }
    if (pageId) {
      this.setState({
        mode: stateVariable
      })
    } else {
      this.setState({
        mode: stateVariable,
        session: sessionID,
        username: username
      })
    }
  }

  render () {
    return (
      <div id='body'>
        <NavBar user={this.state.username} session={this.state.session} changeStates={this.changeStates} />
        <div className='card' id='page-content'>
          <div className= "col-xs-1 .col-md-1 border">

          </div>
          <div className="col-xs-10 .col-md-10 border">
            {this.state.mode}
          </div>
          <div className="col-xs-1 .col-md-1 border">

          </div>
        </div>
      </div>
    )
  };
};
