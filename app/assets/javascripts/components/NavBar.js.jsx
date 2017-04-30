class NavBar extends React.Component {

  componentDidMount(){
    this.sessionId()
    this.userName()
  }

   logoutHandler(e)  {
    e.preventDefault()
    $.ajax({
      url: '/sessions/'+ this.props.session,
      type: 'DELETE',
    }).done((response)=>{
      this.props.changeUserName(null)
      this.props.changeSession(null)
      this.props.changeMode('Login')
      location.reload(true)
    })
  }

  sessionId(){
    if (this.props.session != null){
    return(
        <div className='logout inline'>
          <span><a href = '#' onClick={this.logoutHandler.bind(this)}>Logout</a></span>
        </div>)
      }
  }

  userName(){
    if(this.props.user != null){
      return(
        <span>{this.props.user}</span>
      )
    }
  }
  render(){
    const handler = (e) => {
      e.preventDefault()
      this.props.changeMode('Login')
    }
    return(
      <nav className='navbar navbar-toggleable-md navbar-light bg-faded'>
        <div className='container'>
          <div className='user inline'>
            {this.userName()}
          </div>
          <div className='center inline'>
            <span className='navbar-text logo'><a href='#' onClick={handler} className='navbar-link'>Meals</a></span>
          </div>
          {this.sessionId()}

        </div>
      </nav>
    )
  }
}
