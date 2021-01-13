import Book from './Book.js';
export default class PaperbackBook extends Book {
  constructor(title, author, releaseYear, numberOfPages) {
    super(title, author, releaseYear, numberOfPages);
    this.weightInGram = this.numberOfPages * 10 + 20;
  }
}
