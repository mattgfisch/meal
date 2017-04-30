class HangoutListItem extends React.Component {
  render () {
    return (
      <div>
        <a href={`/groups/${this.props.hangout.group_id}/hangouts/${this.props.hangout.id}`}> Hangout! </a>
      </div>
    )
  }
}
