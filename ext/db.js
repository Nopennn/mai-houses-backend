const db = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  const uri = "mongodb+srv://Makar:1111@cluster0.egdh5vo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  await db.connect( uri,
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