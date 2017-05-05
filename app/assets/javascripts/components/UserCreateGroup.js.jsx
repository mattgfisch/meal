class UserCreateGroup extends React.Component {
  constructor () {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick (event) {
    event.preventDefault()
    this.props.changeStates('CreateGroup', this.props.sessionID, this.props.username)
  }
  render () {
    return (
      <div className='create-group-btn'>
        <button onClick={this.handleClick} className='btn btn-default btn-xl'>
          <span className='glyphicon glyphicon-plus' aria-hidden='true' />
        </button>
      </div>
    )
  }
}
