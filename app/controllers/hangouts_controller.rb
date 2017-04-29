class HangoutsController < ApplicationController
  def show
    user = User.find(session[:user_id])
    hangouts = user.hangouts
    render json: { hangouts: hangouts }
  end
end
