class GroupCreationForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      gropuName: '',
      groupMembers: []
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (event) {
    alert(`Your form was submitted: ${this.state.groupName}\n
      ${this.state.groupMembers}`)
    event.preventDefault()
  }

  render () {
    return (
      <div className='card'>
        <div className='card-header'>
          <h2>Create Group</h2>
        </div>
        <form action='/users' method='post'>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input type='text' name='groupName' className='form-control' id='name' placeholder='Grouptastic' />
          </div>
          <div className='form-group'>
            <label htmlFor='exampleInputPassword1'>Send invites to:</label>
            <input type='email' className='form-control' placeholder='johndoe@email.com' />
          </div>
          <div className='form-group'>
            <input type='email' className='form-control' placeholder='johndoe@email.com' />
          </div>
          <div className='form-group'>
            <input type='email' className='form-control' placeholder='johndoe@email.com' />
          </div>
          <div className='register-btn'>
            <button type='submit' onClick={this.handleSubmit} className='btn btn-default'>Invite Users</button>
          </div>
        </form>
      </div>
    )
  }
}
