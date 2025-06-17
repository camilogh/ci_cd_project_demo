// api-service/seeds/initial_items.js
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        { name: 'Item from DB A', value: 100 },
        { name: 'Item from DB B', value: 250 },
        { name: 'Item from DB C', value: 150 }
      ]);
    });
};