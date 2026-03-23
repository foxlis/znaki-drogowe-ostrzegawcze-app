# Znaki Drogowe App 🚦

Aplikacja mobilna do nauki polskich znaków drogowych. Ucz się znaków ostrzegawczych w trybie nauki lub sprawdź swoją wiedzę w quizie.

## Funkcjonalności

- 📚 **Tryb nauki** - Przeglądaj znaki drogowe jeden po jednym z opisami
- 🧪 **Tryb testu** - Sprawdź swoją wiedzę w quizie z 4 opcjami odpowiedzi
- 🎯 **Znaki ostrzegawcze i zakazu** - Kompletna baza polskich znaków drogowych kategorii A i B

## Download

### Wersja Preview APK

Pobierz najnowszą wersję preview aplikacji na android:

- [📱 Pobierz wersję preview](https://expo.dev/accounts/foxlis/projects/ZnakiDrogaApp/builds/e631c0f9-2064-415e-ad52-1a113cac8677)

Wersja preview zawiera pełną funkcjonalność aplikacji i jest gotowa do testowania na urządzeniach mobilnych.

## Wymagania - uruchomienie lokalne

- Node.js (wersja 18 lub nowsza)
- npm lub yarn
- Expo CLI
- EAS CLI (do budowania aplikacji)

## Instalacja

1. Zainstaluj zależności:

   ```bash
   npm install
   ```

2. Zainstaluj EAS CLI globalnie (jeśli jeszcze nie masz):

   ```bash
   npm install -g eas-cli
   ```

3. Zaloguj się do konta Expo:

   ```bash
   eas login
   ```

## Rozwój

Uruchom aplikację w trybie deweloperskim:

```bash
npm start
```

Lub uruchom na konkretnej platformie:

```bash
# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

## Budowanie aplikacji

### Android (APK)

#### 1. Build preview (APK do testowania)

```bash
eas build --platform android --profile preview
```

To wygeneruje plik APK, który możesz zainstalować bezpośrednio na urządzeniu Android.

#### 2. Build production (AAB dla Google Play Store)

```bash
eas build --platform android --profile production
```

To wygeneruje plik AAB (Android App Bundle), który jest wymagany do publikacji w Google Play Store.

#### 3. Lokalne budowanie APK (opcjonalnie)

Jeśli chcesz zbudować APK lokalnie bez EAS:

```bash
# Najpierw skonfiguruj lokalne środowisko Android
npx expo prebuild --platform android

# Następnie zbuduj APK
cd android
./gradlew assembleRelease
```

Plik APK znajdziesz w: `android/app/build/outputs/apk/release/app-release.apk`

### iOS

#### 1. Build preview (do testowania)

```bash
eas build --platform ios --profile preview
```

To wygeneruje plik IPA, który możesz zainstalować na urządzeniu iOS (wymaga Apple Developer Account).

#### 2. Build production (dla App Store)

```bash
eas build --platform ios --profile production
```

To wygeneruje plik IPA gotowy do przesłania do App Store Connect.

#### 3. Wymagania dla iOS

- Aktywne konto Apple Developer (99 USD/rok)
- Skonfigurowane certyfikaty i profile w EAS
- Urządzenie iOS do testowania (opcjonalnie)

### Sprawdzanie statusu builda

```bash
eas build:list
```

### Pobieranie zbudowanej aplikacji

Po zakończeniu builda, EAS wyśle link do pobrania aplikacji. Możesz też sprawdzić status na [expo.dev](https://expo.dev).

## Publikacja w sklepach

### Google Play Store

1. Zbuduj aplikację w trybie production:

   ```bash
   eas build --platform android --profile production
   ```

2. Prześlij aplikację do Google Play:
   ```bash
   eas submit --platform android
   ```

### Apple App Store

1. Zbuduj aplikację w trybie production:

   ```bash
   eas build --platform ios --profile production
   ```

2. Prześlij aplikację do App Store:
   ```bash
   eas submit --platform ios
   ```

## Struktura projektu

```
ZnakiDrogaApp/
├── app/                 # Ekrany aplikacji (Expo Router)
│   ├── index.tsx        # Ekran startowy
│   ├── learn/          # Tryb nauki
│   └── test/           # Tryb testu
├── assets/             # Zasoby (obrazy, znaki)
│   └── signs/          # Obrazy znaków drogowych
├── data/               # Dane aplikacji
│   └── signs.json     # Baza znaków drogowych
└── components/         # Komponenty React Native
```

## Konfiguracja

- `app.json` - Konfiguracja Expo
- `eas.json` - Konfiguracja EAS Build
- `package.json` - Zależności projektu

## Więcej informacji

- [Expo documentation](https://docs.expo.dev/)
- [EAS Build documentation](https://docs.expo.dev/build/introduction/)
- [Expo Router documentation](https://docs.expo.dev/router/introduction/)

## Licencja

MIT
