class NavBar extends React.Component {

  componentDidMount () {
    this.sessionId()
    this.userName()
  }

  logoutHandler (e) {
    e.preventDefault()
    $.ajax({
      url: '/sessions/' + this.props.session,
      type: 'DELETE'
    }).done((response) => {
      this.props.changeStates('Login')
    })
  }

  sessionId () {
    if (this.props.session) {
      return (
        <button type='button' className='btn pull-right btn-default navbar-btn navbar-right' href='#' onClick={this.logoutHandler.bind(this)}>Logout</button>
      )
    }
  }

  homeLink () {
    const handler = (e) => {
      e.preventDefault()
      if (this.props.session) {
        this.props.changeStates('Home', this.props.session, this.props.user)
      } else {
        this.props.changeStates('Login')
      }
    }
    return (
      <a href='#' id='logo' onClick={handler} className='navbar-link navbar-brand'>Meals</a>
    )
  }

  userName () {
    if (this.props.user) {
      return (
        <span id='nav-username' className='navbar-text pull-left'>{this.props.user}</span>
      )
    }
  }
  render () {
    return (
      <nav className='navbar navbar-default navbar-fixed-top'>
        <div className='container-fluid'>
          {this.userName()}
          {this.homeLink()}
          {this.sessionId()}
        </div>
      </nav>
    )
  }
}
