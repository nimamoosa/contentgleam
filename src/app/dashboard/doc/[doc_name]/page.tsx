import { lazy, Suspense } from 'react'

export default function DocNamePage({
    params
}: {
    params: { doc_name: string }
}) {
    const DynamicPage = lazy(() =>
        import(`@/docs/${params.doc_name}`).catch(() => {
            return import('@/docs/404')
        })
    )

    return (
        <div>
            <Suspense>
                <DynamicPage />
            </Suspense>
        </div>
    )
}
