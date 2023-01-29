import React from 'react'

import Rating from '@mui/material/Rating'
import Skeleton from '@mui/material/Skeleton'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { EditCardForm } from '../../cards-forms/EditCardForm'
import { deleteCard } from '../../cardsSlice'

import s from './CardsTableBody.module.css'

import deleteIcon from 'assets/img/delete.svg'
import editIcon from 'assets/img/edit.svg'
import {
  ActionButton,
  appStatusSelector,
  cardsSelector,
  useAppDispatch,
  useAppSelector,
  userCardsPackIdSelector,
  userIDSelector,
  DeleteForm,
  ModalComponent,
  useModalComponent,
} from 'common'

export const CardsTableBody = () => {
  const cards = useAppSelector(cardsSelector)
  const loadingStatus = useAppSelector(appStatusSelector)
  const userId = useAppSelector(userCardsPackIdSelector)
  const profileId = useAppSelector(userIDSelector)
  const dispatch = useAppDispatch()
  const isMy = userId === profileId
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
      dispatch(deleteCard({ id })).then(() => {
        closeModal()
      })
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
          const question =
            row.questionImg && row.questionImg !== 'noImg' ? (
              <img alt={'img'} src={row.questionImg} />
            ) : (
              row.question
            )
          const answer =
            row.answerImg && row.answerImg !== 'noImg' ? (
              <img alt={'img'} src={row.answerImg} />
            ) : (
              row.answer
            )

          return (
            <TableRow key={row._id} className={s.tableRow}>
              <TableCell className={s.cellQuestion}>
                {loadingStatus === 'loading' ? <Skeleton /> : question}
              </TableCell>
              <TableCell className={s.cellAnswer}>
                {loadingStatus === 'loading' ? <Skeleton /> : answer}
              </TableCell>
              <TableCell className={s.cell}>
                {loadingStatus === 'loading' ? <Skeleton /> : row.updated}
              </TableCell>
              <TableCell className={s.cell}>
                {loadingStatus === 'loading' ? (
                  <Skeleton />
                ) : (
                  <Rating name="simple-controlled" readOnly value={row.grade} />
                )}
              </TableCell>
              {isMy && (
                <TableCell align="right" className={s.cell}>
                  {loadingStatus === 'loading' ? (
                    <Skeleton />
                  ) : (
                    <>
                      <ActionButton
                        icon={editIcon}
                        hint="update card"
                        disabled={disabled}
                        onClick={() => handleUpdateCard(row._id, row.question, row.answer)}
                      />
                      <ActionButton
                        icon={deleteIcon}
                        hint="delete card"
                        disabled={disabled}
                        onClick={() => handleDeleteCard(row._id, row.question)}
                      />
                    </>
                  )}
                </TableCell>
              )}
            </TableRow>
          )
        })}
      </TableBody>
      <ModalComponent title={modalTitle} open={open} handleClose={closeModal}>
        {modalChildren}
      </ModalComponent>
    </>
  )
}
