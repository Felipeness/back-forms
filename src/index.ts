import express from 'express';
import clienteRoutes from './routes/clienteRoutes';
import swaggerUi from 'swagger-ui-express';
import 'dotenv/config';

import swaggerDocs from './swagger.json';

const app = express();
const port = process.env.PORT || 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(express.json());
app.use('/clientes', clienteRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
