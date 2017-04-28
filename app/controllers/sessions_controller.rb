class SessionsController < ApplicationController

  def new
    @user = 8
    render 'sessions/partials/_new'
  end

  def create
  end
end
