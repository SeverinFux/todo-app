# GitHub Actions Pipeline for Deploying to GitHub Pages

## Overview
This pipeline automates the process of testing, building, and deploying a project to GitHub Pages. It is triggered by pushes to the `main` branch.

## Jobs

### 1. End-to-End Tests (`e2e-tests`)
- **Runs on:** `ubuntu-latest`
- **Steps:**
    - Checkout code from the repository.
    - Set up Node.js version 16.
    - Install project dependencies.
    - Start the application in the background.
    - Wait for the server to be ready.
    - Run Cypress end-to-end tests.

### 2. Unit Tests (`unit-tests`)
- **Runs on:** `ubuntu-latest`
- **Steps:**
    - Checkout code from the repository.
    - Set up Node.js version 16.
    - Install project dependencies.
    - Start the application in the background.
    - Wait for the server to be ready.
    - Run Jest unit tests.

### 3. Build (`build`)
- **Runs on:** `ubuntu-latest`
- **Needs:** `e2e-tests`, `unit-tests`
- **Steps:**
    - Checkout code from the repository.
    - Set up Node.js version 16.
    - Install project dependencies.
    - Build the project.

### 4. Deploy (`deploy`)
- **Runs on:** `ubuntu-latest`
- **Needs:** `build`
- **Steps:**
    - Checkout code from the repository.
    - Set up Node.js version 16.
    - Install project dependencies.
    - Deploy the project to GitHub Pages.
    - Merge the current branch into the target branch.