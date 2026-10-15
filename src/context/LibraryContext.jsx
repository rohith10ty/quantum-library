import React, { createContext, useContext, useState } from 'react';
import { ALL_BOOKS, INITIAL_STUDENT } from '../data/libraryData';

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [books, setBooks] = useState(ALL_BOOKS);
  const [student, setStudent] = useState(INITIAL_STUDENT);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [selectedBookForIssue, setSelectedBookForIssue] = useState(null);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const login = (userData) => {
    setIsLoggedIn(true);
    setStudent((prev) => ({
      ...prev,
      ...userData,
    }));
    showNotification(`Welcome back, ${userData.name || 'Scholar'}!`);
  };

  const logout = () => {
    setIsLoggedIn(false);
    showNotification('Logged out successfully from Library Portal.', 'info');
  };

  const openIssueModal = (book) => {
    setSelectedBookForIssue(book);
  };

  const closeIssueModal = () => {
    setSelectedBookForIssue(null);
  };

  const issueBook = (bookId, durationDays = 14) => {
    const targetBook = books.find((b) => b.id === bookId);
    if (!targetBook) return false;

    if (!targetBook.available || targetBook.availableCopies <= 0) {
      showNotification('Sorry, all copies of this book are currently checked out.', 'error');
      return false;
    }

    // Check if student already has this book
    const alreadyBorrowed = student.borrowedBooks.some((b) => b.id === bookId);
    if (alreadyBorrowed) {
      showNotification('You have already borrowed this book!', 'error');
      return false;
    }

    // Calculate dates
    const today = new Date();
    const dueDate = new Date();
    dueDate.setDate(today.getDate() + durationDays);

    const borrowRecord = {
      id: targetBook.id,
      title: targetBook.title,
      author: targetBook.author,
      cover: targetBook.cover,
      borrowDate: today.toISOString().split('T')[0],
      dueDate: dueDate.toISOString().split('T')[0],
      daysLeft: durationDays,
      status: 'Active',
    };

    // Update book copies
    setBooks((prev) =>
      prev.map((b) => {
        if (b.id === bookId) {
          const newCopies = b.availableCopies - 1;
          return {
            ...b,
            availableCopies: newCopies,
            available: newCopies > 0,
          };
        }
        return b;
      })
    );

    // Update student records
    setStudent((prev) => ({
      ...prev,
      borrowedBooks: [borrowRecord, ...prev.borrowedBooks],
    }));

    showNotification(`"${targetBook.title}" issued successfully for ${durationDays} days!`);
    closeIssueModal();
    return true;
  };

  const returnBook = (bookId) => {
    const borrowed = student.borrowedBooks.find((b) => b.id === bookId);
    if (!borrowed) return;

    // Update book inventory
    setBooks((prev) =>
      prev.map((b) => {
        if (b.id === bookId) {
          const newCopies = b.availableCopies + 1;
          return {
            ...b,
            availableCopies: newCopies,
            available: true,
          };
        }
        return b;
      })
    );

    // Add to reading history
    const historyEntry = {
      id: `h-${Date.now()}`,
      title: borrowed.title,
      author: borrowed.author,
      cover: borrowed.cover,
      returnDate: new Date().toISOString().split('T')[0],
      rating: 5,
    };

    // Remove from borrowed
    setStudent((prev) => ({
      ...prev,
      borrowedBooks: prev.borrowedBooks.filter((b) => b.id !== bookId),
      readingHistory: [historyEntry, ...prev.readingHistory],
    }));

    showNotification(`"${borrowed.title}" returned to Library catalog.`);
  };

  const renewBook = (bookId) => {
    setStudent((prev) => ({
      ...prev,
      borrowedBooks: prev.borrowedBooks.map((b) => {
        if (b.id === bookId) {
          const cur = new Date(b.dueDate);
          cur.setDate(cur.getDate() + 14);
          return {
            ...b,
            dueDate: cur.toISOString().split('T')[0],
            daysLeft: b.daysLeft + 14,
          };
        }
        return b;
      }),
    }));
    showNotification('Book renewed for an additional 14 days!');
  };

  return (
    <LibraryContext.Provider
      value={{
        books,
        student,
        isLoggedIn,
        login,
        logout,
        issueBook,
        returnBook,
        renewBook,
        selectedBookForIssue,
        openIssueModal,
        closeIssueModal,
        notification,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};
