class GroupShow extends React.Component {
  constructor() {
    super();
    this.state = {
      title: null,
      adminId: null,
      members: null,
      hangoutId: null,
      inHangout: false,
      centerPoint: '',
      currentEmail: null,
      errors: null
    }
    this.joinHangout = this.joinHangout.bind(this)
    this.createHangout = this.createHangout.bind(this)
  }

  handleInvite (event) {
    event.preventDefault()
    let form = this
    if (this.state.currentEmail) {
      let request = $.ajax({
        type: 'POST',
        url: '/groups/'+form.props.groupId+'/members',
        data: {currentEmail: this.state.currentEmail}
      })
      request.success((response) => {
        $('#member-list').append('<div>' + response.username + '</div>')
      })
      request.fail((response) => {
        var error = response.responseJSON['errors']
        form.setState({
          errors: error,
          currentEmail: null
        })
      })
    }
    $("input[type='email']").val('')
  }

  handleEmailChange (event) {
    this.setState({
      currentEmail: event.target.value
    })
  }

  addMembers(){
    if(this.props.sessionID != null){
      return (
        <div className='card group-content'>
          <div className='card-header'>
            <h3>Add Users</h3>
          </div>
          <div className='card-body text-center'>
            <form action='/users' method='post'>
              <div className='errors errors-container'>
                {this.state.errors}
              </div>
              <div className='form-group'>
                <input type='email' name='email' onChange={this.handleEmailChange.bind(this)} className='form-control' placeholder='johndoe@email.com' />
              </div>
              <div className='register-btn'>
                <button onClick={this.handleInvite.bind(this)} className='btn btn-default'>Invite User</button>
              </div>
            </form>
          </div>
        </div>
      )
    }
  }

  showMembers () {
    if (this.state.members != null) {
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
      url: '/groups/' + this.props.groupId,
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
        x = 'Geolocation is not supported by this browser.'
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

  returnRestaurants () {
    if (this.state.centerPoint && this.state.inHangout) {
      getRestaurants(parseFloat(this.state.centerPoint.average_lat), parseFloat(this.state.centerPoint.average_long))
      return (<h3>Restaurants</h3>)
    }
  }
  render () {

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
            <div id='member-list' className="card-body text-center">
              {this.showMembers()}
            </div>
          </div>
          <div className='card group-content' >
            <div className='card-header'>
              {this.returnRestaurants()}
            </div>
            <div className="card-body text-center">
              <div className='map'>
              </div>
              <p className='restaurants'></p>
            </div>
          </div>
          {this.addMembers()}
        </div>
    </div>
    )
  }
}
