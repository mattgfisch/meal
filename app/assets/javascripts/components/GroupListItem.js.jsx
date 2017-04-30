class GroupListItem extends React.Component {

  handleClick(e){
    e.preventDefault()
    $.ajax ({
      url: '/groups/'+ this.props.group.id,
      type: 'GET',
    }).done(function(response){
      console.log(response)
    })
  }

  render () {
    return (
      <div>
        <a href={`#`} onClick={this.handleClick}> {this.props.group.name} </a>
      </div>
    )
  }
}
