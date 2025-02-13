import { useQuery } from '@tanstack/react-query';
import { bankAccontService } from '../services/bankAccountsService';

export function useBankAccount() {
    const {data, isFetching} = useQuery({
        queryKey: ['bankAccounts'],
        queryFn: bankAccontService.getAll,
        staleTime: Infinity
    })

    return {accounts: data ?? [], isFetching}

}
