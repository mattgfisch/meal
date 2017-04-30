class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      email: null,
      password: null,
      errors: null
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
    var request =$.ajax({
      url: '/sessions',
      method: 'POST',
      data: {
       user: {
        email: userEmail,
        password: userPassword
        }
      }
    })
    request.fail(function(response,status,error){
      form.setState({
        errors: null
      })
      var error = response.responseJSON['errors']

      form.setState({
         errors: error,
         name: null,
         email: null,
         password: null
      })
    })
    request.success((successfulLogin) => {
      form.setState({
         errors: null
      })
      this.props.changeMode('Home')
      this.props.changeSession(successfulLogin['user_id'])
      this.props.changeUserName(successfulLogin['user_name'])
    })
  }

  render () {
    const handler = (e) => {
      e.preventDefault()
      this.props.changeMode('Register')
    }
    return (
      <div className='card'>
        <div className='card-header'>
          <h2>Log In</h2>
        </div>
        <ul className='errors'>
          {this.state.errors}
        </ul>
        <form action='/sessions' method='post' className='bottom-padding'>

          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input type='email' className='form-control' id='email' placeholder='Email' onChange={this.handleEmailChange.bind(this)}  />
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input type='password' className='form-control' id='password' placeholder='Password' onChange={this.handlePasswordChange.bind(this)}/>
          </div>

          <div className='register-btn'>
            <button  type='submit' className='btn btn-default' onClick={this.handleClick.bind(this)}>Log In</button>
          </div>

        </form>
        <div className="register">
          <p>don't have an account? <a href = '#' onClick={handler}>register</a> for meal!</p>
        </div>
      </div>
    )
  };
};
