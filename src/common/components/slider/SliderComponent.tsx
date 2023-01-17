import React, { memo } from 'react'

import { Slider, SliderProps } from '@mui/material'

type SliderComponentPropsType = SliderProps & { width?: number }
export const SliderComponent: React.FC<SliderComponentPropsType> = memo(
  ({ width, sx, ...restProps }) => {
    return (
      <Slider
        sx={{
          margin: '0 10px',
          height: 5,
          width: `${width}px`,
          padding: '13px 0',
          '& .MuiSlider-thumb': {
            height: 16,
            width: 16,
            backgroundColor: 'currentColor',
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
          '& .MuiSlider-thumb:after': {
            width: '8px',
            height: '8px',
            top: '50%',
            left: '50%',
            backgroundColor: '#FFF',
          },
          ...sx,
        }}
        {...restProps}
      />
    )
  }
)
