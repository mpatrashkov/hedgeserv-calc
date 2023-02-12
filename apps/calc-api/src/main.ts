import { Expr } from '@hedgeserv-calc/calc-types';
import express, { Request } from 'express';
import { calculateExpression } from './app/calculate-expression';
import cors from 'cors';
import bodyParser from 'body-parser';

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/calc', (req: Request<unknown, unknown, Expr>, res) => {
  const expr = req.body;

  res.send({ result: calculateExpression(expr) });
});

app.listen(port, () => {
  console.log(`[ ready ] http://localhost:${port}`);
});
