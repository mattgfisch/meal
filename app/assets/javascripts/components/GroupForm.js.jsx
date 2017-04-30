class GroupCreationForm extends React.Component {
  constructor () {
    super()
  }

  render () {
    return (
      <div className='card'>
        <div className='card-header'>
          <h2>New Group</h2>
        </div>
        <form action='/users' method='post'>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input type='text' ref='groupName' className='form-control' id='name' placeholder='John Doe' />
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
            <button type='submit' className='btn btn-default'>Invite Users</button>
          </div>
        </form>
      </div>
    )
  }
}
