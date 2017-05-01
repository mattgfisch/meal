class HangoutsController < ApplicationController
  def current_hangouts
    user = User.find(session[:user_id])
    hangouts = user.hangouts
    render json: { hangouts: hangouts }
  end
  
  def show
    hangout = Hangout.find(params[:id])
    user = User.find(session[:user_id])
    p user.hangouts
    if !(user.hangouts.any? {|user_hangout| user_hangout.id == hangout.id})
      user.hangouts << hangout
      hangout.locations << Location.create(latitude: params[:lat], longitude: params[:long])
    end
    p hangout.locations
    render json: {response: "hehe"}
  end
end
