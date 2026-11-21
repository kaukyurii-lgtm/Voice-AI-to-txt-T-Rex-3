# Voice Notes AI — Amazfit T-Rex 3

Ten folder to **specyfikacja prototypu**, a nie działający pakiet ZAB. Przed dostarczeniem aplikacji na zegarek trzeba zweryfikować aktualne API nagrywania Zepp OS 5, uprawnienia mikrofonu, przesyłanie plików do Side Service i schemat manifestu dla modelu T-Rex 3.

Plan ekranów:
- Lista nagrań
- Rozpocznij / Zatrzymaj
- Oczekuje na transfer / Przesłano / Błąd

Proponowany protokół: nagranie OPUS -> podział na porcje -> Side Service -> endpoint odbierający na Androidzie -> transkrypcja -> zapis w lokalnej bazie -> potwierdzenie do zegarka.

**Nie generuj QR przed uzyskaniem prawidłowego, skompilowanego i dostępnego pakietu `.zab`.**
