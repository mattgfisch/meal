User.delete_all
Group.delete_all
Hangout.delete_all


eitan = User.create(name: "Eitan", email: "eitan@eitan.com", password: "password")
austin = User.create(name: "Austin", email: "austin@austin.com", password: "password")

matt = User.create!(name: "Matt", email: "matt@matt.com", password: "password")
dillon = User.create!(name: "Dillon", email: "dillon@dillon.com", password: "password")
group1 = Group.create!(name: "Test", admin_id: 3)
Hangout.create!(creator_id: 2, group_id: 1)

group1.members << dillon
group1.members << matt
group1.members << eitan
group1.members << austin
