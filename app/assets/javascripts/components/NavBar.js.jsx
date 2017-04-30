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

    })
  }

  sessionId(){
    if (this.props.session != null){
    return(
        <div className='logout inline center'>
          <span><a href = '#' onClick={this.logoutHandler.bind(this)}>Logout</a></span>
        </div>)
      }
  }

  homeLink(){
    const handler = (e) => {
      e.preventDefault()
      if(this.props.session != null){
        this.props.changeMode('UserShow')
      }
      else{
        this.props.changeMode('Login')
      }
      
    }

  return(<span className='navbar-text logo'><a href='#' onClick={handler} className='navbar-link'>Meals</a></span>)

  }

  userName(){
    if(this.props.user != null){
      return(
        <span>{this.props.user}</span>
      )
    }
  }
  render(){

    return(
      <nav className='navbar navbar-toggleable-md navbar-light bg-faded'>
        <div className='container'>
          <div className='user inline center'>
            {this.userName()}
          </div>
          <div className='center inline center'>
            {this.homeLink()}
          </div>
          {this.sessionId()}

        </div>
      </nav>
    )
  }
}
