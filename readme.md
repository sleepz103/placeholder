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

# Arbeitspaketen

## Arbeitspakete 27.02 Ivan (API)
- [ ] Erstell funktion einfügen
- [ ] Get funktion einfügen
- [ ] Funktionen testen/ verknüpfen

## Sleepz103 (DB)
- [ ] Ein Task hat:
name: required
description: optional
startdate: optional
duedate: optional
category: required(?)
difficulty: required(?) (je schwerer desto mehr geld / damage)
status: required (wie in kanban, not done, in progress, done)
timeDone: required (zählt wie viel mal etwas gemacht wurde)
- [ ] DB befindet sich auf Azure
- [ ] DB reagiert korrekt auf Anfragen (GET. POST)
