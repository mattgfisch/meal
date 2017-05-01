class GroupListItem extends React.Component {
  constructor () {
    super()
    this.state = {
      group: null
    }

    this.handler = this.handler.bind(this)
  }

  handler (event) {
    debugger;
    event.preventDefault()
    this.setState({
      group: this.props.group.id
    })
    this.props.changeMode('GroupPage')
  }

  render () {
      // this.props.changeId(this.props.group.id)
    // debugger
    //  const handler = (e) =>{
    //   e.preventDefault()
    //   this.props.changeId(this.props.group.id)
    //   this.props.changeMode('GroupPage')
    //   debugger
    // }
    return (
      <div>
        <a href='#' onClick={this.handler}> {this.props.group.name} </a>
      </div>
    )
  }
}
