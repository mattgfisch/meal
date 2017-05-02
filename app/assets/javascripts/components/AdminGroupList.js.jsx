class AdminGroupList extends React.Component {
  constructor () {
    super()
    this.state = {
      adminGroups: null
    }
  }
  componentDidMount() {
    let adminGroupList = null
    $.ajax({
      url: '/admin_groups',
      method: 'GET'
    }).done((response) => {
        adminGroupList = (
        response.admin_groups.map((group) => {
          return (
            <AdminGroupListItem changeStates={this.props.changeStates} sessionID={this.props.sessionID} username={this.props.username} group={group} key={'adminGroup' + group.id} />
          )
        })
      )
      this.setState({
        adminGroups: adminGroupList
      })
    });
  }

  render () {
    return (
      <div>
        {this.state.adminGroups}
      </div>
    )
  }
}
