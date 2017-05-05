class GroupCreationForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      groupName: '',
      groupEmails: [],
      currentEmail: null,
      errors: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInvite = this.handleInvite.bind(this)
  }

  handleSubmit (event) {
    let form = this
    event.preventDefault()
    let request = $.ajax({
      type: 'POST',
      url: '/groups',
      data: this.state
    })

    request.success((response) => {
      form.props.changeStates('GroupPage', this.props.sessionID, this.props.username, response.group_id)
    })

    request.fail((response) => {
      var error = response.responseJSON['errors']
      form.setState({
        errors: error,
        groupEmails: []
      })
    })
  }

  handleInvite (event) {
    event.preventDefault()
    if (this.state.currentEmail) {
      this.state.groupEmails.push(this.state.currentEmail)
      this.setState({
        currentEmail: null
      })
    }
    $("input[type='email']").val('')
  }

  handleNameChange (event) {
    this.setState({
      groupName: event.target.value
    })
  }

  handleEmailChange (event) {
    this.setState({
      currentEmail: event.target.value
    })
  }
//
  render () {
    return (
      <div className='card content'>
        <div className='card-header page-header'>
          <h2>Create Group</h2>
        </div>
        <div className='card-block'>
          <form action='/users' method='post' id='group-create-form'>
            <div className='errors errors-container'>
              {this.state.errors}
            </div>
            <div className='form-group'>
              <label htmlFor='groupName'>Name</label>
              <input type='text' name='groupName' value={this.state.groupName} onChange={this.handleNameChange.bind(this)} className='form-control' id='name' placeholder='Grouptastic' />
            </div>
            <div className='form-group'>
              <label htmlFor='email'>Send invites to:</label>
              <input type='email' name='email' onChange={this.handleEmailChange.bind(this)} className='form-control' placeholder='johndoe@email.com' />
            </div>
            <div id='invite-user' className='register-btn'>
              <button onClick={this.handleInvite} className='btn btn-default'>Invite User</button>
            </div>
            <div id='submit-group' className='register-btn'>
              <button onClick={this.handleSubmit} className='btn btn-default'>Create Group</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
