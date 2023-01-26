import React from 'react'

import Rating from '@mui/material/Rating'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import deleteIcon from '../../../../assets/img/delete.svg'
import editIcon from '../../../../assets/img/edit.svg'
import {
  ActionButton,
  appStatusSelector,
  cardsSelector,
  useAppSelector,
  userCardsPackIdSelector,
  userIDSelector,
} from '../../../../common'
import { ModalComponent } from '../../../../common/components/modal-component/ModalComponent'
import { useModalComponent } from '../../../../common/components/modal-component/useModalComponent'
import { DeleteCardForm } from '../../cards-modal-form/DeleteCardForm'
import { EditCardForm } from '../../cards-modal-form/EditCardForm'

import s from './CardsTableBody.module.css'

export const CardsTableBody = () => {
  const cards = useAppSelector(cardsSelector)
  const loadingStatus = useAppSelector(appStatusSelector)
  const userId = useAppSelector(userCardsPackIdSelector)
  const profileId = useAppSelector(userIDSelector)
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
    createModal(
      'Delete card',
      <DeleteCardForm id={id} name={name} disabled={disabled} closeModal={closeModal} />
    )
  }

  return (
    <>
      <TableBody>
        {cards.map(row => {
          return (
            <TableRow hover key={row._id} className={s.tableRow}>
              <TableCell className={s.cellQuestion} onClick={() => alert('open card')}>
                {row.question}
              </TableCell>
              <TableCell className={s.cellAnswer} onClick={() => alert('open card')}>
                {row.answer}
              </TableCell>
              <TableCell className={s.cell} onClick={() => alert('open card')}>
                {row.updated}
              </TableCell>
              <TableCell className={s.cell}>
                <Rating name="simple-controlled" readOnly value={row.grade} />
              </TableCell>
              {isMy && (
                <TableCell align="right" className={s.cell}>
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
