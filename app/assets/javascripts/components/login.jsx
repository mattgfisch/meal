import React, { Component } from 'react'
import $ from 'jquery'

class Login extends Component {
  render () {
    return (
      <div className='card'>
        <div className='card-header'>
          <h2>Log In</h2>
        </div>
        <form>

          <div className='form-group'>
            <label for='email'>Email</label>
            <input type='email' className='form-control' id='email' placeholder='Email' />
          </div>

          <div className='form-group'>
            <label for='password'>Password</label>
            <input type='password' className='form-control' id='password' placeholder='Password' />
          </div>

          <div className='login-btn'>
            <button type='submit' className='btn btn-default'>Log In</button>
          </div>

        </form>
      </div>
    )
  };
};

export default Login
