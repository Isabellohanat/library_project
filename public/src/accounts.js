const { booksBorrowedCount } = require("./home");

// Returning the account object that has the matching ID.
function findAccountById(accounts, id) {
  return accounts.find((accountID) => accountID.id === id);
}

// It returns a sorted array of objects. The objects are sorted alphabetically by last name.
function sortAccountsByLastName(accounts) {
  return accounts.sort((lastName1, lastName2) =>
    lastName1.name.last > lastName2.name.last ? 1 : -1
  );
}

// It returns a _number_ that represents the number of times the account's ID has appeared in a book's 'borrow' array.
function numberOfBorrows(account, books) {
  let borrowTimes = books.reduce((accumulator, book) => {
    book.borrows.forEach((borrow) => {
      if (account.id === borrow.id) {
        accumulator++;
      }
    });
    return accumulator;
  }, 0);
  return borrowTimes;
}

/* It returns an array of books and authors that represents all books _currently checked out_ by the given account.
 _Look carefully at the object below,_ as it's not just the book object; the author object is embedded inside of it.
 */
function getBooksPossessedByAccount(account, books, authors) {
  const result = books
    .filter((item) => {
      for (let book of item.borrows) {
        return book.id === account.id && book.returned === false;
      }
    })
    .map((book) => {
      const author = authors.find((author) => author.id === book.authorId);
      return { ...book, author };
    });
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};
