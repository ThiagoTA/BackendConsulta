import { Router } from 'express';
import multer from 'multer';

import uploadconfig from '../config/upload';

import MedicosController from '../controllers/MedicoController';
import PacientesController from '../controllers/PacienteController';
import AgendamentosController from '../controllers/AgendamentoController';

const routes = Router();
const upload = multer(uploadconfig)

//Criar Médico
routes.post('/medicos', MedicosController.create);
//Listar Um
routes.get('/medicos/:id', MedicosController.show);
//Listar Todos
routes.get('/medicos', MedicosController.index);
//Excluir Médico
routes.delete('/medicos/:id', MedicosController.delete);

//Criar Paciente
routes.post('/pacientes', upload.array('path') ,PacientesController.create);
//Listar Um
routes.get('/pacientes/:id', upload.array('path') ,PacientesController.show);
//Listar Todos
routes.get('/pacientes', upload.array('path') ,PacientesController.index);
//Alterar
routes.put('/pacientes/:id', upload.array('path') ,PacientesController.update);
//Excluir Paciente
routes.delete('/pacientes/:id', PacientesController.delete);

//Criar Agendamento
routes.post('/agendamentos',AgendamentosController.create);
//Listar Um
routes.get('/agendamentos/:id', upload.array('path') ,AgendamentosController.show);
//Listar Todos
routes.get('/agendamentos', upload.array('path') ,AgendamentosController.index);
//Alterar
routes.put('/agendamentos/:id' ,AgendamentosController.update);
//Excluir Agendamento
routes.delete('/agendamentos/:id' ,AgendamentosController.delete);



export default routes;