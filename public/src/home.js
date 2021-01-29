// It returns a number that represents the number of book objects inside of the array.
function totalBooksCount(books) {
  var result = 0;
  for (var total in books) {
    if (books.hasOwnProperty(total)) {
      result++;
    }
  }
  return result;
}

// It returns a number that represents the number of account objects inside of the array.
function totalAccountsCount(accounts) {
  return totalBooksCount(accounts);
}

/* It returns a number that represents the number of books _that have been taken out from the library._
  This number can be found by looking at the first transaction in the `borrows` key of each book.
   If the transaction says the book has not been returned (i.e. `returned: false`), the book has been borrowed.
 */
function booksBorrowedCount(books) {
  let count = 0;
  books.forEach((book) => {
    if (book.borrows[0].returned === false) count += 1;
  });
  return count;
}

/* It returns an array containing five objects or less that represents the most common occurring genres, ordered from most common to least.
 - The `name` key which represents the name of the genre.- The `count` key which represents the number of times the genre occurs. 
 If more than five genres are present, only the top five should be returned.
*/
function getMostCommonGenres(books) {
  const newObject = {};
  const newArray = [];
  const genres = books.map((book) => book.genre);
  console.log(genres);
  for (const book of books) {
    newObject[book.genre]
      ? (newObject[book.genre] += 1)
      : (newObject[book.genre] = 1);
  }
  for (let i = 0; i < Object.keys(newObject).length; i++) {
    newArray.push({
      name: Object.keys(newObject)[i],
      count: Object.values(newObject)[i],
    });
  }
  return newArray.sort((a, b) => (a.count > b.count ? -1 : 1)).slice(0, 5);
}

/* It returns an array containing five objects or less that represents the most popular books in the library. Popularity is represented by the number of times a book has been borrowed.
Each object in the returned array has two keys:
- The `name` key which represents the title of the book.
- The `count` key which represents the number of times the book has been borrowed.
If more than five books are present, only the top five should be returned.
*/
function getMostPopularBooks(books) {
  const commonTitles = [];
  for (const book of books) {
    const { borrows, title } = book;
    commonTitles.push({
      name: title,
      count: borrows.length,
    });
  }
  return commonTitles.sort((a, b) => (a.count > b.count ? -1 : 1)).slice(0, 5);
}

/* It returns an array containing five objects or less that represents the most popular authors whose books have been checked out the most. 
Popularity is represented by finding all of the books written by the author and then adding up the number of times those books have been borrowed.
Each object in the returned array has two keys:
- The `name` key which represents the first and last name of the author.
- The `count` key which represents the number of times the author's books have been borrowed.
If more than five authors are present, only the top five should be returned.
*/
function getMostPopularAuthors(books, authors) {
  const popTitles = [];
  for (const book of books) {
    let theAuthorName;
    let count = book.borrows.length;
    for (let author of authors) {
      const { first, last } = author.name;
      if (book.authorId === author.id) {
        theAuthorName = `${first} ${last}`;
      }
    }
    popTitles.push({
      ...book,
      theAuthorName,
      count,
    });
  }
  let sortedPopTitles = popTitles.sort((a, b) => (a.count > b.count ? -1 : 1));
  const popularAuthors = [];
  for (const oneTitle of sortedPopTitles) {
    popularAuthors.push({
      name: oneTitle.theAuthorName,
      count: oneTitle.count,
    });
  }
  return popularAuthors.slice(0, 5);
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
