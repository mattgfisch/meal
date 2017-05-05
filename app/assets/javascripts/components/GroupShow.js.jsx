class GroupShow extends React.Component {
  constructor () {
    super()
    this.state = {
      title: null,
      adminId: null,
      activeMembers: [],
      members: [],
      hangoutId: null,
      inHangout: false,
      centerPoint: '',
      currentEmail: null,
      errors: null,
      hangoutAdmin: null,
      locationError: null,
      curretUserId: null,
      lockedOut: false
    }
    this.joinHangout = this.joinHangout.bind(this)
    this.createHangout = this.createHangout.bind(this)
    this.leaveHangout =  this.leaveHangout.bind(this)
    this.deleteHangout = this.deleteHangout.bind(this)
    this.lockHangout = this.lockHangout.bind(this)
  }

  handleInvite (event) {
    event.preventDefault()
    let form = this
    if (this.state.currentEmail) {
      let request = $.ajax({
        type: 'POST',
        url: '/groups/' + form.props.groupId + '/members',
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


   handleEmailChange(event) {
     this.setState({
       currentEmail: event.target.value
     })
  }
  addMembers () {
    if (this.props.sessionID) {
      return (
        <div className='card group-content'>
          <div className='card-header'>
            <button className='btn btn-default' type='button' data-toggle='collapse' data-target='#collapseExample' aria-expanded='false' aria-controls='collapseExample'>
            Add Users
            </button>
            <div id='collapseExample' className='card-body text-center collapse'>
              <div className='well'>
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
          </div>
        </div>
      )
    }
  }

  memberIsHanging (member) {
    if (this.state.activeMembers) {
      if (this.state.activeMembers.includes(member)) {
        return (
          <button className='btn btn-default btn-xs'><span className='glyphicon glyphicon-cutlery glyphicon-align-left' aria-hidden='true' /></button>
        )
      }
    }
  }

  showMembers () {
    if (this.state.members) {
      let n = 0
      return (
        this.state.members.map((member, n) => {
          n++
          return (
            <div key={this.state.title + n}>{member} {this.memberIsHanging(member)} </div>
          )
        })
      )
    }
  }

  componentDidMount () {
    let page = this
    $.ajax({
      url: '/groups/' + this.props.groupId,
      type: 'GET'
    }).done(function (response) {
      page.setState({
        activeMembers: response.activeMembers,
        title: response.groupTitle,
        adminId: response.groupAdminId,
        members: response.groupMembers,
        hangoutId: response.hangoutId,
        inHangout: response.inHangout,
        centerPoint: response.centerPoint,
        hangoutAdmin: response.hangoutAdmin,
        curretUserId: response.curretUserId,
        lockedOut: response.lockedOut
      })
    })
  }

  joinHangout () {
    if (this.state.hangoutId != null) {
      this.hangOutHelper('/groups/' + this.props.groupId + '/hangouts/' + this.state.hangoutId, 'PATCH')
    }
  }

  createHangout () {
    if (this.state.hangoutId == null) {
      this.hangOutHelper('/groups/' + this.props.groupId + '/hangouts', 'POST')
    }
  }

  hangOutHelper (url, type) {
    let page = this
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(sendPosition, showError)
    } else {
      $('#location-error').html('We apologize, but your browser does not support location services used by our app')
    }
    function showError (error) {
      let errorMessage
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = 'Please enable location services to participate in a hangout'
          break
        case error.POSITION_UNAVAILABLE:
          errorMessage = 'Sorry, but we cannot find your location. Please refresh the page and try again.'
          break
        case error.TIMEOUT:
          errorMessage = 'Sorry, but it took too long to find your location. Please refresh the page and try again.'
          break
        case error.UNKNOWN_ERROR:
          errorMessage = 'An unknown error occurred. Please refresh the page and try again.'
      }
      page.setState({locationError: errorMessage})
    }

    function sendPosition (position) {
      $('#location-error').empty()
      let lat = position.coords.latitude
      let long = position.coords.longitude

      function sendRequest (page, result) {
        var joinRequest = $.ajax({
          url: url,
          type: type,
          data: {lat: lat, long: long}
        })
        joinRequest.done((response) => {
          result(response, page)
        })
      }
      sendRequest(page, function (result, page) {
        page.setState({
          activeMembers: result.activeMembers,
          inHangout: result.inHangout,
          centerPoint: result.centerPoint,
          hangoutId: result.hangoutId,
          hangoutAdmin: result.hangoutAdmin,
          lockedOut: result.lockedOut
      })
    })
  }
}

leaveHangout() {
  let page = this
  var request = $.ajax ({
    url: '/groups/' + this.props.groupId + '/hangouts/' + this.state.hangoutId + '/leave',
    type: 'PUT'
  })
  request.done((response) => {
    page.setState({
      inHangout: response.inHangout,
      activeMembers: response.activeMembers
    })
    if (page.state.activeMembers.length == 0) {
      page.deleteHangout()
    }
  })
}


  loadHangoutButton () {
    if (this.state.hangoutId && this.state.lockedOut != true) {
      if (this.state.inHangout) {
        return <div><button onClick={this.leaveHangout} className='btn btn-default'>Leave Hangout</button>{this.adminDeleteButton()}{this.adminLockButton()}</div>
      } else {
        return <div><button className='btn btn-default' onClick={this.joinHangout}>Join Hangout</button>{this.adminDeleteButton()}{this.adminLockButton()}</div>
      }
    }
    else if (this.state.lockedOut != true){
      return <div><button className='btn btn-default' onClick={this.createHangout}>Create Hangout</button>{this.adminDeleteButton()}{this.adminLockButton()}</div>
    } else {
      return <div><button className='btn btn-default'>Hangout Locked</button>{this.adminDeleteButton()}</div>
    }
  }

  returnRestaurants () {
    if (this.state.centerPoint && this.state.inHangout) {
      getRestaurants(parseFloat(this.state.centerPoint.average_lat), parseFloat(this.state.centerPoint.average_long))
    }else {
      $('.restaurants-list').html('')
    }
  }

  deleteHangout() {
    let page = this
    var request = $.ajax ({
      url: '/groups/' + this.props.groupId + '/hangouts/' + this.state.hangoutId + '/delete',
      type: 'DELETE'
    })
    request.done((response) => {
      page.setState({
        activeMembers: [],
        hangoutId: null,
        inHangout: false,
        centerPoint: '',
        hangoutAdmin: null,
        lockedOut: null
      })
    })
  }

  lockHangout() {
    let page = this
    var request = $.ajax ({
      url: '/groups/' + this.props.groupId + '/hangouts/' + this.state.hangoutId + '/lock',
      type: 'PUT'
    })
    request.done((response) => {
      page.setState({
        lockedOut: response.locked_out
      })
    })
  }

  adminLockButton() {
    if (this.state.curretUserId == this.state.hangoutAdmin) {
      return <button onClick={this.lockHangout} className='btn btn-default'>Lock Hangout</button>
    }
  }

  adminDeleteButton() {
    if (this.state.curretUserId == this.state.hangoutAdmin) {
      return <button onClick={this.deleteHangout} className='btn btn-default'>Delete Hangout</button>
    }
  }

  render () {
    return (
      <div className='card content'>
        <div className='card-body'>
          <div className='card group-content' >
            <div className='hangout-button' >
              {this.loadHangoutButton()}
              <LocationError locationError={this.state.locationError} />
            </div>
            <div className='card-header'>
              <h3>Group Name</h3>
            </div>
            <div className='card-body text-center'>
              {this.state.title}
            </div>
          </div>
          <div className='card group-content' >
            <div className='card-header'>
              <h3>Members</h3>
            </div>
            <div id='member-list' className='card-body text-center'>
              {this.showMembers()}
            </div>
          </div>
          <div className='card group-content'>
            <div className='form-show'>
              {this.addMembers()}
            </div>
          </div>
          <div className='card group-content' >
            <div className='card-header'>
              <div className='restaurants-list'>
                {this.returnRestaurants()}
              </div>
            </div>
            <div className='card-body text-center'>
              <div className='map' />
              <p className='restaurants' />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
