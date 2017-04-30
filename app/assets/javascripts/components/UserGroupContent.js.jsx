class UserGroupContent extends React.Component {

  render () {
    return (
      <div className='card'>
        <div className='card-header'>
          <h3>Joined Groups</h3>
        </div>
        <div className='card-block user-home'>
          <GroupList />
        </div>
      </div>
    )
  }
}
