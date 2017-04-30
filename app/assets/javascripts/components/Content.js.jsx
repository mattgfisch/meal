class Content extends React.Component {
  constructor () {
    super()
    this.state = {
      mode: null
    }
    this.changeMode = this.changeMode.bind(this)
  }

  componentDidMount () {
    this.changeMode('Login')
  }

changeMode (mode) {
  const registration = <RegistrationForm changeMode={this.changeMode} />;
  const login = <Login changeMode={this.changeMode} />;
  const userShow = <UserContent changeMode={this.changeMode} />;
  const createGroup = <GroupCreationForm changeMode={this.changeMode} />
  let stateVariable = null

  switch (mode) {
    case 'Register':
      stateVariable = registration
      break
    case 'Login':
      stateVariable = login
      break
    case 'UserShow':
      stateVariable = userShow
      break
    case 'CreateGroup':
      stateVariable = createGroup
      break
    default:
      stateVariable = login
  }
  this.setState({
    mode: stateVariable
  })
};

  render () {
    return (
      <div>
        {this.state.mode}
      </div>
    )
  };
};
