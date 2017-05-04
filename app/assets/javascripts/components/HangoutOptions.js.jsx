class Dropdown extends React.Component {
  adminDeleteButton () {
    if (this.props.userId === this.props.admin) {
      return <a onClick={this.props.deleteHangout}>Delete</a>
    }
  }

  hangoutButton () {
    if (this.props.hangoutId && this.props.inHangout) {
      return <a onClick={this.props.leaveHangout}>Leave</a>
    } else if (this.props.hangoutId) {
      return <a onClick={this.props.joinHangout}>Join</a>
    } else {
      return <a onClick={this.props.createHangout}>Create</a>
    }
  }

  render () {
    return (
      <div className='dropdown'>
        <button className='btn btn-primary dropdown-toggle' type='button' data-toggle='dropdown'>Hangout
          <span className='caret' />
        </button>
        <ul className='dropdown-menu'>
          <li>{this.hangoutButton()}</li>
          <li>{this.adminDeleteButton()}</li>
        </ul>
      </div>
    )
  }
}