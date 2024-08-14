export default (count, words) => {
  if ((count > 10 && count < 20) || count % 10 > 4 || count % 10 === 0)
    return words[2]
  if (count % 10 === 1) return words[0]
  return words[1]
}
