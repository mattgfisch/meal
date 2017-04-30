class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      email: null,
      password: null
    }
  }

  handleEmailChange (e) {
    this.setState({
      email: e.target.value
    })
  }

  handlePasswordChange (e) {
    this.setState({
      password: e.target.value
    })
  }

  handleClick (e) {
    e.preventDefault();
    let form = this
    var userEmail = this.state.email
    var userPassword = this.state.password
    $.ajax({
      url: '/sessions',
      method: 'POST',
      data: {
       user: {
        email: userEmail,
        password: userPassword
        }
      }
    }).done(function(response){
      //render show page
    })
  }

  render () {
    return (
      <div className='card'>
        <div className='card-header'>
          <h2>Log In</h2>
        </div>
        <form action='/sessions' method='post'>

          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input type='email' className='form-control' id='email' placeholder='Email' onChange={this.handleEmailChange.bind(this)}  />
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input type='password' className='form-control' id='password' placeholder='Password' onChange={this.handlePasswordChange.bind(this)}/>
          </div>

          <div className='login-btn'>
            <button  type='submit' className='btn btn-default' onClick={this.handleClick.bind(this)}>Log In</button>
          </div>

        </form>
      </div>
    )
  };
};
