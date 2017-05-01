class GroupCreationForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      groupName: '',
      groupEmails: [],
      completedFields: [],
      errors: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
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
      form.props.changeMode("GroupShow")
    })

    request.fail((response) => {
      form.setState({
        errors: null
      })
      var error = response.responseJSON['errors']
      form.setState({
        errors: error,
        // groupName: null,
        groupEmails: ['']
      })
      // form.props.changeMode("CreateGroup")
    })
  }

  handleNameChange (event) {
    this.setState({
      groupName: event.target.value
    })
  }

  handleEmailChange (event) {
    function hasAlreadyBeenEntered (element, index, array) {
      debugger
      return element === event.target
    }
    if (this.state.completedFields.some(hasAlreadyBeenEntered)) {
      var index = this.state.completedFields.indexOf(event.target)
      this.state.groupEmails[index] = this.state.groupEmails[index] + event.target.value
    } else {
      this.state.groupEmails.push(event.target.value)
    }
  }

  render () {
    return (
      <div className='card'>
        <div className='card-header'>
          <h2>Create Group</h2>
        </div>
        <form action='/users' method='post'>
          <div className='errors errors-container'>
            {this.state.errors}
          </div>
          <div className='form-group'>
            <label htmlFor='groupNname'>Name</label>
            <input type='text' name='groupName' value={this.state.groupName} onChange={this.handleNameChange.bind(this)} className='form-control' id='name' placeholder='Grouptastic' />
          </div>
          <label>Send invites to:</label>
          <div className='form-group'>
            <input type='email' value={this.state.groupEmails[0]} onChange={this.handleEmailChange.bind(this)} className='form-control' placeholder='johndoe@email.com' />
          </div>
          <div className='form-group'>
            <input type='email' value={this.state.groupEmails[1]} onChange={this.handleEmailChange.bind(this)} className='form-control' placeholder='johndoe@email.com' />
          </div>
          <div className='form-group'>
            <input type='email' value={this.state.groupEmails[2]} onChange={this.handleEmailChange.bind(this)} className='form-control' placeholder='johndoe@email.com' />
          </div>
          <div className='register-btn'>
            <button onClick={this.handleSubmit} className='btn btn-default'>Invite Users</button>
          </div>
        </form>
      </div>
    )
  }
}
