class GroupsController < ApplicationController

  def create
    groupName = params[:groupName]
    emails = params[:groupEmails]
    return render json: { errors: "Group name can't be blank" }, status: 400 if groupName == ""

    creator = User.find(session[:user_id])
    group = Group.new(name: groupName)

    if emails && groupName
      emails.each do |email|
        user = User.find_by(email: email)
        if user && user != creator
          group.members << user
        else
          return render json: {errors: "Invalid email(s)" }, status: 422
        end
      end
      creator.created_groups << group
      group.save
      group.members << creator
      return render json: { group_id: group.id }
    end
    if groupName
      creator.created_groups << group
      group.save
      group.members << creator
      return render json: { group_id: group.id }
    end
  end

  def show
    user = User.find(session[:user_id])
    group = Group.find(params[:id])
    if !(group.hangouts.empty?)
      hangout_id = group.hangouts.first.id
      hangout_admin = Hangout.find(hangout_id).creator_id
      center_point = Hangout.find(hangout_id).center_point
      locked_out = Hangout.find(hangout_id).locked_out

      center_point = {average_lat: center_point[:average_lat].to_f, average_long: center_point[:average_long].to_f}

      in_hangout = user.hangouts.any?{|user_hangout| user_hangout.id == hangout_id}
      active_members = group.members.select do |member|
        member.hangouts.any?{|member_hangout| member_hangout.id == hangout_id}
      end
      active_members.map! { |member| member.name }
    else
      hangout_id = nil
    end
    group_members = group.members.map { |member| member.name }
    render json: {
      curretUserId: user.id,
      hangoutAdmin: hangout_admin,
      activeMembers: active_members,
      groupTitle: group.name,
      groupMembers: group_members,
      groupAdminId: group.admin_id,
      hangoutId: hangout_id,
      inHangout: in_hangout,
      centerPoint: center_point,
      lockedOut: locked_out
     }
  end

  def joined_groups
    user = User.find(session[:user_id])
    groups = user.groups
    render json: { groups: groups }
  end

  def add_members
    user = User.find_by(email: params[:currentEmail])
    group = Group.find(params[:id])
    if user && !group.members.include?(user)
      group.members << user
      render json: {username: user.name}
    else
      return render json: {errors: "Invalid email" }, status: 422
    end
  end

  def admin_groups
    user = User.find(session[:user_id])
    admin_groups = user.created_groups
    render json: { admin_groups: admin_groups }
  end

  def update
    group = Group.find(params[:id])
    user = User.find(session[:user_id])
    group.members.delete(user)
  end

  def destroy
    Group.destroy(params[:id])
  end
end
