class UserContent extends React.Component {

  render () {
    return (
      <div className='card'>
        <div className='card-header'>
          <h2>Your Meals</h2>
        </div>
        <div className='card-block'>
          <UserGroupContent  changeStates={this.props.changeStates} sessionID={this.props.sessionID} username={this.props.username} />
          <AdminGroupContent changeStates={this.props.changeStates} sessionID={this.props.sessionID} username={this.props.username} />
        </div>
      </div>
    )
  }
}
