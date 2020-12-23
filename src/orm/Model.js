const tableExists = require("./tableExists");
const knex = require("../config/knex");

class Model {
  constructor(values = {}, options = {}) {
    options = {
      // where: {}, in case I want to add more props to this
      columns: options,
    };
    if (options.attributes) {
      options.attributes = options.attributes.map((attribute) =>
        Array.isArray(attribute) ? attribute[1] : attribute
      );
    }
    this.values = values || {};
    this.options = options || {};
  }
  async save() {
    console.log(this.values);
    if (this.values.hasOwnProperty("id")) {
      await knex(this.constructor.name)
        .where({ id: this.values.id })
        .update(this.values);
    } else {
      await knex(this.constructor.name).insert(this.values);
    }
  }
  async delete() {
    await knex(this.constructor.name).where({ id: this.values.id }).del();
  }
  static async select(whereClause) {
    const model = new this();
    var result = [];
    const data = await knex(model.constructor.name).where(whereClause);
    data.forEach((obj) => {
      result.push(new this(obj));
    });
    return result;
  }

  static async tableCreate() {
    const model = new this();
    const tableName = model.constructor.name;
    const doesTableExist = await tableExists(tableName);
    if (doesTableExist) {
      console.log(`Table "${tableName}" already exists. Skipping...`);
      return;
    }
    console.log(model.options);
    const columns = Object.entries(model.options.columns);
    if (tableExists(tableName))
      await knex.schema.createTable(tableName, (table) => {
        columns.forEach((column) => {
          if (
            column[1].hasOwnProperty("primaryKey") &&
            column[1]["primaryKey"]
          ) {
            table.increments(column[0]).primary();
          } else if (
            column[1].hasOwnProperty("allowNull") &&
            !column[1]["allowNull"]
          ) {
            table[column[1].type.toString()](column[0]).notNullable();
          } else {
            table[column[1].type.toString()](column[0]);
          }
        });
      });
  }
}
module.exports = Model;
