export const formatDate = date => {
    const formattedDate = new Date(date)

    const month = formattedDate.toLocaleString('default', { month: 'long' })
    const day = formattedDate.getDate()
    const year = formattedDate.getFullYear()

    return `${month} ${day}, ${year}`
}
