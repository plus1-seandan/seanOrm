const knex = require("../config/knex");

const tableExists = async (tableName: string) => {
  const rows = await knex("information_schema.tables").where({
    table_name: tableName,
  });
  if (rows.length === 0) {
    return false;
  }
  return true;
};

module.exports = tableExists;
