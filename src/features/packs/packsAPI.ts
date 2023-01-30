import { instance } from 'common'

export const packsAPI = {
  getPacks(payload: GetPacksPayloadType) {
    return instance.get<GetPacksResponseType>('cards/pack', { params: payload })
  },
  createPack(payload: CreatePackPayloadType) {
    return instance.post<CreatePackResponseType>('cards/pack', payload)
  },
  deletePack(payload: DeletePackPayloadType) {
    return instance.delete<DeletePackResponseType>('cards/pack', { params: payload })
  },
  updatePack(payload: UpdatePackPayloadType) {
    return instance.put<UpdatePackResponseType>('cards/pack', payload)
  },
}

export type GetPacksPayloadType = {
  packName?: string
  min?: number
  max?: number
  sortPacks?: string
  page?: number
  pageCount?: number
  user_id?: string // чьи колоды,если не передан то придут все
  block?: boolean
}

export type GetPacksResponseType = {
  cardPacks: PackType[]
  cardPacksTotalCount: number // количество колод
  maxCardsCount: number
  minCardsCount: number
  page: number // выбранная страница
  pageCount: number // количество элементов на странице
}

export type PackType = {
  user_name: string
  _id: string
  user_id: string
  name: string
  cardsCount: number
  created: string
  updated: string
  private: boolean
  deckCover: string
}

export type CreatePackPayloadType = {
  cardsPack: {
    name?: string
    deckCover?: string
    private?: boolean
  }
}

export type CreatePackResponseType = {
  newCardsPack: {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
  }
}

export type DeletePackPayloadType = {
  id: string
}

export type DeletePackResponseType = {
  deletedCardsPack: {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
  }
}

export type UpdatePackPayloadType = {
  cardsPack: {
    _id: string
    cardsCount?: number
    created?: string
    grade?: number
    more_id?: string
    name?: string
    path?: string
    private?: boolean
    rating?: number
    shots?: number
    type?: string
    updated?: string
    user_id?: string
    user_name?: string
    __v?: number
    deckCover?: string
  }
}

type UpdatePackResponseType = {
  updatedCardsPack: {
    cardsCount: number
    created: string
    deckCover: string | null
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
  }
}
