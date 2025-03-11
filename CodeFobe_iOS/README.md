# User Information App

A React Native mobile application that displays user information fetched from the Random Data API. The app allows users to navigate through a list of 80 users, displaying detailed information for each user.

## Features

- Fetches and displays information for 80 users from the Random Data API
- Displays user details including ID, UID, password, first name, last name, username, email, and avatar
- Navigation buttons to move between users
- Clean and responsive UI
- Error handling for API requests

## Screenshots

(Screenshots will be added here)

## Technologies Used

- React Native
- Expo
- React Navigation
- Axios for API requests

## Setup Instructions

### Prerequisites

- Node.js (v12 or higher)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/user-information-app.git
   cd user-information-app
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Start the development server:
   ```
   npm start
   ```
   or
   ```
   yarn start
   ```

4. Run on a device or emulator:
   - For iOS: Press `i` in the terminal or scan the QR code with the Expo Go app
   - For Android: Press `a` in the terminal or scan the QR code with the Expo Go app
   - For web: Press `w` in the terminal

## API Information

The app uses the Random Data API to fetch user information:
- API Endpoint: `https://random-data-api.com/api/users/random_user?size=80`
- The `size` parameter specifies the number of users to fetch

## Project Structure

```
user-information-app/
├── src/
│   ├── screens/
│   │   └── UserScreen.js
│   └── components/
├── App.js
├── app.json
└── package.json
```

## Future Improvements

- Add search functionality to find specific users
- Implement user filtering options
- Add more detailed user information
- Implement data caching for offline use

## License

This project is licensed under the MIT License. 