# Placeholder the habit (name to be changed)

## Projektbeschreibung

Dieses Projekt ist eine gamifizierte Aufgabenverwaltungs-App, die auf einem Kanban-System basiert.

Benutzer können Aufgaben erstellen und diese durch verschiedene Status verschieben (Not Done, In Progress, Done).
Erledigte Aufgaben bringen virtuelles Geld, während nicht erledigte oder ignorierte Aufgaben HP kosten.

Ziel der Anwendung ist es, Selbstdisziplin und Produktivität zu fördern, indem einfache Game-Mechaniken in den Programmier-Alltag integriert werden.

Das Konzept ist inspiriert von Habitica, wird jedoch eigenständig umgesetzt und speziell auf Programmier- und Entwickler-Habits ausgerichtet.

Durch die Kombination aus Aufgabenmanagement, Belohnungssystem und Konsequenzen wird Produktivität zu einer motivierenden und interaktiven Erfahrung.

## Tech Stack

Unsere Idee wird mit *React* umgesetzt. Wir sehen vor, Benutzer den Zugriff per Webseite zu erlauben. Spätrer, möchten wir sync anbieten und somit Benutzerdaten in der Cloud (Azure kommt als erste Kandidat) speichern. API wird möglicherweise mit eine Technologie benutzt, die wir kennen z.B. C#. Das hätte den Vorteil, das man es per VS hochladen kann. 

## Target audience
Unsere Nutzer sind Informatiker, die ihren Alltag mithilfe einer spielerischen ToDo App, welche an den Programmieralltag angepasst ist organisieren möchten.

# Arbeitspaketen

## Arbeitspakete 20.02 (Frontend)
- [ ] Ich erstelle ein Formular, um eine ToDo hinzufügen zu können
- [ ] Ich erstelle eine Funktion, um die ToDos in der DB zu speichern
- [ ] Ich lasse alle ToDos auf dem Frontend anzeigen

## Arbeitspakete 27.02 IvanKos19 (API)
- [X] Erstell funktion einfügen
- [X] Get funktion einfügen
- [ ] Funktionen testen/ verknüpfen

## Zusammenfassung
Am 27.02.2026 habe ich in der API die Create Funktion sowie die Get Funktion erfolgreich implementiert. Damit können neue Tasks erstellt und bestehende Tasks aus der Datenbank abgerufen werden. Die grundlegende Struktur der Endpoints funktioniert bereits, jedoch treten aktuell noch kleinere Fehler im Code auf, die ich beheben muss. Das Testen und vollständige Verknüpfen mit dem Frontend steht noch aus und wird in der nächsten Sitzung abgeschlossen. (Wörter: 71)

## Arbeitspakete 6.03 IvanKos19 (API)
- [ ] API mit der Datenbank verknüpfen (Dezentral)
- [ ] Fehler beheben in der API
- [ ] verknüpfung testen (Funktionen)
- [ ] verknüpfung testen (Tabellen)


## Sleepz103 (DB)
- [x] Ein Task hat:
name: required
description: optional
startdate: optional
duedate: optional
category: required(?)
difficulty: required(?) (je schwerer desto mehr geld / damage)
status: required (wie in kanban, not done, in progress, done)
timeDone: required (zählt wie viel mal etwas gemacht wurde)
- [x] DB befindet sich auf Azure
- [ ] DB reagiert korrekt auf Anfragen (GET. POST)

Zusammenfassung: Heute habe ich eine Ressource Gruppe, SQL Sever und SQL Datenbank namens placeholder in Azure erstellt. Danach habe ich mich mit SSMS verbunden und eine Tabelle für Tasks erstellt. 


## 06.03.2026
- [ ] Wenn ein GET Anfrage ankommt, sollen alle tasks kommen
- [ ] Wenn ein DELETE mit Id ankommt, soll dieser aus Datenbank geslöscht werden
- [ ] Wenn ein POST ankommt soll ein neues Todo erstellt werden
- [ ] Zusamenn bearbeiten wir das Prototyp auf Papier/Software herstellen