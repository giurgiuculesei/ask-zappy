type Topic = {
    section: number
    title: string
    items: Array<{
        title: string
        desc: string
        levels: Level[]
        free?: boolean
    }>
}