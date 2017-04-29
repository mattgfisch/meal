class UsersController < ApplicationController
  def show
    render component: 'Content'
  end
end
