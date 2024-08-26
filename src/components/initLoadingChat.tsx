import LoadingCard from './loadingCard'

export default function InitLoadingChat() {
    return Array.from({ length: 6 }).map((_, index) => {
        return <LoadingCard index={index} key={index + 1} />
    })
}
