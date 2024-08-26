import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Skeleton
} from '@nextui-org/react'
import { Container } from './display'

interface props {
    index: number
}

export default function LoadingCard({ index }: props) {
    const isEven = index % 2 === 0
    const borderStyle = isEven ? '' : 'border-[1.7px]'

    return (
        <Container
            key={index}
            justify={isEven ? 'end' : 'start'}
            className={`flex p-2 mt-3 ${
                index === 5 ? 'mb-[150px] max-sm:mb-[100px]' : 'mb-4'
            } w-full`}>
            <Card className={`w-[400px] h-fit ${borderStyle}`}>
                <CardHeader className="flex gap-3">
                    <div className="flex">
                        <Skeleton className="size-11 rounded-full" />
                        <Skeleton className="w-[120px] h-[3.5vh] rounded ml-2.5" />
                    </div>
                </CardHeader>
                <Divider />
                <CardBody className="whitespace-break-spaces p-3">
                    {Array.from({ length: 5 }).map((_, idx) => {
                        return (
                            <Skeleton
                                className="w-full h-[3.9vh] rounded-lg mb-1.5 mt-1.5"
                                key={idx}
                            />
                        )
                    })}
                </CardBody>
                {!isEven && (
                    <>
                        <Divider />
                        <CardFooter className="flex flex-col items-center justify-start h-auto">
                            <div className="flex w-full">
                                <p>Points: </p>
                                <Skeleton className="w-[30px] h-[3vh] rounded-lg mt-auto mb-auto ml-2" />
                            </div>
                            <Divider className="mt-2 mb-2" />
                        </CardFooter>
                    </>
                )}
            </Card>
        </Container>
    )
}
