class HangoutsController < ApplicationController
  def current_hangouts
    user = User.find(session[:user_id])
    hangouts = user.hangouts
    render json: { hangouts: hangouts }
  end
  def show
    user = User.find(session[:user_id])
    if !(user.hangouts.any? {|hangout| hangout.id == params[:id]})
      user.hangouts << Hangout.find(params[:id])
    end
    p params[:group_id]
    p params[:id]
    p params
    render json: {response: "hehe"}
  end
end
