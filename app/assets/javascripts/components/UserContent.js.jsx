class UserContent extends React.Component {

  render () {
    
    return (
      <div className='card'>
        <div className='card-header'>
          <h2>Your Meals</h2>
        </div>
        <div className='card-block'>
          <UserHangoutContent sessionID={this.props.sessionID} />
          <UserGroupContent  changeId={this.props.changeId} changeMode={this.props.changeMode} sessionID={this.props.sessionID} />
          <AdminGroupContent sessionID={this.props.sessionID} />
        </div>
      </div>
    )
  }
}
