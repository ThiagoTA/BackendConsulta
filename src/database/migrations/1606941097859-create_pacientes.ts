import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createPacientes1606941097859 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "paciente",
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'name',
          type: 'varchar'
        },
        {
          name: 'email',
          type: 'varchar'
        },
        {
          name: 'telefone',
          type: 'number'
        },
        {
          name: 'path',
          type: 'varchar'
        },
      ],
    }))
  }
    
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('paciente')
  }
    
}

