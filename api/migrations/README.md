# Golang Migrations

### Official Docs
https://github.com/golang-migrate/migrate/tree/master/cmd/migrate

### Basics Usage
Create Migrations:
```bash
migrate create -ext sql -dir migrations -seq <name>
```

Run Migrations:
```bash
migrate -source file://path/to/migrations -database <db_url> up
```

Rollback Migrations:
```bash
migrate -source file://path/to/migrations -database <db_url> down
```

Check Version:
```bash
migrate -version
```

