import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from 'typeorm';
import Medico from './Medico';
import Paciente from './Paciente';

@Entity('agendamento')
export default class Agendamento {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  data_consulta: string;

  @Column()
  medico_id: string;

  @ManyToOne (() => Medico)
  @JoinColumn({ name: 'medico_id' })
  medico: Medico;

  @Column()
  paciente_id: string;

  @ManyToOne (() => Paciente)
  @JoinColumn({ name: 'paciente_id' })
  paciente: Paciente;

  @Column()
  hora_consulta: string;
}