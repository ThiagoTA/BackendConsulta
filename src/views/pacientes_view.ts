import Paciente from '../models/Paciente';

export default {
  render(paciente: Paciente) {
    return {
      id: paciente.id,
      name: paciente.name,
      email: paciente.email,
      telefone: paciente.telefone,
      path: `http://localhost:3333/uploads/${paciente.path}`
    };
  },

  renderMany(pacientes: Paciente[]) {
    return pacientes.map(paciente => this.render(paciente))
  }
}