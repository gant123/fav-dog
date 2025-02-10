// To push to build

import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import App from './app';
import React from 'react';

describe('App Routing', () => {
  test('renders LoginPage when route is "/login"', () => {
    // Set the route before rendering App
    window.history.pushState({}, 'Login Page', '/login');
    render(<App />);
    // Look for a heading that contains "login"
    const loginHeading = screen.getByRole('heading', { name: /login/i });
    expect(loginHeading).toBeInTheDocument();
  });

  test('renders SearchPage when route is "/search"', () => {
    window.history.pushState({}, 'Search Page', '/search');
    render(<App />);
    // Assumes SearchPage renders a heading that includes "search" (adjust as needed)
    const searchHeading = screen.getByRole('heading', { name: /search/i });
    expect(searchHeading).toBeInTheDocument();
  });

  test('redirects to LoginPage for unknown routes', () => {
    window.history.pushState({}, 'Unknown Route', '/unknown');
    render(<App />);
    // The wildcard route should navigate to LoginPage
    const loginHeading = screen.getByRole('heading', { name: /login/i });
    expect(loginHeading).toBeInTheDocument();
  });
});
