import React, { FC, useState } from 'react'

import Rating from '@mui/material/Rating'
import Skeleton from '@mui/material/Skeleton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import s from '../CardsTableBody.module.css'

import deleteIcon from 'assets/img/delete.svg'
import editIcon from 'assets/img/edit.svg'
import errorImg from 'assets/img/errorImg.png'
import { ActionButton } from 'common'
import { CardType } from 'features/cards/cardsAPI'

type CardsTableRowPropsType = {
  card: CardType
  handleUpdateCard: (id: string, question: string, answer: string) => void
  handleDeleteCard: (id: string, name: string) => void
  disabled: boolean
  isMy: boolean
  loadingStatus: string
}

export const CardsTableRow: FC<CardsTableRowPropsType> = ({
  card,
  handleUpdateCard,
  handleDeleteCard,
  disabled,
  isMy,
  loadingStatus,
}) => {
  const [isQuestionImgBroken, setQuestionImgBroken] = useState(false)
  const [isAnswerImgBroken, setIsAnswerImgBroken] = useState(false)

  const errorHandler = (setBroken: (error: boolean) => void) => {
    setBroken(true)
  }

  const question =
    card.questionImg && card.questionImg !== 'noImg' ? (
      <img
        alt={'img'}
        src={isQuestionImgBroken ? errorImg : card.questionImg}
        onError={() => errorHandler(setQuestionImgBroken)}
      />
    ) : (
      card.question
    )
  const answer =
    card.answerImg && card.answerImg !== 'noImg' ? (
      <img
        alt={'img'}
        src={isAnswerImgBroken ? errorImg : card.answerImg}
        onError={() => errorHandler(setIsAnswerImgBroken)}
      />
    ) : (
      card.answer
    )

  return (
    <TableRow className={s.tableRow}>
      <TableCell className={s.cellQuestion}>
        {loadingStatus === 'loading' ? <Skeleton /> : question}
      </TableCell>
      <TableCell className={s.cellAnswer}>
        {loadingStatus === 'loading' ? <Skeleton /> : answer}
      </TableCell>
      <TableCell className={s.cell}>
        {loadingStatus === 'loading' ? <Skeleton /> : card.updated}
      </TableCell>
      <TableCell className={s.cell}>
        {loadingStatus === 'loading' ? (
          <Skeleton />
        ) : (
          <Rating name="simple-controlled" readOnly value={card.grade} />
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
                onClick={() => handleUpdateCard(card._id, card.question, card.answer)}
              />
              <ActionButton
                icon={deleteIcon}
                hint="delete card"
                disabled={disabled}
                onClick={() => handleDeleteCard(card._id, card.question)}
              />
            </>
          )}
        </TableCell>
      )}
    </TableRow>
  )
}
