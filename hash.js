// Run this script with: node hash.js
const bcrypt = require('bcrypt');

const password = '123456';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) throw err;
  console.log('Bcrypt hash for 123456:', hash);
});
