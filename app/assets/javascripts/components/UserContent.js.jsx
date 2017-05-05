class UserContent extends React.Component {

  render () {
    return (
      <div className='card content'>
        <div className='card-header user-header'>
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
