import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string,
  value: number,
  type: 'income' | 'outcome',
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction {

    if(!["income", "outcome"].includes(type)){
      throw new Error('Não é uma transação valida');
    }

    const { total } = this.transactionsRepository.getBalance();

    if(type === 'outcome' && total < value){
      throw new Error('Não existe saldo suficiente para fazer a retirada');
    }
    
    
    const transaction = this.transactionsRepository.create({
      title, value, type
    });

    return transaction;
  }
}

export default CreateTransactionService;
