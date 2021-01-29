//It returns the author object that has the matching ID.
function findAuthorById(authors, id) {
  return authors.find((obj) => obj.id === id);
}

//It returns the book object that has the matching ID
function findBookById(books, id) {
  return findAuthorById(books, id);
}

/* It returns an array with two arrays inside of it. All of the inputted books are present in either the
first or second array. */
function partitionBooksByBorrowedStatus(books) {
  const result = books.filter((item) => {
    for (let book of item.borrows) {
      return book.returned === false;
    }
  });
  const result2 = books.filter((item) => {
    for (let book of item.borrows) {
      return book.returned === true;
    }
  });
  return [result, result2];
}

/* It should return an array of all the transactions from the book's `borrows` key.
 However, each transaction should include the related account information and the `returned` key.
*/
function getBorrowersForBook(book, accounts) {
  const { borrows } = book;
  let borrowLog = borrows.map((instance) => {
    for (let account of accounts) {
      if (instance.id === account.id) {
        return { ...instance, ...account };
      }
    }
  });
  if (borrowLog.length > 10) {
    return borrowLog.slice(0, 10);
  } else {
    return borrowLog;
  }
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
