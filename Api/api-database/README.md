## Create migrations for SQLite

```
dotnet ef migrations add InitialCreate --output-dir ..\ModelMigrations\SQLite --context "Model.SQLiteModelContext" --project "ModelMigrations\ModelMigrations.csproj" --startup-project "API\API.csproj"
```

### Update database

```
dotnet ef database update --context "Model.SQLiteModelContext" --project "ModelMigrations\ModelMigrations.csproj" --startup-project "API\API.csproj"
```

## Create migrations for SQL Server

```
dotnet ef migrations add InitialCreate --output-dir ..\ModelMigrations\SQLServer --context "Model.SQLServerModelContext" --project "ModelMigrations\ModelMigrations.csproj" --startup-project "API\API.csproj"
```

### Update database

```
dotnet ef database update --context "Model.SQLServerModelContext" --project "ModelMigrations\ModelMigrations.csproj" --startup-project "API\API.csproj"
```
