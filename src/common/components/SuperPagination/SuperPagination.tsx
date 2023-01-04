import React, {ChangeEvent, useEffect, useState} from 'react'
import {Pagination} from '@mui/material'
import s from './SuperPagination.module.css'
import SuperSelect from "../SuperSelect/SuperSelect";

export type SuperPaginationPropsType = {
    id?: string
    page: number
    itemsCountForPage: number
    totalCount: number
    onChange: (page: number, count: number) => void
}

const SuperPagination: React.FC<SuperPaginationPropsType> = (
    {
        page, itemsCountForPage, totalCount, onChange, id = 'hw15',
    }
) => {
    const lastPage = Math.ceil(totalCount / itemsCountForPage)
    const [pageSize, setPageSize] = useState<number>(itemsCountForPage)

    useEffect(() => {
        onChange(1, pageSize)
    }, [pageSize])

    const onChangeCallback = (event: React.ChangeEvent<unknown>, page: number) => {
        onChange(page, pageSize)
    }

    const onChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        setPageSize(+event.currentTarget.value)
    }

    return (
        <div className={s.pagination}>
            <Pagination
                id={id + '-pagination'}
                sx={{
                    '& button': {
                        marginRight: "10px",
                        borderRadius: "5px",
                        fontSize: "14px",
                        '&:hover': {
                            color: "white",
                            background: "#0066CC",
                        },
                    },
                    '& .MuiPaginationItem-root.Mui-selected':{
                        color: "white",
                        background: "#0066CC",
                        '&:hover': {
                            color: "white",
                            background: "#0066CC",
                        },
                    },

                }}
                page={page}
                count={lastPage}
                onChange={onChangeCallback}
                hideNextButton
                hidePrevButton
            />

            <span className={s.text1}>
                показать
            </span>

            <SuperSelect
                id={id + '-pagination-select'}
                value={pageSize}
                options={[
                    {id: 4, value: 4},
                    {id: 7, value: 7},
                    {id: 10, value: 10},
                ]}
                onChange={onChangeSelect}
            />

            <span className={s.text2}>
                строк в таблице
            </span>
        </div>
    )
}

export default SuperPagination
