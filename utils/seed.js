const connection = require('../config/connection');
const { User, Thoughts } = require('../models');


connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  await User.deleteMany({});

  // Drop existing students
  await Thoughts.deleteMany({});

  

  console.table(students);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
