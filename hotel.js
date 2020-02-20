var faker = require("faker");
function generateEmployees() {
  var guides = [];
  for (var id = 0; id < 50; id++) {
    var firstName = faker.name.firstName();
    var lastName = faker.name.lastName();
    var email = faker.internet.email();
    guides.push({
      //   id: id,
      first_name: firstName,
      last_name: lastName,
      email: email
    });
  }
  return { guides: guides };
}
module.exports = generateEmployees;
