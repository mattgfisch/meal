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
     },
   })
   request.fail(function(response,status,error){
     form.setState({
       errors: null
     })
     var error = response.responseJSON['errors']
     var valueArray = []
     for (var key in error){
       valueArray.push(key +' '+ error[key])
     }
     valueArray.map((error)=> {
       return(<div>{error}</div>)
     })

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
         console.log(successfulLogin)
         this.props.changeMode('Home')
         this.props.changeUserName(userName)
         this.props.changeSession(successfulLogin['user_id'])
       })
     })
   // Reset registration fields
   this.refs.registrationName.value = ''
   this.refs.registrationEmail.value = ''
   this.refs.registrationPassword.value = ''

  }

  render () {
    return (
      <div className='card'>
        <div className='card-header'>
          <h2>New Account</h2>
        </div>
        <ul className='errors'>
          {this.state.errors}
        </ul>
        <form action='/users' method='post'>
          <div className='form-group'>
            <label htmlFor='exampleInputName'>Full Name</label>
            <input type='text' ref='registrationName' className='form-control' id='exampleInputName' placeholder='John Doe' onChange={this.handleNameChange.bind(this)} />
          </div>
          <div className='form-group'>
            <label htmlFor='exampleInputEmail1'>Email address</label>
            <input type='email' ref='registrationEmail' className='form-control' id='exampleInputEmail1' placeholder='Email' onChange={this.handleEmailChange.bind(this)} />
          </div>
          <div className='form-group'>
            <label htmlFor='exampleInputPassword1'>Password</label>
            <input type='password' ref='registrationPassword' className='form-control' id='exampleInputPassword1' placeholder='Password' onChange={this.handlePasswordChange.bind(this)} />
          </div>
          <div className='register-btn'>
            <button type='submit' className='btn btn-default' onClick={this.handleClick.bind(this)}>Register</button>
          </div>
        </form>
      </div>
    )
  }
}
