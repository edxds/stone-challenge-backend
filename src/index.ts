import { connectDatabase } from './database';
import { runServer } from './server';

async function main() {
  await connectDatabase();
  runServer();
}

main();
