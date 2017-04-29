require 'rails_helper'

RSpec.describe SessionsController, type: :controller do
  describe 'post session' do
    it 'responds with status code 200' do
      expect(response).to have_http_status 200
    end
  end
end
