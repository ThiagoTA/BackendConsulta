import { Request, Response } from 'express';
import { getConnection, getRepository } from 'typeorm';

import * as Yup from 'yup';

import Agendamento from '../models/Agendamento';
import Medico from '../models/Medico';
import Paciente from '../models/Paciente';

import agendamentos_view from '../views/agendamentos_view';
import medicos_view from '../views/medicos_view';
import pacientes_view from '../views/pacientes_view'


export default {

  async create(request: Request, response: Response) {

    const {
      data_consulta,
      medico_id,
      paciente_id,
      hora_consulta
    } = request.body

    const agendamentoRepository = getRepository(Agendamento);

    const data = {
      data_consulta,
      medico_id,
      paciente_id,
      hora_consulta
    }

    const schema = Yup.object().shape({
      data_consulta: Yup.string().required('Data da Consulta Obrigatório'),
      medico_id: Yup.string().required('Médico Obrigatório'),
      paciente_id: Yup.string().required('Paciente Obrigatório'),
      hora_consulta: Yup.string().required('Hora da Consulta Obrigatório'),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const agendamento = agendamentoRepository.create(data);
  
    await agendamentoRepository.save(agendamento);
  
    return response.status(201).json(agendamento);
  },

  async delete(request: Request, response: Response) {
     const { id } = request.params;

     const agendamentoRepository = getRepository(Agendamento);

     await agendamentoRepository.delete(id)
    
     return response.json('Agendamento Excluído')
   },

   async update(request: Request, response: Response){

    const { id } = request.params;
 
    const agendamentoRepository = getRepository(Agendamento);
 
    const {
      data_consulta,
      medico_id,
      paciente_id,
      hora_consulta
    } = request.body
     
    let data = {
      data_consulta,
      medico_id,
      paciente_id,
      hora_consulta
    }
 
   let procura = await agendamentoRepository.findOneOrFail(id)
   
     if(data.data_consulta == undefined){
       data.data_consulta = procura.data_consulta
     }
     if(data.medico_id == undefined) {
       data.medico_id = procura.medico_id
     }
     if(data.paciente_id == undefined) {
       data.paciente_id = procura.paciente_id
     }
     if(data.hora_consulta == undefined) {
       data.hora_consulta = procura.hora_consulta
     }
      
     await getConnection() 
     .createQueryBuilder()
     .update(Agendamento)
     .set({ 
        data_consulta: data.data_consulta,
        medico_id: data.medico_id,
        paciente_id: data.paciente_id,
        hora_consulta: data.hora_consulta
     })
     .where(`id = ${id}`)
     .execute();  
     
    const agendamentoUpdate = await agendamentoRepository.findOneOrFail(id);
    return response.json(agendamentos_view.render(agendamentoUpdate)); 
  },  
  
  async index(request: Request, response: Response) {

    const agendamentoRepository = getRepository(Agendamento);
    const AgendamentoCatch = agendamentos_view.renderMany(await agendamentoRepository.find({
     select: ['id', 'hora_consulta', 'medico_id', 'paciente_id', 'data_consulta']
 }))
 
   const pacientesRepository = getRepository(Paciente);
   const medicoRepository = getRepository(Medico);
 
   let resultado: Array<object> = []
 
   for(let i in AgendamentoCatch){
     let medico = medicos_view.render(await medicoRepository.findOneOrFail(AgendamentoCatch[i].medico_id))
     let paciente = pacientes_view.render(await pacientesRepository.findOneOrFail(AgendamentoCatch[i].paciente_id))
 
     resultado[i] = {
       id_consulta: AgendamentoCatch[i].id,
       paciente: paciente.name,
       telefone_pacientes: paciente.telefone,
       path: paciente.path,
       medico: medico.name,
       especialidade: medico.especialidade,
       data_consulta: AgendamentoCatch[i].data_consulta,
       hora_consulta: AgendamentoCatch[i].hora_consulta
     } 
   }
      
    return response.json(resultado)
  
  },

  async show(request: Request, response: Response) {
  
    const agendamentoRepository = getRepository(Agendamento);
    const id  = request.params;
    const AgendamentoCatch = agendamentos_view.renderMany(await agendamentoRepository.find(id));
 
   const pacientesRepository = getRepository(Paciente);
   const medicoRepository = getRepository(Medico);
 
   let resultado: Array<object> = []
 
   for(let i in AgendamentoCatch){
     let medico = medicos_view.render(await medicoRepository.findOneOrFail(AgendamentoCatch[i].medico_id))
     let paciente = pacientes_view.render(await pacientesRepository.findOneOrFail(AgendamentoCatch[i].paciente_id))
 
     resultado[i] = {
       id_consulta: AgendamentoCatch[i].id,
       paciente: paciente.name,
       telefone_pacientes: paciente.telefone,
       path: paciente.path,
       medico: medico.name,
       especialidade: medico.especialidade,
       data_consulta: AgendamentoCatch[i].data_consulta,
       hora_consulta: AgendamentoCatch[i].hora_consulta
     } 
   }
      
    return response.json(resultado)
  }
}