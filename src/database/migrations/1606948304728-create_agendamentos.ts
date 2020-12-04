import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createAgendamentos1606948304728 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "agendamento",
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
          name: 'data_consulta',
          type: 'varchar'
        },
        {
          name: 'medico_id',
          type: 'integer'
        },
        {
          name: 'paciente_id',
          type: 'integer'
        },
        {
          name: 'hora_consulta',
          type: 'varchar'
        },
      ],
      foreignKeys: [
        {
          name: 'Medico',
          columnNames: ['medico_id'],
          referencedTableName: 'medico',
          referencedColumnNames: ['id'],
        },
        {
          name: 'Paciente',
          columnNames: ['paciente_id'],
          referencedTableName: 'paciente',
          referencedColumnNames: ['id'],
        },
    ]
    }))
  }
  
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('agendamento')
  }

}
