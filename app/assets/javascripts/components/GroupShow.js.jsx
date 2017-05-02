class GroupShow extends React.Component {
  constructor() {
    super();
    this.state = {
      title: null,
      admin_id: null,
      members: null,
      currentEmail: null,
      errors: null
    }
  }

  handleInvite (event) {
    event.preventDefault()
    debugger
    let form = this
    if (this.state.currentEmail) {
      let request = $.ajax({
        type: 'POST',
        url: '/groups/'+form.props.groupId+'/members',
        data: {currentEmail: this.state.currentEmail}
      })
      request.success((response) => {
        $('#member-list').append(response.username)
      })
      request.fail((response) => {
        var error = response.responseJSON['errors']
        debugger
        form.setState({
          errors: error,
          currentEmail: null
        })
      })
    }
    $("input[type='email']").val('')
  }

  handleEmailChange (event) {
    console.log(event.target.value)
    this.setState({
      currentEmail: event.target.value
    })
  }

  addMembers(){
    if(this.props.sessionID != null){
      return (
        <div className='card group-content'>
          <div className='card-header'>
            <h3>Add Users</h3>
          </div>
          <div className="card-body text-center">
            <form action='/users' method='post'>
              <div className='errors errors-container'>
                {this.state.errors}
              </div>
              <div className='form-group'>
                <input type='email' name="email" onChange={this.handleEmailChange.bind(this)} className='form-control' placeholder='johndoe@email.com' />
              </div>
              <div className='register-btn'>
                <button onClick={this.handleInvite.bind(this)} className='btn btn-default'>Invite User</button>
              </div>
            </form>
          </div>
        </div>
      )
    }
  }

  showMembers(){
    if(this.state.members != null){
      let n = 0
      return(
        this.state.members.map((member, n) => {
          n++
          return(
            <div key={this.state.title + n}>{member}</div>
          )
        })
      )
    }
  }

  componentDidMount() {
    let form = this
    $.ajax ({
      url: '/groups/'+ this.props.groupId,
      type: 'GET',
    }).done(function(response){
      var groupMemberNames = []
      response.groupMembers.map((member) => {
        return(
          groupMemberNames.push(member.name)
        )
      })
      form.setState({
        title: response.groupTitle,
        admin_id: response.groupAdminId,
        members: groupMemberNames
      })
    })
  }
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <div className='card group-content' >
            <div className='card-header'>
              <h3>Group Name</h3>
            </div>
            <div className="card-body text-center">
              {this.state.title}
            </div>
          </div>
          <div className='card group-content' >
            <div className='card-header'>
              <h3>Members</h3>
            </div>
            <div id='member-list' className="card-body text-center">
              {this.showMembers()}
            </div>
          </div>
          {this.addMembers()}
        </div>
    </div>
    )
  }
}
