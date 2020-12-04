import Agendamento from '../models/Agendamento';

export default {
  render(agendamento: Agendamento) {
    return {
      id: agendamento.id,
      data_consulta: agendamento.data_consulta,
      medico_id: agendamento.medico_id,
      paciente_id: agendamento.paciente_id,
      hora_consulta: agendamento.hora_consulta
    };
  },

  renderMany(agendamentos: Agendamento[]) {
    return agendamentos.map(agendamento => this.render(agendamento))
  }
}