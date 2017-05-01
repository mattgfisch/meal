class AdminGroupListItem extends React.Component {
  constructor () {
    super()
    this.handler = this.handler.bind(this)
  }

  handler (event) {
    event.preventDefault()

    let groupId = this.props.group.id
    this.props.changeStates('GroupPage',null,null, groupId)
  }

  render () {
    return (
      <div>
        <a id='created' href='#' onClick={this.handler}> {this.props.group.name} </a>
      </div>
    )
  }
}
