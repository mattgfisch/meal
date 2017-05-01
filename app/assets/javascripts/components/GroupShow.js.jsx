class GroupShow extends React.Component {
  constructor() {
    super();
    this.state = {
      title: null,
      admin_id: null,
      members: null
    }
  }

  showMembers(){
    if(this.state.members != null){
      return(
        this.state.members.map((member) => {
          return(
            <div>{member}</div>
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
            <div className="card-body text-center">
              {this.showMembers()}
            </div>
          </div>
        </div>
    </div>
    )
  }
}
