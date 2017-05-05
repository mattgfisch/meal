class AdminGroupContent extends React.Component {
  render () {
    return (
      <div className='card user-content'>
        <div className='card-header created'>
<<<<<<< HEAD
          <div  id='created-groups'>
            <h3>
                Created Groups
            </h3>
            <UserCreateGroup id='create-button' changeStates={this.props.changeStates} sessionID={this.props.sessionID} username={this.props.username} />
          </div>
          <div className='card-block user-home'>
            <AdminGroupList changeStates={this.props.changeStates} sessionID={this.props.sessionID} username={this.props.username} />
          </div>
=======
          <h3>
              Created Groups
          </h3>
          <div id='create-btn'>
            <UserCreateGroup changeStates={this.props.changeStates} sessionID={this.props.sessionID} username={this.props.username} />
          </div>
        </div>
        <div className='card-block user-home'>
          <AdminGroupList changeStates={this.props.changeStates} sessionID={this.props.sessionID} username={this.props.username} />
>>>>>>> master
        </div>
      </div>
    )
  }
}
