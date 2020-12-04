import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToMany} from 'typeorm';
import Agendamento from './Agendamento';

@Entity('medico')
export default class Medico {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  especialidade: string;

}