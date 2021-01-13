export default class Book {
  // Minden könyvnek legyen:
  // címe (title)
  // szerzője (author)
  // kiadási éve (releaseYear)
  // oldalak száma (numberOfPages)
  // tömege gramban mérve (weightInGram)
  title;
  author;
  releaseYear;
  numberOfPages;
  weightInGram;
  constructor(title, author, releaseYear, numberOfPages, weightInGram) {
    this.title = title;
    this.author = author;
    this.releaseYear = releaseYear;
    this.numberOfPages = numberOfPages;
    this.weightInGram = weightInGram;
  }

  getBookInfo() {
    // Legyen egy getBookInfo() függvénye, ami egy stringgel tér vissza a következő formátumban:
    // <author>: <title> (<releaseYear>)
    // Példa: J. K. Rowling: Harry Potter and the Philosopher's Stone (1997)
    return `${this.author}: ${this.title} (${this.releaseYear})`;
  }

  getReleaseYear() {
    return this.releaseYear;
  }

  getAuthor() {
    return this.author;
  }

  getweight() {
    return this.weightInGram;
  }

  getNumberOfPages() {
    return this.numberOfPages;
  }
}
