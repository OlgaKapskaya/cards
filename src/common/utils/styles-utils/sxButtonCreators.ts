export const sxButtonColorCreator = (
  bgColor: string,
  fontColor: string,
  width: string = '127px',
  mt: string = '20px',
  mb: string = '20px'
) => {
  return {
    mb: mb,
    mt: mt,
    width: width,
    background: bgColor,
    color: fontColor,
    ':hover': {
      background: bgColor,
      color: fontColor,
    },
  }
}
export const sxButtonMarginTopWidthCreator = (mt: string = '0', width: string = '100%') => {
  return {
    width: width,
    mt: mt,
  }
}
