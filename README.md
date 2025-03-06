# Clothes Swap App

A Tinder-like mobile application for swapping used clothes, initially targeting college students. Users can add their clothes, swipe through others' items, and arrange swaps through an in-app chat system.

## Features

- User authentication and profiles
- Add up to 10 clothes items per user
- Swipe right/left functionality for clothes
- Matching system for clothes swaps
- In-app chat for discussing swap details
- Time-limited swap agreements
- College-specific community

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac users) or Android Studio (for Android development)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/clothes-swap-app.git
cd clothes-swap-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Run on your preferred platform:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app for physical device

## Project Structure

```
src/
  ├── screens/           # Screen components
  │   ├── LoginScreen.tsx
  │   ├── HomeScreen.tsx
  │   ├── AddClothesScreen.tsx
  │   ├── ProfileScreen.tsx
  │   ├── MatchesScreen.tsx
  │   └── ChatScreen.tsx
  ├── components/        # Reusable components
  ├── navigation/        # Navigation configuration
  ├── services/         # API and other services
  ├── hooks/            # Custom React hooks
  ├── utils/            # Utility functions
  └── types/            # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with React Native and Expo
- Uses Firebase for backend services
- Inspired by Tinder's user interface 