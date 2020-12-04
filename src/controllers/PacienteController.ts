import { Request, Response } from 'express';
import { getConnection, getRepository } from 'typeorm';

import * as Yup from 'yup';

import Paciente from '../models/Paciente';
import pacientes_view from '../views/pacientes_view';

export default {

  async create(request: Request, response: Response) {

    const {
      name,
      email,
      telefone
    } = request.body

    const pacienteRepository = getRepository(Paciente);

    const requestFotos = request.files as Express.Multer.File[];

    const path1 = requestFotos.map(path => {
      return path.filename
    });

    const path = path1[0]

    const data = {
      name,
      email,
      telefone,
      path
    }

    const schema = Yup.object().shape({
      name: Yup.string().required('Nome Obrigatório'),
      email: Yup.string().required('Email Obrigatório').email(),
      telefone: Yup.string().required('Telefone Obrigatório').max(11, 'Máximo 11').min(10, 'Mínimo 10'),
      path: Yup.string().required('Foto Obrigatória')
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const paciente = pacienteRepository.create(data);
  
    await pacienteRepository.save(paciente);
  
    return response.status(201).json(paciente);
  },

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const pacienteRepository = getRepository(Paciente);

    await pacienteRepository.delete(id)
    
    return response.json('Paciente Excluído')
  },
  
  async index(request: Request, response: Response) {
    const pacienteRepository = getRepository(Paciente);

    const paciente = await pacienteRepository.find()
    
    return response.json(pacientes_view.renderMany(paciente));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const pacienteRepository = getRepository(Paciente);

    const paciente = await pacienteRepository.findOneOrFail(id)
    
    return response.json(pacientes_view.render(paciente));
  },

  async update(request: Request, response: Response){

   const { id } = request.params;

   const pacienteRepository = getRepository(Paciente);

   const {
    name,
    email,
    telefone,
   } = request.body
   
   const requestFotos = request.files as Express.Multer.File[];

   const path1 = requestFotos.map(path => {
     return path.filename
   });

   const path = path1[0]

   let data = {
    name,
    email,
    telefone,
    path
   }

  let procura = await pacienteRepository.findOneOrFail(id)
  
    if(data.name == undefined){
      data.name = procura.name
    }
    if(data.email == undefined) {
      data.email = procura.email
    }
    if(data.telefone == undefined) {
      data.telefone = procura.telefone
    }
    if(data.email == undefined) {
      data.email = procura.email
    }
    if(data.path == undefined) {
      data.path = procura.path
    }

    await getConnection() 
    .createQueryBuilder()
    .update(Paciente)
    .set({ 
      name: data.name,
      email: data.email,
      telefone: data.telefone,
      path: data.path
    })
    .where(`id = ${id}`)
    .execute();  
    
   const pacientesUpdate = await pacienteRepository.findOneOrFail(id);
   return response.json(pacientes_view.render(pacientesUpdate)); 
 },  

}