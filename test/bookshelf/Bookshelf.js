import HardcoverBook from './HardcoverBook.js';
import PaperbackBook from './PaperbackBook.js';

export default class Bookshelf {
  books = [];

  addBook(book) {
    // Legyen egy addBook() függvénye,
    // aminek segítségével a paraméterben megadott könyvet el lehet tárolni a polcon.
    this.books.push(book);
  }

  getBooks(year) {
    // Legyen egy getBooks() függvénye, aminek legyen egy year paramétere.
    // Azon könyveket adja vissza egy listában / tömbben, amik a year évében lettek kiadva.
    return this.books.filter((book) => book.getReleaseYear() === year);
  }

  getLightestAuthor() {
    // Legyen egy getLightestAuthor() függvénye, ami visszaadja annak a szerzőnek a nevét,
    //aki a legkönnyebb könyvet írta.
    const booksStat = {};
    this.books.forEach((book) => {
      booksStat[book.getweight()] = book.getAuthor();
    });
    const weightList = Object.keys(booksStat).sort((a, b) => a - b);
    return `${booksStat[weightList[0]]}: ${weightList[0]}g`;
  }

  getAuthorOfMostWrittenPages() {
    // Legyen egy getAuthorOfMostWrittenPages() függvénye, ami visszaadja annak a szerzőnek a nevét,
    // aki a legtöbb oldalt írta.
    const booksStat = {};
    const authorsAndPages = {};
    this.books.forEach((book) => {
      if (!booksStat[book.getAuthor()]) {
        booksStat[book.getAuthor()] = book.getNumberOfPages();
      } else {
        booksStat[book.getAuthor()] += book.getNumberOfPages();
      }
    });
    for (let entry of Object.entries(booksStat)) {
      authorsAndPages[entry[1]] = entry[0];
    }
    const mostWrittenPages = Object.keys(authorsAndPages).sort((a, b) => b - a);
    return `${authorsAndPages[mostWrittenPages[0]]}, ${
      mostWrittenPages[0]
    } oldal`;
  }

  printBooks() {
    // Legyen egy printBooks() függvénye, ami kiírja az összes könyv adatát.
    // Soronként kiírja a könyvek getBookInfo() visszatérési értékét
    return this.books.forEach((book) => console.log(book.getBookInfo()));
  }
}
