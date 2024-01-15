import * as ClienteModel from "../models/clienteModel";

interface Cliente {
  id: number;
  coordenadas_x: number;
  coordenadas_y: number;
}

const addClient = async (client: { nome: string; email: string; telefone: string; }) => {
  // adicionar logo abaixo a chamada da função do model
  const clientCreated = await ClienteModel.addCliente(client);
  return clientCreated;
};

const getAllClients = async () => {
  const clients = await ClienteModel.getAllClientes();
  return clients;
};

const getClientById = async (id: number) => {
  const client = await ClienteModel.getClientePorId(id);
  return client;
};

const updateClient = async (id: number, client: { nome?: string | undefined; email?: string | undefined; telefone?: string | undefined; }) => {
  // Adicionar logica de validação ou transformação...
  const clientUpdated = await ClienteModel.updateCliente(id, client);
  return clientUpdated;
};

const deleteClient = async (id: number) => {
  const clientDeleted = await ClienteModel.deleteCliente(id);
  return clientDeleted;
};

const calculateDistance = (client1: Cliente, client2: Cliente): number => {
  return Math.sqrt(Math.pow(client1.coordenadas_x - client2.coordenadas_x, 2) + Math.pow(client1.coordenadas_y - client2.coordenadas_y, 2));
};

const findNearestClient = (pontoAtual: Cliente, pontos: Cliente[]): Cliente => {
  let moreNearClient = pontos[0];
  let lessDistance = Infinity;

  for (const ponto of pontos) {
    const distance = calculateDistance(pontoAtual, ponto);
    if (distance < lessDistance) {
      lessDistance = distance;
      moreNearClient = ponto;
    }
  }

  return moreNearClient;
};

const resolveTSP = (clientes: Cliente[]): Cliente[] => {
  let route: Cliente[] = [];
  let pontoAtual: Cliente = { id: -1, coordenadas_x: 0, coordenadas_y: 0 }; // ponto de partida da empresa..
  let pointsRemaining = [...clientes];

  while (pointsRemaining.length > 0) {
    const nearestClient = findNearestClient(pontoAtual, pointsRemaining);
    route.push(nearestClient);
    pointsRemaining = pointsRemaining.filter((ponto) => ponto.id !== nearestClient.id);
    pontoAtual = nearestClient;
  }

  //Opção de retonar ao ponto de partida
  route.push({ id: -1, coordenadas_x: 0, coordenadas_y: 0 }); // ponto de partida da empresa..

  return route;
};

const calculateRouteOptimization = async () => {
  const clients = await ClienteModel.getAllClientesCoordinates();
  const routeOptimization = resolveTSP(clients);
  return routeOptimization;
};

export { addClient, getAllClients, getClientById, updateClient, deleteClient, calculateRouteOptimization };
