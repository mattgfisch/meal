class GroupList extends React.Component {
  constructor () {
    super()
    this.state = {
      userGroups: null
    }
  }
  componentDidMount () {
    let groupList = null
    $.ajax({
      url: '/groups',
      method: 'GET'
    }).done((response) => {
      groupList = (
        response.groups.map((group) => {
          return (
            <GroupListItem changeStates={this.props.changeStates} sessionID={this.props.sessionID} username={this.props.username} group={group} key={'group' + group.id} />
          )
        })
      )
      this.setState({
        userGroups: groupList
      })
    })
  }

  render () {
    return (
      <table className='table table-hover' id='joined-table'>
        <tbody>
          {this.state.userGroups}
        </tbody>
      </table>
    )
  }
}
