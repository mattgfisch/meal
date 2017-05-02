class AdminGroupContent extends React.Component {
  render () {
    return (
      <div className='card user-content' id='created-groups'>
        <div className='card-header created'>
          <h3>
            <span className='user-show-title'>
              Created Groups
            </span>
            <UserCreateGroup changeStates={this.props.changeStates} sessionID={this.props.sessionID} username={this.props.username} />
          </h3>
        </div>
        <div className='card-block user-home'>
          <AdminGroupList changeStates={this.props.changeStates} sessionID={this.props.sessionID} username={this.props.username} />
        </div>
      </div>
    )
  }
}
