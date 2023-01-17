import { CardType } from '../../features/cards/cardsAPI'

export const uniqueObjectsFromAnArray = (array1: CardType[], array2: CardType[]) => {
  const all = [...array1, ...array2]
  const unique = [] as CardType[]

  for (let i = 0; i < all.length; i++) {
    if (unique.findIndex(el => el._id === all[i]._id) === -1) {
      unique.push(all[i])
    }
  }

  return unique
}
