import { MigrationInterface, QueryRunner } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class createUser1599816419085 implements MigrationInterface {
    name = 'createUser1599816419085';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "address" varchar NOT NULL, "isActive" boolean NOT NULL)`,
            undefined
        );
        await queryRunner.query(
            `INSERT INTO "user" ("firstName", "lastName", "address", "isActive") VALUES
                ("Brijal", "Savaliya", "India", true), ("Kevin", "Shah", "India", true), ("Raj", "Patel", "India", true)`,
            undefined
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`, undefined);
    }
}
