import React, { useCallback, useState } from 'react'

import { useProfileMenuItem } from './useProfileMenuItem'

export const useProfileMenuComponent = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const menuItems = useProfileMenuItem()
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  return { anchorEl, open, handleMenuOpen, handleMenuClose, menuItems }
}
