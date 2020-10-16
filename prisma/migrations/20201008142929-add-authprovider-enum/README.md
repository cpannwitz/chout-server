# Migration `20201008142929-add-authprovider-enum`

This migration has been generated by chris at 10/8/2020, 4:29:29 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "public"."AuthProvider" AS ENUM ('GOOGLE', 'FACEBOOK', 'TWITTER', 'GITHUB')

ALTER TABLE "public"."User" DROP COLUMN "provider",
ADD COLUMN "provider" "AuthProvider"  
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201007120326-extended-user..20201008142929-add-authprovider-enum
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -21,15 +21,22 @@
   MODERATOR
   ADMIN
 }
+enum AuthProvider {
+  GOOGLE
+  FACEBOOK
+  TWITTER
+  GITHUB
+}
+
 model User {
   id                String        @default(uuid()) @id
   createdAt         DateTime      @default(now())
   updatedAt         DateTime      @updatedAt
   verified          Boolean       @default(false)
   lastSignInTime    DateTime      @default(now())
-  provider          String?
+  provider          AuthProvider?
   role              Role          @default(USER)
   email             String        @unique
   username          String        @unique
   image             String?
```

