# Voice Notes AI — Amazfit T-Rex 3

Prototyp nagrywania OPUS znajduje się w `WatchApp`. Instrukcję budowania i instalacji testowej zawiera [README repozytorium](../README.md). Poniżej opisano plan integracji z telefonem.

Plan ekranów:
- Lista nagrań
- Rozpocznij / Zatrzymaj
- Oczekuje na transfer / Przesłano / Błąd

Proponowany protokół: nagranie OPUS -> podział na porcje -> Side Service -> endpoint odbierający na Androidzie -> transkrypcja -> zapis w lokalnej bazie -> potwierdzenie do zegarka.

**Nie generuj QR przed uzyskaniem prawidłowego, skompilowanego i dostępnego pakietu `.zab`.**
