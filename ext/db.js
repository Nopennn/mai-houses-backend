const db = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await db.connect('mongodb://127.0.0.1:27017/mai_houses',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }
  );

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

module.exports = main();