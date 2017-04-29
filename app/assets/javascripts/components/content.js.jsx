class Content extends React.Component {
  constructor () {
    super()
    this.state = {
      sessionID: null
    }
  }
  // componentWillMount () {
  //   $.ajax({
  //     url: '/sessions'
  //
  //   }).done((response) => {
  //     
  //   })
  // }

  render () {
    return (
      <div>
        <UserContent />
      </div>
    )
  }
}
