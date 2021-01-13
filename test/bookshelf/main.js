import HardcoverBook from './HardcoverBook.js';
import PaperbackBook from './PaperbackBook.js';
import Bookshelf from './Bookshelf.js';

const book = new HardcoverBook('valami', 'John Doe', 1984, 20);
const book1 = new PaperbackBook('valami2', 'Jane Doe', 1964, 100);
const book2 = new PaperbackBook(
  '49-es tétel kiáltása',
  'Thomas Pynchon',
  1964,
  1
);
const book3 = new HardcoverBook('1984', 'John Orwel', 1984, 2);
const book5 = new PaperbackBook('Gravitys raibow', 'Thomas Pynchon', 1968, 100);
const bookshelf = new Bookshelf();
bookshelf.addBook(book);
bookshelf.addBook(book1);
bookshelf.addBook(book2);
bookshelf.addBook(book3);
bookshelf.addBook(book5);
bookshelf.printBooks();

console.log(bookshelf.getBooks(1964));

console.log(bookshelf.getLightestAuthor());
console.log(bookshelf.getAuthorOfMostWrittenPages());
