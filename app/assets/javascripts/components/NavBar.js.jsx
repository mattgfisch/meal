class NavBar extends React.Component {

  componentDidMount(){
    this.sessionId()
    this.userName()
  }

   logoutHandler(e)  {
    e.preventDefault()
    $.ajax({
      url: '/sessions/'+ this.props.session,
      type: 'DELETE'
    }).done((response) => {
      this.props.changeUserName(null)
      this.props.changeSession(null)
      this.props.changeMode('Login')
    })
  }

  sessionId () {
    if (this.props.session != null) {
    return(
      <button type='button' className='btn pull-right btn-default navbar-btn navbar-right' href='#' onClick={this.logoutHandler.bind(this)}>Logout</button>
        )
      }
  }

  homeLink () {
    const handler = (e) => {
      e.preventDefault()
      if (this.props.session != null) {
        this.props.changeMode('Home')
      }
      else
      {
        this.props.changeMode('Login')
      }
    }
    return (
        <a href='#' onClick={handler} className='navbar-brand navbar-link'>Meals</a>
    )
  }

  userName () {
    if (this.props.user != null) {
      return (
        <span className='navbar-text pull-left'>{this.props.user}</span>
      )
    }
  }
  render () {
    return (
      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
          {this.userName()}
          {this.homeLink()}
          {this.sessionId()}
        </div>
      </nav>
    )
  }
}
