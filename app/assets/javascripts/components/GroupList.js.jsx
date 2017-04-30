class GroupList extends React.Component {
  constructor () {
    super()
    this.state = {
      userGroups: null
    }
  }
  componentDidMount() {
    let groupList = null
    $.ajax({
      url: '/groups',
      method: 'GET'
    }).done((response) => {
        groupList = (
        response.groups.map((group) => {
          return (
            <GroupListItem group={group} key={'group' + group.id} />
          )
        })
      )
      this.setState({
        userGroups: groupList
      })
    });
  }

  render () {
    return (
      <div>
        {this.state.userGroups}
      </div>
    )
  }
}
