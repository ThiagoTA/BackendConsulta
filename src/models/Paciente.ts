import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToMany} from 'typeorm';
import Agendamento from './Agendamento';

@Entity('paciente')
export default class Paciente {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  telefone: number;

  @Column()
  path: string;
  
}