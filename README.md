# Voice Notes AI 0.1 — Android + plan T-Rex 3

## Android
Źródła natywnej aplikacji Android (Java). Funkcje: rozpoznawanie polskiej mowy przez system Android, ręczne edytowanie, historia zapisana w prywatnych preferencjach aplikacji, usuwanie, eksport do TXT przez systemowy selektor plików.

Do zbudowania: Android Studio z SDK 35 i Gradle 8.9+; otwórz folder `Android`, zsynchronizuj Gradle i wybierz Build > Build APK(s). **APK nie został zbudowany ani przetestowany w tym środowisku.** Rozpoznawanie mowy zależy od usługi zainstalowanej na telefonie, może korzystać z internetu.

## Zegarek
Folder `Watch` zawiera specyfikację i plan integracji. **Nie zawiera gotowej aplikacji ani kodu QR.** Kluczowym nierozwiązanym etapem jest transmisja plików audio z Zepp OS do Androida.

## Ograniczenia
Ta wersja Androida nie odbiera nagrań z zegarka i nie korzysta z zewnętrznego API AI. To pierwszy działający projekt źródłowy aplikacji telefonicznej, nie pełna realizacja docelowego systemu.

## Kompilacja APK z telefonu przez GitHub Actions
Repozytorium powinno mieć w katalogu głównym foldery `.github`, `Android`, `Watch` oraz ten README. Utwórz prywatne repozytorium GitHub, prześlij do niego zawartość tego folderu, przejdź do zakładki **Actions** → **Build Voice Notes AI APK** → **Run workflow**. Po zakończeniu kompilacji pobierz artefakt `VoiceNotesAI-debug-apk`, rozpakuj go i zainstaluj `app-debug.apk` na Androidzie. Przy pierwszym uruchomieniu instalacji z przeglądarki/systemowego menedżera plików Android może poprosić o pozwolenie na instalację z tego źródła.

**Uwaga:** proces nie został wykonany w tym środowisku, więc poprawność kompilacji i działanie aplikacji trzeba zweryfikować po uruchomieniu workflow. Plik debug APK jest podpisywany testowym kluczem; nie jest to wersja sklepowa. Wersja na zegarek nadal nie została zaimplementowana.
