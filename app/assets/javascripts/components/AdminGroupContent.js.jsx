class AdminGroupContent extends React.Component {
  render () {
    return (
      <div className='card user-content created'>
        <div className='card-header'>
          <div id='created-groups'>
            <h3>
              Created Groups
            </h3>
            <div id='create-btn'>
              <UserCreateGroup changeStates={this.props.changeStates} sessionID={this.props.sessionID} username={this.props.username} />
            </div>
          </div>
        </div>
        <div className='card-block user-home created-groups'>
          <AdminGroupList changeStates={this.props.changeStates} sessionID={this.props.sessionID} username={this.props.username} />
        </div>
      </div>
    )
  }
}
