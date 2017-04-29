class SessionsController < ApplicationController
  def show
    session[:user_id] = User.find_by(name: "Matt").id
    render json: {sessionID: session[:user_id]}
  end
end
