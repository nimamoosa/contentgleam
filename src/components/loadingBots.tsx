import { Card, CardFooter, CardHeader, Skeleton } from '@nextui-org/react'

export default function LoadingBots({ length = 5 }: { length?: number }) {
    return Array.from({ length }).map((_, index) => {
        return (
            <Card
                isFooterBlurred
                className={`w-[85%] h-[300px] ring-2 hover:scale-[1.05]`}
                key={index}>
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                    <Skeleton />
                    <Skeleton className="text-white font-medium bg-black/75 ring-2 px-2 transition-all duration-250 w-[20%] h-[4vh] rounded mt-1 text-2xl" />
                </CardHeader>
                <Skeleton className="w-full h-[35vh]" />
                <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                    <Skeleton className="w-[80%] h-[5vh] bg-black/20 rounded-lg" />
                    <Skeleton className="w-[13%] h-[4.5vh] rounded-lg bg-blue-800" />
                </CardFooter>
            </Card>
        )
    })
}
