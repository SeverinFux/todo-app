# Testkonzept für TODO-App

## Überblick
Dieses Dokument beschreibt die Teststrategie für die TODO-App, einschließlich automatisierter und manueller Testansätze, um die Qualität und Zuverlässigkeit der Anwendung sicherzustellen.

## Automatisierte Tests

### Unit-Tests
Unit-Tests werden mit Jest geschrieben, um die Funktionalität einzelner Komponenten und Utility-Funktionen zu überprüfen.

- **Ort:** `Util.test.ts`
- **Umfang:**
    - `sortByString`: Testet das alphabetische Sortieren von Strings.
    - `sortByNumber`: Testet das Sortieren von Zahlen in aufsteigender Reihenfolge, inklusive der Behandlung negativer und identischer Zahlen.
    - `sortByDate`: Testet das Sortieren von Daten in aufsteigender Reihenfolge, inklusive der Behandlung identischer Daten und verschiedener Zeiten.

### End-to-End-Tests
End-to-End-Tests werden mit Cypress geschrieben, um Benutzerinteraktionen zu simulieren und das Verhalten der Anwendung aus der Perspektive der Benutzer zu überprüfen.

- **Ort:** `cypress/e2e/todo.cy.ts`
- **Umfang:**
    - Darstellung des TODO-App-Headers.
    - Hinzufügen eines neuen TODO-Items.
    - Markieren eines TODO-Items als abgeschlossen.
    - Sortieren von TODOs nach Prioritäten, Kategorien und Daten.
    - Bearbeiten von TODO-Items zur Erstellung benutzerdefinierter Kategorien.

### Linting
ESLint wird verwendet, um die Codequalität und die Einhaltung von Coding-Standards sicherzustellen.

- **Ort:** `.github/workflows/deploy.yml`
- **Umfang:**
    - Ausführen von ESLint zur Überprüfung von Stil- und Syntaxfehlern.

## Manuelle Integrationstests
Manuelle Integrationstests werden durchgeführt, um die Integration der verschiedenen Komponenten und die Gesamtfunktionalität der Anwendung zu überprüfen.

### Testszenarien
1. **Benutzerauthentifizierung:**
    - Überprüfen, ob sich Benutzer erfolgreich registrieren, einloggen und ausloggen können.
    - Sicherstellen, dass Benutzersitzungen korrekt aufrechterhalten werden.

2. **Verwaltung von TODO-Items:**
    - Überprüfen, ob Benutzer TODO-Items hinzufügen, bearbeiten und löschen können.
    - Sicherstellen, dass TODO-Items korrekt in der Liste angezeigt werden.

3. **Sortieren und Filtern:**
    - Überprüfen, ob TODO-Items nach Priorität, Kategorie und Datum sortiert werden können.
    - Sicherstellen, dass Filteroptionen wie erwartet funktionieren.

4. **Benachrichtigungen:**
    - Überprüfen, ob Benutzer Benachrichtigungen für bevorstehende und überfällige Aufgaben erhalten.

5. **Responsives Design:**
    - Sicherstellen, dass die Anwendung responsiv ist und auf verschiedenen Geräten und Bildschirmgrößen gut funktioniert.

## Fazit
Dieses Testkonzept gewährleistet eine umfassende Abdeckung der TODO-App durch eine Kombination aus automatisierten Unit- und End-to-End-Tests sowie manuellen Integrationstests. Dieser Ansatz hilft, Probleme frühzeitig zu identifizieren und zu beheben, und sorgt für eine qualitativ hochwertige und zuverlässige Anwendung.

