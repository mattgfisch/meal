class GroupShow extends React.Component {
  constructor() {
    super();
    this.state = {
      title: null,
      admin_id: null,
      members: null
    }
  }

  componentDidMount() {
    let form = this
    $.ajax ({
      url: '/groups/'+ this.props.groupId,
      type: 'GET',
    }).done(function(response){
      console.log(response)
      console.log(response.groupTitle)
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
      <div>
        <h2>{this.state.title}</h2>
        <h2>{this.state.admin_id}</h2>
      </div>
    )
  }
}
