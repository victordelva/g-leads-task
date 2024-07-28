import { PrismaClient } from '@prisma/client'
import express, { Request, Response } from 'express';
import {DeleteLeadUseCase} from "./contexts/leads/Application/DeleteLeadUseCase";
import {LeadRepositoryImpl} from "./contexts/leads/Infrastructure/Repositories/LeadRepositoryImpl";
import {UpdateLeadUseCase} from "./contexts/leads/Application/UpdateLeadUseCase";
import {GuessLeadGenderUseCase} from "./contexts/leads/Application/GuessLeadGenderUseCase";
import {GenderGuesserServiceImpl} from "./contexts/leads/Infrastructure/Services/GenderGuesserServiceImpl";
const prisma = new PrismaClient()
const app = express()
app.use(express.json())

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next()
})

app.post('/', async (req: Request, res: Response) => {
  res.json({ message: 'Hello World!' })
})

app.post('/leads', async (req: Request, res: Response) => {
  //get name and email from the request body
  const { name, email } = req.body
  const lead = await prisma.lead.create({
    data: {
      firstName: String(name),
      email: String(email),
    },
  })
  res.json(lead)
})

app.get('/leads/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const lead = await prisma.lead.findUnique({
    where: {
      id: Number(id),
    },
  })
  res.json(lead)
})

app.get('/leads', async (req: Request, res: Response) => {
  const leads = await prisma.lead.findMany()
  res.json(leads)
})

app.patch('/leads/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const { message, gender } = req.body;
  const updateLeadUseCase = new UpdateLeadUseCase(new LeadRepositoryImpl());
  const lead = await updateLeadUseCase.execute({
    id,
    message: message ?? undefined,
    gender: gender ?? undefined,
  });
  res.json(lead)
})

app.delete('/leads/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  // I would implement dependency injection
  const deleteLeadUseCase = new DeleteLeadUseCase(new LeadRepositoryImpl());
  await deleteLeadUseCase.execute(id);
  res.json()
});

app.put('/leads/:id/guess-gender', async (req: Request, res: Response) => {
  const {
    id,
  } = req.params;

  const guessGenderUseCase = new GuessLeadGenderUseCase(
    new LeadRepositoryImpl(),
    new GenderGuesserServiceImpl(),
    );

  const lead = await guessGenderUseCase.execute({id});

  res.json(lead);
});

app.listen(4000, () => {
  console.log('Express server is running on port 4000')
})
