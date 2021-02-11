import { createRequire } from 'module';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

export default class SinglesRepository {
  dataFile = './data/singles.json';

  getSingles() {
    return require(this.dataFile);
  }

  create(single) {
    try {
      const singles = require(this.dataFile);

      single.id = this.generateId(singles);

      singles.push(single);

      this.commitChanges(singles);

      return single;
    } catch (err) {
      return false;
    }
  }

  commitChanges(singles) {
    fs.writeFileSync(
      path.resolve(__dirname, this.dataFile),
      JSON.stringify(singles)
    );
  }

  generateId(singles) {
    let lastId = parseInt(singles[singles.length - 1].id);
    return lastId + 1;
  }
}
