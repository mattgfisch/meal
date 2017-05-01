class GroupShow extends React.Component {
  constructor() {
    super();
    this.state = {
      title: null,
      adminId: null,
      members: null,
      hangoutId: null
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
        adminId: response.groupAdminId,
        members: groupMemberNames,
        hangoutId: response.hangoutId
      })
    })
  }

  loadHangoutButton () {
    if (this.state.hangoutId) {
      return <button className='btn btn-default' >Join Hangout</button>
    }else {
      return <button className='btn btn-default' >Create Hangout</button>
    }
  }
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <div className='card group-content' >
            <div className='hangout-button' >
              {this.loadHangoutButton()}
            </div>
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
            <div className="card-body text-center">
              {this.showMembers()}
            </div>
          </div>
        </div>
    </div>
    )
  }
}
