export type CategoriesType = {
    name: string
    link: string
}

export type BlogItemsType = {
    title: string
    page_title: string
    description: string
    link: string
    author: 'amir' | 'nima'
    categories?: CategoriesType[]
    grouping: string
    createdAt: string
    options?: {
        meta?: string
        list_tag?: string[]
        show_categories?: boolean | true
    }
}
