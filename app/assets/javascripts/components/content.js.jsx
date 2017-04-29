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
        <UserContent />
      </div>
    )
  }

  componentDidMount () {
    $.ajax({
      url: '/sessions',
      type: 'GET'
    }).done((response) => {
      debugger;
    })
  }
}
