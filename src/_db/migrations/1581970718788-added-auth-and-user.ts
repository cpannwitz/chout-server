import { MigrationInterface, QueryRunner } from 'typeorm'

export class addedAuthAndUser1581970718788 implements MigrationInterface {
  name = 'addedAuthAndUser1581970718788'

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TYPE "users_provider_enum" AS ENUM('google')`, undefined)
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "email" text NOT NULL, "verified" boolean NOT NULL DEFAULT false, "provider" "users_provider_enum" NOT NULL, "providerId" text NOT NULL, "username" text NOT NULL, "image" text, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
      undefined
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "users"`, undefined)
    await queryRunner.query(`DROP TYPE "users_provider_enum"`, undefined)
  }
}
