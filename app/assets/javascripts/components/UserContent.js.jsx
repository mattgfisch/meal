class UserContent extends React.Component {
<<<<<<< HEAD


  handleClick(e){
    e.preventDefault()
    $.ajax ({
      url: '/groups/1',
      type: 'GET',
    }).done(function(response){
      console.log(response)
    })
  }

  render () {
    return (
      <div className='card'>
        <div className='card-header'>
          <h2>Your Meals</h2>
        </div>
        <a href={'#'} onClick={this.handleClick}>Your group</a>
        <div className='card-block'>
          <UserHangoutContent sessionID={this.props.sessionID} />
          <UserGroupContent sessionID={this.props.sessionID} />
          <AdminGroupContent sessionID={this.props.sessionID} />
        </div>
      </div>
    )
  }
}
