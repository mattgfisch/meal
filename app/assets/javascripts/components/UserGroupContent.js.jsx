class UserGroupContent extends React.Component {

  render () {

    return (
      <div className='card user-content' id='joined-groups'>
        <div className='card-header'>
          <h3>Joined Groups</h3>
        </div>
        <div className='card-block user-home'>
          <GroupList changeId={this.props.changeId} changeMode={this.props.changeMode.bind(this)}/>
        </div>
      </div>
    )
  }
}
