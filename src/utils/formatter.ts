export const dateFormatter = new Intl.DateTimeFormat('pt-BR');

export const priceFormatter = new Intl.NumberFormat('pr-BT', {
  style: 'currency',
  currency: 'BRL',
})