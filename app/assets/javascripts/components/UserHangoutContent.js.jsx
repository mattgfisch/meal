class UserHangoutContent extends React.Component {

  render () {
    return (
      <div className='card user-content' id='current-hangouts'>
        <div className='card-header'>
          <h3>Current Hangouts</h3>
        </div>
        <div className='card-block user-home'>
          <HangoutList />
        </div>
      </div>
    )
  }
}
