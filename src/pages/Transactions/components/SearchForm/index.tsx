import { MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";
import { SearchFormContainer } from "./styles";
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'

const searchFormSchema = z.object({
  query: z.string(),
});

type searchFormInput = z.infer<typeof searchFormSchema>;

export function SearchForm() {
  
  const { register, handleSubmit, reset, formState: {isSubmitting} } = useForm<searchFormInput>({
    resolver: zodResolver(searchFormSchema),
  });

  async function handleSearchTransactions(data: searchFormInput) {
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log(data)
    reset()
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input type="text" placeholder="Buscar por transações" {...register('query')} />

      <button type="submit" disabled={isSubmitting} ><MagnifyingGlass size={20} />Buscar</button>
    </SearchFormContainer>
  )
}