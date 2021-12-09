# Übersicht der Node-basierten Prozesse der lokalen Entwicklungsumgebung

## Inhaltsverzeichnis
1. [Microfrontends](#microfrontends)
2. [Installation](#mfe-installation)
3. [Microservices](#microservices)

### Microfrontends

#### Ports

localhost:8080 -> shell-angular

localhost:8081 -> remote-recommendation-angular

localhost:8082 -> /

localhost:8083 -> remote-searchbar-react

localhost:8084 -> remote-pdp-angular

#### Installation via Terminal

Shortcut: Führe "npm run init-mfe" innerhalb Microfrontends-Verzeichnisses aus

Ansonsten: Führe "npm i" innerhalb des entsprechenden Verzeichnisses aus

#### Start via Terminal
(erfordert Installation)

Shortcut: Führe "npm run start-mfe" innerhalb Microfrontends-Verzeichnisses aus

Ansonsten:

- Bei Projekten mit einem "angular"-Suffix: Führe "ng s" innerhalb des entsprechenden Verzeichnisses aus

- Bei Projekten mit einem "react"-Suffix: Führe "npm run start" innerhalb des entsprechenden Verzeichnisses aus

### Microservices

#### Ports

localhost:8085

localhost:8086

localhost:8087

localhost:8088