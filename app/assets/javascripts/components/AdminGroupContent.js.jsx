class AdminGroupContent extends React.Component {
  render () {
    return (
      <div className='card user-content'>
        <div className='card-header'>
          <h3>
            <span className='user-show-title'>
              Created Groups
            </span>
            <UserCreateGroup />
          </h3>
        </div>
        <div className='card-block user-home'>
          <AdminGroupList />
        </div>
      </div>
    )
  }
}
