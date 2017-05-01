class GroupListItem extends React.Component {
  constructor () {
    super()
    this.state = {
      group: null
    }

    this.handler = this.handler.bind(this)
  }

  handler (event) {
    event.preventDefault()
    debugger;
    let groupId = this.props.group.id
    this.props.changeStates('GroupPage', null, null, groupId)
    // this.setState({
    //   group: groupId
    // })
    this.test()
  }
  // shouldComponentUpdate () {
  //   debugger;
  //   if (this.state.group) {
  //     this.props.changeId(this.state.group)
  //     this.props.changeMode('GroupPage')
  //   }
  // }
  test () {
    debugger;
  }

  render () {
    // debugger
    //  const handler = (e) =>{
    //   e.preventDefault()
    //
    //   debugger
    // }
    return (
      <div>
        <a href='#' onClick={this.handler}> {this.props.group.name} </a>
      </div>
    )
  }
}
