class HangoutsController < ApplicationController
  def current_hangouts
    user = User.find(session[:user_id])
    hangouts = user.hangouts
    render json: { hangouts: hangouts }
  end

  def update
    hangout = Hangout.find(params[:id])
    user = User.find(session[:user_id])
    if !(user.hangouts.any? {|user_hangout| user_hangout.id == hangout.id})
      user.hangouts << hangout
      hangout.locations << Location.create(latitude: params[:lat], longitude: params[:long])
    end
    render json: {response: "hehe"}
  end

  def create
    selected_group = Group.find(params[:group_id])
    user = User.find(session[:user_id])
    hangout = Hangout.create(creator_id: user.id, group_id: selected_group.id)
    hangout.members << user
    in_hangout = user.hangouts.any?{|user_hangout| user_hangout.id == hangout.id}

    render json: {inHangout: in_hangout, hangoutId: hangout.id}
  end
end
