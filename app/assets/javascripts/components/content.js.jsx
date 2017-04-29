class Content extends React.Component {
  constructor () {
    super()
    this.state = {
      sessionID: null
    }
  }

  render () {
    return (
      <div>
        <UserContent sessionID={this.state.sessionID} />
      </div>
    )
  }

  componentDidMount () {
    let contentRef = this
    $.ajax({
      url: '/sessions',
      type: 'GET'
    }).done((response) => {
      contentRef.setState({
        sessionID: response.sessionID
      })
    })
  }
}
