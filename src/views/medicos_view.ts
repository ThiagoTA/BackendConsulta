import Medico from '../models/Medico';

export default {
  render(medico: Medico) {
    return {
      id: medico.id,
      name: medico.name,
      especialidade: medico.especialidade,
    };
  },

  renderMany(medicos: Medico[]) {
    return medicos.map(medico => this.render(medico))
  }
}