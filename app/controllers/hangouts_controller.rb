class HangoutsController < ApplicationController
  def current_hangouts
    user = User.find(session[:user_id])
    hangouts = user.hangouts
    render json: { hangouts: hangouts }
  end

  def update
    hangout = Hangout.find(params[:id])
    hangout_admin = hangout.creator_id
    selected_group = Group.find(params[:group_id])
    user = User.find(session[:user_id])
    if !(user.hangouts.any? {|user_hangout| user_hangout.id == hangout.id})
      user.hangouts << hangout
      hangout.locations << Location.create(latitude: params[:lat], longitude: params[:long])
      center_point = hangout.center_point
      center_point = {average_lat: center_point[:average_lat].to_f, average_long: center_point[:average_long].to_f}
      in_hangout = user.hangouts.any?{|user_hangout| user_hangout.id == hangout.id}
      active_members = selected_group.members.select do |member|
        member.hangouts.any?{|member_hangout| member_hangout.id == hangout.id}
      end
      active_members.map! { |member| member.name }
    end
    render json: {lockedOut: hangout.locked_out, hangoutAdmin: hangout_admin, activeMembers: active_members, centerPoint: center_point, hangoutId: hangout.id, inHangout: in_hangout}
  end

  def create
    selected_group = Group.find(params[:group_id])
    user = User.find(session[:user_id])
    if(selected_group.hangouts.first)
      hangout = selected_group.hangouts.first
      hangout.members << user
      hangout.locations << Location.create(latitude: params[:lat], longitude: params[:long])
    else
      hangout = Hangout.create(creator_id: user.id, group_id: selected_group.id, locked_out: false)
      hangout.members << user
      hangout.locations << Location.create(latitude: params[:lat], longitude: params[:long])
    end

    in_hangout = user.hangouts.any?{|user_hangout| user_hangout.id == hangout.id}
    center_point = {average_lat: params[:lat], average_long: params[:long]}
    active_members = selected_group.members.select do |member|
      member.hangouts.any?{|member_hangout| member_hangout.id == hangout.id}
    end
    active_members.map! { |member| member.name }

    render json: {lockedOut: hangout.locked_out, hangoutAdmin: hangout.creator_id, activeMembers: active_members, inHangout: in_hangout, hangoutId: hangout.id, centerPoint: center_point}
  end

  def leave
    user = User.find(session[:user_id])
    hangout = Hangout.find(params[:id])
    hangout.members.delete(user)
    in_hangout = hangout.members.include?(user)
    active_members = []
    if(hangout.members.length != 0)
      hangout.members.map do |user|
        active_members << user.name
      end
    end
    render json: {activeMembers: active_members, inHangout: in_hangout}
  end

  def delete
    Hangout.destroy(params[:id])
  end

  def lock
    hangout = Hangout.find(params[:id])
    hangout.update_attributes(locked_out: true)
    render json: {locked_out: hangout.locked_out}
  end
end
