import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import * as Yup from 'yup';

import Medico from '../models/Medico';
import medicos_view from '../views/medicos_view';

export default {

  async create(request: Request, response: Response) {

    const {
      name,
      especialidade
    } = request.body

    const medicoRepository = getRepository(Medico);

    const data = {
      name,
      especialidade
    }

    const schema = Yup.object().shape({
      name: Yup.string().required('Nome Obrigatório'),
      especialidade: Yup.string().required('Especialidade Obrigatório'),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const medico = medicoRepository.create(data);
  
    await medicoRepository.save(medico);
  
    return response.status(201).json(medico);
  },

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const medicoRepository = getRepository(Medico);

    await medicoRepository.delete(id)
    
    return response.json('Médico Excluído')
  },
  
  async index(request: Request, response: Response) {
    const medicoRepository = getRepository(Medico);

    const medico = await medicoRepository.find()
    
    return response.json(medicos_view.renderMany(medico));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const medicoRepository = getRepository(Medico);

    const medico = await medicoRepository.findOneOrFail(id)
    
    return response.json(medicos_view.render(medico));
  }
}