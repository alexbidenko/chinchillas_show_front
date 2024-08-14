export default (n) => {
  if (n < 10) {
    return String(`0${n}`).slice(-2)
  }

  return String(n)
}
