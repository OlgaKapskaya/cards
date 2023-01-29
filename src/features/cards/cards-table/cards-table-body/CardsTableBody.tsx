import React from 'react'

import TableBody from '@mui/material/TableBody'

import { CardsTableRow } from './cards-table-row/CardsTableRow'

import {
  appStatusSelector,
  cardsSelector,
  DeleteForm,
  ModalComponent,
  useAppDispatch,
  useAppSelector,
  useModalComponent,
  userCardsPackIdSelector,
  userIDSelector,
} from 'common'
import { EditCardForm } from 'features/cards/cards-forms/EditCardForm'
import { deleteCard } from 'features/cards/cardsSlice'

export const CardsTableBody = () => {
  const cards = useAppSelector(cardsSelector)
  const userId = useAppSelector(userCardsPackIdSelector)
  const profileId = useAppSelector(userIDSelector)
  const dispatch = useAppDispatch()
  const isMy = userId === profileId
  const loadingStatus = useAppSelector(appStatusSelector)
  const disabled = loadingStatus === 'loading'

  const { open, modalTitle, modalChildren, closeModal, createModal } = useModalComponent()

  const handleUpdateCard = (id: string, question: string, answer: string) => {
    createModal(
      'Edit card',
      <EditCardForm id={id} question={question} answer={answer} closeModal={closeModal} />
    )
  }
  const handleDeleteCard = (id: string, name: string) => {
    const closeDeleteModal = () => {
      dispatch(deleteCard({ id }))
        .then(() => {
          closeModal()
        })
        .catch(() => {})
    }

    createModal(
      'Delete card',
      <DeleteForm name={name} disabled={disabled} closeModal={closeDeleteModal} />
    )
  }

  return (
    <>
      <TableBody>
        {cards.map(row => {
          return (
            <CardsTableRow
              key={row._id}
              card={row}
              handleUpdateCard={handleUpdateCard}
              handleDeleteCard={handleDeleteCard}
              disabled={disabled}
              isMy={isMy}
              loadingStatus={loadingStatus}
            />
          )
        })}
      </TableBody>
      <ModalComponent title={modalTitle} open={open} handleClose={closeModal}>
        {modalChildren}
      </ModalComponent>
    </>
  )
}
