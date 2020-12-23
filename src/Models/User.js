const Model = require("../orm/Model");

class User extends Model {
  constructor(values, options) {
    super(values, {
      id: {
        type: "uuid",
        primaryKey: true,
      },
      name: {
        type: "string",
        allowNull: false,
      },
      preferredName: {
        type: "string",
        allowNull: true,
      },
    });
  }
}

module.exports = User;
