class UserContent extends React.Component {

  render () {
    return (
        <div className='card'>
          <div className='card-header'>
            <h2>Your Meals</h2>
          </div>
          <div className='card-block'>
            <UserHangoutContent />
            <UserGroupContent />
            <UserAdminGroupsContent />
          </div>
        </div>
    )
  }
}
