class HangoutsController < ApplicationController
  def current_hangouts
    user = User.find(session[:user_id])
    hangouts = user.hangouts
    render json: { hangouts: hangouts }
  end
  def show
    p params[:group_id]
    p params[:id]
    render json: {response: "hehe"}
  end
end
