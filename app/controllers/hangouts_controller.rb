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
      center_point = hangout.center_point
      center_point = {average_lat: center_point[:average_lat].to_f, average_long: center_point[:average_long].to_f}
      in_hangout = user.hangouts.any?{|user_hangout| user_hangout.id == hangout.id}
    end
    render json: {centerPoint: center_point, inHangout: in_hangout}
  end

  def create
    selected_group = Group.find(params[:group_id])
    user = User.find(session[:user_id])
    hangout = Hangout.create(creator_id: user.id, group_id: selected_group.id)


    hangout.members << user
    hangout.locations << Location.create(latitude: params[:lat], longitude: params[:long])

    in_hangout = user.hangouts.any?{|user_hangout| user_hangout.id == hangout.id}
    center_point = {average_lat: params[:lat], average_long: params[:long]}

    render json: {inHangout: in_hangout, hangoutId: hangout.id, centerPoint: center_point}
  end

  def leave_session
    user = User.find(sessions[:user_id])
    group = Group.find(params[:group_id])
    hangout = Hangout.find(params[:id])
    hangout.delete(user)

  end
end
