class UserAdminGroupsContent extends React.Component {

  render () {
    return (
      <div className='card'>
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
