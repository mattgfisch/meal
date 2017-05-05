class AdminGroupListItem extends React.Component {
  constructor () {
    super()
    this.handler = this.handler.bind(this)
    this.deleteHandler = this.deleteHandler.bind(this)
  }

  handler (event) {
    event.preventDefault()

    let groupId = this.props.group.id
    if (this.props.sessionID === this.props.group.admin_id) {
      this.props.changeStates('GroupPage', this.props.sessionID, null, groupId)
    } else {
      this.props.changeStates('GroupPage', null, null, groupId)
    }
  }

  deleteGroup () {
    $.ajax({
      type: 'DELETE',
      url: '/groups/' + this.props.group.id
    })
  }

  deleteHandler () {
    this.deleteGroup()
    location.reload()
  }

  render () {
    return (
      <tr className='table-row'>
        <td><a id='created' href='#' onClick={this.handler}> {this.props.group.name} </a></td>
        <td><button onClick={this.deleteHandler} className='btn btn-xs btn-link delete'>
          <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
        </button></td>
      </tr>
    )
  }
}
