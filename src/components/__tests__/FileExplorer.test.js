import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders file explorer', () => {
    render(<App />);
    const headerElement = screen.getByText(/File Explorer/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('filters files by name', () => {
    render(<App />);
    const filterInput = screen.getByPlaceholderText(/Filter by name/i);
    fireEvent.change(filterInput, { target: { value: 'Employee' } });
    const filteredFile = screen.getByText(/Employee Handbook/i);
    expect(filteredFile).toBeInTheDocument();
  });

  test('opens and navigates folders', () => {
    render(<App />);
    const folderElement = screen.getByText(/Expenses/i);
    fireEvent.click(folderElement);
    const backElement = screen.getByText(/Back/i);
    expect(backElement).toBeInTheDocument();
    const fileInFolder = screen.getByText(/Expenses claim form/i);
    expect(fileInFolder).toBeInTheDocument();
  });

  test('sorts files correctly', () => {
    render(<App />);
    const sortByName = screen.getByText(/Sort by Name/i);
    fireEvent.click(sortByName);
    const firstFile = screen.getAllByRole('row')[1];
    expect(firstFile).toHaveTextContent(/Cost centres/i);

    const sortBySize = screen.getByText(/Sort by Size/i);
    fireEvent.click(sortBySize);
    const smallestFile = screen.getAllByRole('row')[1];
    expect(smallestFile).toHaveTextContent(/Welcome to the company!/i);
  });

  test('navigates breadcrumbs correctly', () => {
    render(<App />);
    const folderElement = screen.getByText(/Expenses/i);
    fireEvent.click(folderElement);
    const breadcrumbElement = screen.getByText(/Expenses/i);
    expect(breadcrumbElement).toBeInTheDocument();

    fireEvent.click(breadcrumbElement);
    const rootFolderFile = screen.getByText(/Employee Handbook/i);
    expect(rootFolderFile).toBeInTheDocument();
  });
});