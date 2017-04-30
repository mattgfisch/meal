class AdminGroupListItem extends React.Component {
  render () {
    return (
      <div>
        <a href={`/groups/${this.props.group.id}`}> {this.props.group.name} </a>
      </div>
    )
  }
}
