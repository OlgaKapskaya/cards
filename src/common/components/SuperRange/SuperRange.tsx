import React from 'react'
import {Slider, SliderProps} from '@mui/material'

const SuperRange: React.FC<SliderProps> = (props) => {
    return (
        <Slider
            sx={{
                margin: '0 10px',
                color: '#00CC22',
                width: '147px',
                height: 3,
                padding: '13px 0',
                '& .MuiSlider-thumb': {
                    height: 17,
                    width: 17,
                    backgroundColor: '#fff',
                    border: '1px solid currentColor',
                    '&:hover': {
                        boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
                    },
                    '& .airbnb-bar': {
                        height: 9,
                        width: 1,
                        backgroundColor: 'currentColor',
                        marginLeft: 1,
                        marginRight: 1,
                    },
                },
                '& .MuiSlider-track': {
                    height: 3,
                },
                '& .MuiSlider-thumb:after':
                    { width: '6px',
                        height: '6px',
                        top: '50%',
                        left: '50%',
                        backgroundColor: '#00CC22  '
            }}}
            {...props} // отдаём слайдеру пропсы если они есть (value например там внутри)
        />
    )
}

export default SuperRange
