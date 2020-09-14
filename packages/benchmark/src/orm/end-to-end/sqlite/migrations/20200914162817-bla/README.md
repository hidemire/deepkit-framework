# Migration `20200914162817-bla`

This migration has been generated by Marc J. Schmidt at 9/14/2020, 6:28:17 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "Model" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "ready" BOOLEAN NOT NULL,
    "tags" TEXT NOT NULL,
    "priority" INTEGER NOT NULL
)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200914162817-bla
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,15 @@
+datasource db {
+  provider = "sqlite"
+  url = "***"
+}
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Model {
+  id    Int     @id @default(autoincrement())
+  username String
+  ready Boolean
+  tags  String
+  priority Int
+}
```

