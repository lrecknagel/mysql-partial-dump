const util = require('util'),
  exec = util.promisify(require('child_process').exec);

const dynamic_table_pk_map = {
  'TABLE_NAME': 'TABLE_IDENTIFIER'
};

const static_table_pk_map = [
  'TABLE_NAME'
];

async function dump_dynamic_tables() {
  const tables = Object.keys(dynamic_table_pk_map);
  for (let i = 0; i < tables.length; i++) {
    const table = tables[i];
    const pk = dynamic_table_pk_map[table];
    const DUMP_TABLE = `mysqldump -u USER --password='PW' DB_NAME ${ table } --where="${ pk } IN (YOUR_FILTERS)" > ./_out/${ table }.sql`
    const { stdout_mysql, stderr_mysql } = await exec(DUMP_TABLE);
  }
}

async function dump_static_tables() {
  for (let i = 0; i < static_table_pk_map.length; i++) {
    const table = static_table_pk_map[i];
    const DUMP_TABLE = `mysqldump -u USER --password='PW' DB_NAME ${ table } > ./_out/${ table }.sql`
    const { stdout_mysql, stderr_mysql } = await exec(DUMP_TABLE);
  }
}

async function run() {
  await dump_static_tables();
  await dump_dynamic_tables();
}

run();
