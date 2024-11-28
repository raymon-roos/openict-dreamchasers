---
lang: nl
---

## Entity Relation Diagram

In dit diagram is het databasa schema ontwerp uitgebeeld. Een belangrijk doel van het
ontwerp is om complete persoonsgegevens op te slaan voor administratieve doeleinden en om
te voldoen aan de wet. Daarnaast moet het mogelijk zijn voor de beheerders van de
applicatie - Boer Bert zelf, of administratieve medewerkers - om operationele parameters
aan te passen. Bijvoorbeeld het aanbod van (soorten) accommodaties en de bijbehorende
(soorten) prijzen. Dit alles met zo min mogelijk duplicatie door middel van normalisatie
om data inconsistentie te voorkomen. Ook moeten historische gegevens intact blijven onder
bijvoorbeeld prijswijzigingen.

## Kwaliteitscriteria

-   Er is voldaan aan ten minste de vierde normaalvorm [^norm].
-   Alle namen zijn in het Engels, in kleine letters geschreven en met underscores om
    woorden van elkaar te scheiden (e.g. snake_case).
-   Tabel namen zijn altijd in meervoud.
-   Foreign key kolommen hebben altijd een naam in
    de vorm van _\<gerelateerde-naam-in-enkelvoud\>\_id_.

[^norm]: https://en.wikipedia.org/wiki/Database_normalization

```mermaid
erDiagram

accomodations {
    unsigned_bigint id PK
    unsigned_bigint accomodation_type_id FK
    unsigned_tinyint accomodation_number
    point coordinate
    date created_at
}

accomodation_types {
    unsigned_bigint id PK
    string type
    int max_guests
    float price
    date created_at
}

guests {
    unsigned_bigint id PK
    string first_name
    string middle_name
    string last_name
    date date_of_birth
    string email UK
    string phone_number
    unsigned_bigint address FK
    date created_at
}

addresses {
    unsigned_bigint id PK
    unsigned_bigint country_id FK
    string postcode
    string city
    string street
    int number
    string suffix
}

countries {
    varchar(3) iso_code PK
    string name UK
}

reservations {
    unsigned_bigint id PK
    unsigned_bigint guest_id FK
    unsigned_bigint payment_id FK
    unsigned_bigint accomodation_id FK
    date checkin
    date checkout
    date created_at
}

payments {
    unsigned_bigint id PK
    unsigned_bigint method_id FK
    unsigned_bigint status_id FK
    float total_price
    date created_at
    date completed_at
}

line_items {
    unsigned_bigint id PK
    unsigned_bigint payment_id FK
    unsigned_bigint category_id FK
    int quantity
    date created_at
}

payment_methods {
    unsigned_bigint id PK
    string name UK
}

payment_statuses {
    unsigned_bigint id PK
    string status
}

price_categories {
    unsigned_bigint id PK
    string category_name
    float price
}

admins {
    unsigned_bigint id PK
    string username UK
    string email UK
    hash password
}

guests ||--|{ reservations : "books one or more times"
guests ||--|| addresses : "lives at"
addresses O|--|| countries : "located in"

reservations ||--|| payments : "must have one"
reservations O|--|| accomodations : "must have one"
accomodations O|--|| accomodation_types : "is one of"

payments ||--|{ line_items : "made up of multiple"
line_items O|--|| price_categories : "has one"
payments O|--|| payment_methods : "payed using"
payments O|--|| payment_statuses : "has state of"

```

## Gevolgen voor stakeholders

Gezien de database het hart van de applicatie is, is het ontwerp daarvan bepalend voor
welke features de applicatie kan ondersteunen. Dit ontwerp is dus van belang voor de
product owner en diens communicatie naar de klant. Alle gegevens die worden opgeslagen
moeten ook ergens vandaan komen, namelijk uit de web frontend. Onze UX/UI designers en
frontend developers moeten dus op de hoogte zijn van welke gegevens er ingevoerd moeten
worden tijdens het reserveren. Dit brengt voor de frontend ontwikkelaar ook extra
complexiteit mee, omdat deze gegevens in real-time gevalideerd moeten worden voor een
goede gebruikerservaring. Persoonsgegevens zoals e-mailadressen en internationale
telefoonnummers en woonadressen/postcodes kunnen lastig zijn om te valideren.
