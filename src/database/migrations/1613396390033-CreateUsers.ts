import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateUsers1613396390033 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
			new Table({
				name: 'users', 
				columns: [
					{
						name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
					},
					{
						name: 'name',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'email',
						type: 'varchar',
						isUnique: true,
					},
					{
						name: 'password',
						type: 'varchar',
					},
					{
						name: 'cpf',
						type: 'int',
					},
					{
						name: 'deliveryman',
						type: 'boolean',
					},
					{
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
				]
			})
		);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }
}


