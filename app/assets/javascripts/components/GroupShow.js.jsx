class GroupShow extends React.Component {
  constructor() {
    super();
    this.state = {
      title: null,
      adminId: null,
      members: null,
      hangoutId: null
    }
    this.joinHangout = this.joinHangout.bind(this)
    this.createHangout = this.createHangout.bind(this)
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
    let page = this
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
      page.setState({
        title: response.groupTitle,
        adminId: response.groupAdminId,
        members: groupMemberNames,
        hangoutId: response.hangoutId
      })
    })
  }
  joinHangout () {
    if (this.state.hangoutId) {
      let page = this
      var joinRequest = $.ajax ({
        url: `/groups/${page.props.groupId}/hangouts/${page.state.hangoutId}`,
        type: 'PUT'
      })
      joinRequest.done((response) => {
        debugger
      })
    }
  }

  createHangout () {

    if (!this.state.hangoutId) {

    }
  }

  loadHangoutButton () {
    if (this.state.hangoutId) {
      return <button className='btn btn-default' onClick={this.joinHangout}>Join Hangout</button>
    }else {
      return <button className='btn btn-default' onClick={this.createHangout}>Create Hangout</button>
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
