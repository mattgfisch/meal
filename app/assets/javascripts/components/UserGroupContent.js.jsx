class UserGroupContent extends React.Component {

  render () {

    return (
      <div className='card user-content' id='joined-groups'>
        <div className='card-header joined'>
          <h3>Joined Groups</h3>
        </div>
        <div className='card-block user-home'>
          <GroupList changeStates={this.props.changeStates} sessionID={this.props.sessionID} username={this.props.username} />
        </div>
      </div>
    )
  }
}
