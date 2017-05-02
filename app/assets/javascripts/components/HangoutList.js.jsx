class HangoutList extends React.Component {
  constructor () {
    super()
    this.state = {
      userHangouts: null
    }
  }
  componentDidMount () {
    let hangoutList = null
    $.ajax({
      url: '/hangouts',
      method: 'GET'
    }).done((response) => {
      hangoutList = (
        response.hangouts.map((hangout) => {
          return (
            <HangoutListItem hangout={hangout} key={'hangout' + hangout.id} />
          )
        })
      )
      this.setState({
        userHangouts: hangoutList
      })
    })
  }

  render () {
    return (
      <div>
        {this.state.userHangouts}
      </div>
    )
  }
}
