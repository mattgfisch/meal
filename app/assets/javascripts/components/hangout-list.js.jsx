class HangoutList extends React.Component {
  constructor () {
    super()
    this.state = {
      userHangouts: null
    }
  }
  // componentWillMount() {
  //   let hangoutList = null
  //   $.ajax({
  //     url: 'http://localhost:3000/books/',
  //     method: 'GET',
  //     crossDomain: true,
  //     xhrFields: { withCredentials: true }
  //   }).done((response) => {
  //       hangoutList = (
  //       response.map((hangout) => {
  //         return (
  //           <HangoutListItem hangoutInfo={hangout} key={hangout + hangout.id} />
  //         )
  //       })
  //     );
  //     this.setState({
  //       allBooks: hangoutList,
  //     })
  //   });
  // }

  render () {
    return (
      <div>
        <HangoutListItem />
      </div>
    )
  }
}
