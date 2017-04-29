# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

matt = User.create!(name: "Matt", email: "matt@matt.com", password: "password")
dillon = User.create!(name: "Dillon", email: "dillon@dillon.com", password: "password")
group1 = Group.create!(name: "Test", admin_id: 1)
hangout1 = Hangout.create!(creator_id: 2, group_id: 1)

group1.members << dillon
group1.members << matt
hangout1.members << matt
hangout1.members << dillon
