export interface MovieListItem {
  mid: string;
  date: string;
  rated?: number;
  // length? нужен чтобы пропустили в --prod
  // Property 'length' does not exist on type 'MovieListItem'.
  // т.к. много где проверяется наличиего чего-нибудь в полученном массиве
  length?: number;
}
