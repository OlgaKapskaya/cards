import { instance } from 'common'

export const cardsAPI = {
  getCards(payload: GetCardsPayloadType) {
    return instance.get<GetCardsResponseType>('cards/card', { params: payload })
  },
  createCard(payload: CreateCardPayloadType) {
    return instance.post<CreateCardResponseType>('cards/card', payload)
  },
  deleteCard(payload: DeleteCardType) {
    return instance.delete<DeleteCardResponseType>('cards/card', { params: payload })
  },
  updateCard(payload: UpdateCardPayloadType) {
    return instance.put<UpdateCardResponseType>('cards/card', payload)
  },
}

export type GetCardsPayloadType = {
  cardsPack_id: string
  cardAnswer?: string
  cardQuestion?: string
  min?: number
  max?: number
  sortCards?: string
  grade?: number
  page?: number
  pageCount?: number
}
export type GetCardsResponseType = {
  cards: CardType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
  packName: string
  packDeckCover: string
}
export type CardType = {
  _id: string
  cardsPack_id: string
  user_id: string
  answer: string
  answerImg: string
  question: string
  questionImg: string
  grade: number
  shots: number
  comments: string
  type: string
  rating: number
  more_id: string
  created: string
  updated: string
  __v: number
}
export type CreateCardPayloadType = {
  card: CreateCardType
}
export type CreateCardType = {
  cardsPack_id: string
  answer?: string
  question?: string
  grade?: number
  shots?: number
  answerImg?: string
  questionImg?: string
  questionVideo?: string
  answerVideo?: string
}
export type CreateCardResponseType = {
  newCard: CardType
  token: string
  tokenDeathTime: number
}
export type DeleteCardType = {
  id: string
}
export type DeleteCardResponseType = {
  deletedCard: CardType
  token: string
  tokenDeathTime: number
}
export type UpdateCardPayloadType = {
  card: {
    _id: string
    cardsPack_id?: string
    user_id?: string
    answer?: string
    question?: string
    answerImg?: string
    questionImg?: string
  }
}
export type UpdateCardResponseType = {
  updatedCard: UpdateCardResponseTypeUpdatedCard
  token: string
  tokenDeathTime: number
}
export type UpdateCardResponseTypeUpdatedCard = {
  _id: string
  // cardsPack_id: string
  // user_id: string
  answer: string
  question: string
  answerImg: string
  questionImg: string
  // grade: number
  // shots: number
  // comments: string
  // type: string
  // rating: number
  // more_id: string
  // created: string
  // updated: string
  // __v: number
}
