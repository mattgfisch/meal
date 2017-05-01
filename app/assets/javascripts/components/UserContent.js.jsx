class UserContent extends React.Component {

  render () {

    return (
      <div className='card'>
        <div className='card-header'>
          <h2>Your Meals</h2>
        </div>
        <div className='card-block'>
          <UserHangoutContent changeStates={this.props.changeStates} />
          <UserGroupContent  changeStates={this.props.changeStates}  />
          <AdminGroupContent sessionID={this.props.sessionID} />
        </div>
      </div>
    )
  }
}
