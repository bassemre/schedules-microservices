import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersJobsTables1739545958933 implements MigrationInterface {
    name = 'UsersJobsTables1739545958933'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted" boolean NOT NULL DEFAULT false, "deleted_at" TIMESTAMP, "deleted_by" integer, "full_name" character varying NOT NULL, "email" character varying NOT NULL, "country_code" character varying NOT NULL, "phone" character varying NOT NULL, "password" text NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."jobs_status_enum" AS ENUM('pending', 'running', 'completed', 'failed')`);
        await queryRunner.query(`CREATE TABLE "jobs" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted" boolean NOT NULL DEFAULT false, "deleted_at" TIMESTAMP, "deleted_by" integer, "name" character varying NOT NULL, "status" "public"."jobs_status_enum" NOT NULL DEFAULT 'pending', "last_run" TIMESTAMP, "next_run" TIMESTAMP, "interval" character varying NOT NULL, "parameters" jsonb, "is_active" boolean NOT NULL DEFAULT true, "user_id" integer NOT NULL, CONSTRAINT "PK_cf0a6c42b72fcc7f7c237def345" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD CONSTRAINT "FK_9027c8f0ba75fbc1ac46647d043" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobs" DROP CONSTRAINT "FK_9027c8f0ba75fbc1ac46647d043"`);
        await queryRunner.query(`DROP TABLE "jobs"`);
        await queryRunner.query(`DROP TYPE "public"."jobs_status_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
