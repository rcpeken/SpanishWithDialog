# SpanishWithDialog 🇪🇸

An AI-powered mobile application that helps users learn Spanish through dynamically generated, contextual dialogues. Users can explore pre-built conversation suggestions or generate new dialogues on any topic using Google Gemini AI.

---

## Features

- **AI-Generated Dialogues** – Enter any topic and receive 20 Spanish sentences with pronunciation guides and English translations, powered by Google Gemini.
- **Discover Screen** – Browse pre-generated dialogue suggestions filtered by category (Travel, Business, Dining, etc.).
- **Library** – Save, manage, and revisit your favorite dialogues.
- **Device-Based Tracking** – No account required; your saved dialogues are tied to your device ID.
- **A1-Level Spanish** – Content is calibrated for beginners with side-by-side Spanish, pronunciation, and English columns.

---

## Tech Stack

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Java | 17 | Language |
| Spring Boot | 3.2.5 | REST API framework |
| Spring Data JPA | — | ORM / database access |
| PostgreSQL | — | Persistent storage |
| Google Gemini AI (`google-genai`) | 1.0.0 | Dialogue generation |
| Lombok | 1.18.30 | Boilerplate reduction |

### Mobile
| Technology | Version | Purpose |
|---|---|---|
| React Native (Expo) | ~54.0 | Cross-platform mobile UI |
| TypeScript | ~5.9 | Type-safe JavaScript |
| React Navigation | ^7 | Tab + stack navigation |
| Zustand | ^5 | State management |
| Axios | ^1 | HTTP client |

---

## Project Structure

```
SpanishWithDialog/
├── backend/                  # Spring Boot REST API
│   └── src/main/java/
│       └── com/recep/
│           ├── controller/   # ScenarioController, SavedDialogController, SuggestionController
│           ├── service/      # GeminiService (AI integration)
│           ├── entity/       # JPA entities (SavedDialog, Suggestion)
│           └── repository/   # Spring Data repositories
└── mobile/                   # React Native (Expo) app
    └── src/
        ├── features/         # Screen-level feature modules (discover, library)
        ├── components/       # Reusable UI components (atoms, molecules, organisms)
        ├── navigation/       # Tab and stack navigators
        ├── store/            # Zustand state stores
        ├── api/              # Axios API clients
        ├── theme/            # Colors, typography, spacing tokens
        └── types/            # Shared TypeScript types
```

---

## Getting Started

### Prerequisites

- **Java 17+** and **Maven 3.8+**
- **Node.js 18+** and **npm**
- **Expo CLI** (`npm install -g expo-cli`)
- **PostgreSQL** database
- **Google Gemini API key** ([Get one here](https://aistudio.google.com/app/apikey))

---

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Configure `src/main/resources/application.properties` (or `application.yml`) with your database and Gemini credentials:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/spanishwithdialog
   spring.datasource.username=YOUR_DB_USER
   spring.datasource.password=YOUR_DB_PASSWORD
   spring.jpa.hibernate.ddl-auto=update
   gemini.api.key=YOUR_GEMINI_API_KEY
   ```

3. Build and run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

   The API will be available at `http://localhost:8080`.

---

### Mobile Setup

1. Navigate to the mobile directory:
   ```bash
   cd mobile
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment file and set your API URL:
   ```bash
   cp .env.example .env
   ```
   Edit `.env`:
   ```env
   EXPO_PUBLIC_API_URL=http://localhost:8080/api
   ```

4. Start the Expo development server:
   ```bash
   npm start
   ```

   Scan the QR code with the **Expo Go** app (iOS/Android), or press `a` for Android emulator / `i` for iOS simulator.

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/scenario` | Generate a new dialogue for a given topic |
| `GET` | `/api/suggestions` | Fetch pre-generated dialogue suggestions |
| `GET` | `/api/library/dialogs` | Retrieve saved dialogues for a device |
| `POST` | `/api/library/dialogs` | Save a dialogue to the library |
| `DELETE` | `/api/library/dialogs/{id}` | Delete a saved dialogue |

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## License

This project is open source. See the repository for licensing details.
