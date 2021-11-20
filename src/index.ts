import dotenv from 'dotenv';
import express from 'express';
import { AddressInfo } from 'net';
import { userRouter } from './routes/userRouter';
import { clientRouter } from './routes/clientRouter';
import { productRouter } from './routes/productRouter';
import { salesRouter } from './routes/salesRouter';

dotenv.config();

const app = express();

app.use(express.json());

app.use("/user", userRouter);

app.use("/client", clientRouter);

app.use("/product", productRouter);

app.use("/sales", salesRouter);

const { PORT = 3003} = process.env;

const server = app.listen(PORT, () => {
    if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Servidor rodando em http://localhost:${address.port}`);
    } else {
      console.error(`Falha ao rodar o servidor.`);
    }
  });


