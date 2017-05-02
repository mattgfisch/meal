class GroupShow extends React.Component {
  constructor() {
    super();
    this.state = {
      title: null,
      adminId: null,
      members: null,
      hangoutId: null,
      inHangout: false,
      centerPoint: ''
    }
    this.joinHangout = this.joinHangout.bind(this)
    this.createHangout = this.createHangout.bind(this)
  }

  showMembers () {
    if(this.state.members != null){
      let n = 0
      return(
        this.state.members.map((member, n) => {
          n++
          return(
            <div key={this.state.title + n}>{member}</div>
          )
        })
      )
    }
  }

  componentDidMount () {
    let page = this
    $.ajax ({
      url: '/groups/'+ this.props.groupId,
      type: 'GET',
    }).done(function(response){
      var groupMemberNames = []
      response.groupMembers.map((member) => {
        return(
          groupMemberNames.push(member.name)
        )
      })
      page.setState({
        title: response.groupTitle,
        adminId: response.groupAdminId,
        members: groupMemberNames,
        hangoutId: response.hangoutId,
        inHangout: response.inHangout,
        centerPoint: response.centerPoint
      })
    })
  }
  joinHangout () {
    let page = this
    if (this.state.hangoutId) {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(sendPosition)
      } else {
          x = "Geolocation is not supported by this browser."
      }
      function sendPosition(position) {
          let lat = position.coords.latitude
          let long = position.coords.longitude
          function sendRequest (page, result) {
            var joinRequest = $.ajax ({
              url: `/groups/${page.props.groupId}/hangouts/${page.state.hangoutId}`,
              type: 'PATCH',
              data: {lat: lat, long: long}
            })
            joinRequest.done((response) => {
              result(response, page)
            })
          }
          sendRequest(page, function (result, page) {
            page.setState({
              inHangout: result.inHangout,
              centerPoint: result.centerPoint
            })
          })
      }
    }
  }

  createHangout () {
    let page = this
    if (!this.state.hangoutId) {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(sendPosition)
      } else {
          x = "Geolocation is not supported by this browser."
      }
      function sendPosition (position) {
          let lat = position.coords.latitude
          let long = position.coords.longitude
          function sendRequest (page, result) {
            var joinRequest = $.ajax ({
              url: `/groups/${page.props.groupId}/hangouts`,
              type: 'POST',
              data: {lat: lat, long: long}
            })
            joinRequest.done((response) => {
              result(response, page)
            })
          }
          sendRequest(page, function (result, page) {
            page.setState({
              inHangout: result.inHangout,
              hangoutId: result.hangoutId,
              centerPoint: result.centerPoint
            })
          })
      }
    }
  }

  loadHangoutButton () {
    if (this.state.hangoutId) {
      if (this.state.inHangout){
        return <button className='btn btn-default'>HANGING OUT</button>
      } else {
        return <button className='btn btn-default' onClick={this.joinHangout}>Join Hangout</button>
      }
    }else {
      return <button className='btn btn-default' onClick={this.createHangout}>Create Hangout</button>
    }
  }
  render () {
    if (this.state.centerPoint) {
      getRestaurants(parseFloat(this.state.centerPoint.average_lat), parseFloat(this.state.centerPoint.average_long))
    }
    return (
      <div className="card">
        <div className="card-body">
          <div className='card group-content' >
            <div className='hangout-button' >
              {this.loadHangoutButton()}
            </div>
            <div className='card-header'>
              <h3>Group Name</h3>
            </div>
            <div className="card-body text-center">
              {this.state.title}
            </div>
          </div>
          <div className='card group-content' >
            <div className='card-header'>
              <h3>Members</h3>
            </div>
            <div className="card-body text-center">
              {this.showMembers()}
            </div>
          </div>
          <div className='card group-content' >
            <div className='card-header'>
              <h3>Restaurants</h3>
            </div>
            <div className="card-body text-center">
              <div className='map'>
              </div>
              <p className='restaurants'></p>
            </div>
          </div>

        </div>
    </div>
    )
  }
}
