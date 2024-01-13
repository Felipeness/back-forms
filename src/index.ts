import express from 'express';
import clienteRoutes from './routes/clienteRoutes';
import 'dotenv/config';


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/clientes', clienteRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
