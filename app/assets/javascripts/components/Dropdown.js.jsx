class Dropdown extends React.Component {

  userIsGroupAdmin () {
    return this.props.userId === this.props.groupAdminId
  }

  deleteHangout () {
    if (this.props.userId === this.props.hangoutAdminId) {
      return <a className='btn' onClick={this.props.deleteHangout}>Delete Hangout</a>
    }
  }

  lockButton () {
    if (this.props.userId === this.props.hangoutAdminId && !this.props.lockedOut) {
      return <a className='btn' onClick={this.props.lockHangout}>Lock Hangout</a>
    }
  }

  hangoutButton () {
    if (!this.props.lockedOut) {
      if (this.props.hangoutId && this.props.inHangout) {
        return <a className='btn' onClick={this.props.leaveHangout}>Leave Hangout</a>
      } else if (this.props.hangoutId) {
        return <a className='btn' onClick={this.props.joinHangout}>Join Hangout</a>
      } else {
        return <a className='btn' onClick={this.props.createHangout}>Create Hangout</a>
      }
    } else {
      return <a className='btn'>Hangout Locked</a>
    }
  }

  addButton () {
    if (this.userIsGroupAdmin()) {
      return (
        <a className='btn' data-toggle='collapse' data-target='#collapseExample' aria-expanded='false' aria-controls='collapseExample'>
          Invite to Group
        </a>
      )
    }
  }

  render () {
    return (
      <div className='dropdown'>
        <button className='btn btn-primary dropdown-toggle' type='button' data-toggle='dropdown'>Options
          <span className='caret' />
        </button>
        <ul className='dropdown-menu'>
          <li>{this.hangoutButton()}</li>
          <li>{this.lockButton()}</li>
          <li>{this.deleteHangout()}</li>
          <li>{this.addButton()}</li>
        </ul>
      </div>
    )
  }
}
