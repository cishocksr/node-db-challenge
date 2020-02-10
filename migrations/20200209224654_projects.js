exports.up = async function(knex) {
  await knex.schema.createTable('projects', tbl => {
    tbl.increments('id');
    tbl
      .string('projects_name')
      .notNullable()
      .unique();
    tbl.string('project_description');
    tbl.boolean('project_completed').defaultTo(false);
  });

  await knex.schema.createTable('tasks', tbl => {
    tbl.increments('id');
    tbl.string('task_description').notNullable();
    tbl.string('task_notes');
    tbl
      .boolean('task_completed')
      .notNullable()
      .defaultTo(false);
    tbl
      .integer('project_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('projects')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });

  await knex.schema.createTable('resources', tbl => {
    tbl.increments();
    tbl
      .string('resource_name')
      .notNullable()
      .unique();
    tbl.string('resource_description');
  });

  await knex.schema.createTable('project_resources', tbl => {
    tbl.primary(['project_id', 'resource_id']);
    tbl
      .integer('project_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('projects')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl
      .integer('resource_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('resources')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('project_resources');
  await knex.schema.dropTableIfExists('resources');
  await knex.schema.dropTableIfExists('tasks');
  await knex.schema.dropTableIfExists('projects');
};
