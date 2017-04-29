class SessionsController < ApplicationController
  def show
    session[:user_id] = 1
    render json: {sessionID: session[:user_id]}
  end
end
