import React, { useRef, useEffect } from 'react'

const MobileTrianglesBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const updateCanvasSize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        updateCanvasSize()

        const width = canvas.width
        const height = canvas.height
        const numTriangles = 150 // تعداد مثلث‌ها برای موبایل

        const triangles = Array.from({ length: numTriangles }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 20 + 5,
            dx: (Math.random() - 0.5) * 2,
            dy: (Math.random() - 0.5) * 2,
            color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
                Math.random() * 255
            )}, ${Math.floor(Math.random() * 255)}, ${
                Math.random() * 0.5 + 0.5
            })`
        }))

        const drawTriangle = (
            ctx: CanvasRenderingContext2D,
            x: number,
            y: number,
            size: number,
            color: string
        ) => {
            ctx.save()
            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(x + size, y)
            ctx.lineTo(x + size / 2, y - size)
            ctx.closePath()
            ctx.fillStyle = color
            ctx.fill()
            ctx.restore()
        }

        const updateTriangles = () => {
            triangles.forEach((triangle) => {
                triangle.x += triangle.dx
                triangle.y += triangle.dy

                if (triangle.x < 0 || triangle.x > width) triangle.dx *= -1
                if (triangle.y < 0 || triangle.y > height) triangle.dy *= -1
            })
        }

        const drawTriangles = () => {
            ctx.clearRect(0, 0, width, height)

            triangles.forEach((triangle) => {
                drawTriangle(
                    ctx,
                    triangle.x,
                    triangle.y,
                    triangle.size,
                    triangle.color
                )
            })

            updateTriangles()
            requestAnimationFrame(drawTriangles)
        }

        drawTriangles()

        window.addEventListener('resize', updateCanvasSize)

        return () => {
            window.removeEventListener('resize', updateCanvasSize)
        }
    }, [])

    return (
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-[-1] bg-gradient-radial from-blue-900 via-pink-800/40">
            <canvas ref={canvasRef} />
        </div>
    )
}

export default MobileTrianglesBackground
