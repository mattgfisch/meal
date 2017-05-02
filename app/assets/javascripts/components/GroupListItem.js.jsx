class GroupListItem extends React.Component {
  constructor () {
    super()
    this.handler = this.handler.bind(this)
    this.deleteHandler = this.deleteHandler.bind(this)
  }

  handler (event) {
    event.preventDefault()

    let groupId = this.props.group.id
    if(this.props.sessionID == this.props.group.admin_id){
      this.props.changeStates('GroupPage', this.props.sessionID, null, groupId)
    } else {
      this.props.changeStates('GroupPage', null, null, groupId)
    }
  }

  deleteMember() {
    let form = this
    var request = $.ajax({
      type: "PUT",
      url: `/groups/${this.props.group.id}`
    })
  }

  deleteHandler (event) {
    this.deleteMember()
    location.reload()
  }



  render () {

    return (
      <div>
        <a id='joined' href='#' onClick={this.handler}> {this.props.group.name} </a><button onClick={this.deleteHandler} className='btn btn-xs remove'> - </button>
      </div>
    )
  }
}
