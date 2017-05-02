class RegistrationForm extends React.Component {

  constructor () {
    super()
    this.state = {
      name: null,
      email: null,
      password: null,
      errors: null
    }
  }

  handleNameChange (e) {
    this.setState({
      name: e.target.value
    })
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
  listErrors () {
    if (this.state.errors) {
      return (this.state.errors.map((error) => {
        return (<div className='indv-error' key={error}>{error}</div>)
      }))
    }
  }

  handleClick (e) {
    e.preventDefault()
    let form = this
    var userName = this.state.name
    var userEmail = this.state.email
    var userPassword = this.state.password

    var request = $.ajax({
      url: '/users',
      method: 'POST',
      data: {
        user: {
          name: userName,
          email: userEmail,
          password: userPassword
        }
      }
    })
    request.fail(function (response) {
      form.setState({
        errors: null
      })
      var error = response.responseJSON['errors']
      var valueArray = []
      for (var key in error) {
        valueArray.push(key.substring(0, 1).toUpperCase() + key.substring(1) + ' ' + error[key])
      }
      form.setState({
        errors: valueArray,
        name: null,
        email: null,
        password: null
      })
    })
    request.success((successfulRegistration) => {
      form.setState({
        errors: null
      })
      $.ajax({
        url: '/sessions',
        method: 'POST',
        data: {
          user: {
            email: userEmail,
            password: userPassword
          }
        }
      }).done((successfulLogin) => {
        form.setState({
          errors: null
        })
        this.props.changeStates('Home', successfulLogin['user_id'], successfulLogin['user_name'])
      })
    })

    $("input").val('')
  }

  render () {
    return (
      <div className='card'>
        <div className='card-header'>
          <h2>New Account</h2>
        </div>
        <div className='errors errors-container'>
          {this.listErrors()}
        </div>
        <form action='/users' method='post'>
          <div className='form-group'>
            <label htmlFor='exampleInputName'>Full Name</label>
            <input type='text' className='form-control' id='exampleInputName' placeholder='John Doe' onChange={this.handleNameChange.bind(this)} />
          </div>
          <div className='form-group'>
            <label htmlFor='exampleInputEmail1'>Email address</label>
            <input type='email' className='form-control' id='exampleInputEmail1' placeholder='Email' onChange={this.handleEmailChange.bind(this)} />
          </div>
          <div className='form-group'>
            <label htmlFor='exampleInputPassword1'>Password</label>
            <input type='password' className='form-control' id='exampleInputPassword1' placeholder='Password' onChange={this.handlePasswordChange.bind(this)} />
          </div>
          <div className='register-btn'>
            <button type='submit' className='btn btn-default' onClick={this.handleClick.bind(this)}>Register</button>
          </div>
        </form>
      </div>
    )
  }
}
