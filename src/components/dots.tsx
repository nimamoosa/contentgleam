import React, { useRef, useEffect } from 'react'

const StarsBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    let numStars = 350
    const maxDistance = 100
    const speedFactor = 0.5
    let mouseX = 0
    let mouseY = 0

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const updateCanvasSize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight

            if (canvas.width < 768) {
                numStars = 100
            } else {
                numStars = 350
            }
        }

        updateCanvasSize()

        const width = canvas.width
        const height = canvas.height

        const bufferCanvas = document.createElement('canvas')
        const bufferCtx = bufferCanvas.getContext('2d')
        if (!bufferCtx) return

        bufferCanvas.width = width
        bufferCanvas.height = height

        const stars = Array.from({ length: numStars }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 2 + 0.5,
            dx: (Math.random() - 0.5) * speedFactor,
            dy: (Math.random() - 0.5) * speedFactor,
            color: `rgba(${Math.floor(Math.random() * 200 + 55)}, ${Math.floor(
                Math.random() * 200 + 55
            )}, ${Math.floor(Math.random() * 200 + 55)}, ${
                Math.random() * 0.5 + 0.5
            })`
        }))

        const drawStar = (
            ctx: CanvasRenderingContext2D,
            x: number,
            y: number,
            size: number,
            color: string
        ) => {
            ctx.save()
            ctx.shadowColor = 'rgba(255, 255, 255, 0.3)'
            ctx.shadowBlur = 5
            ctx.shadowOffsetX = 0
            ctx.shadowOffsetY = 0
            ctx.beginPath()
            ctx.arc(x, y, size, 0, Math.PI * 2)
            ctx.fillStyle = color
            ctx.fill()
            ctx.restore()
        }

        const drawLines = (ctx: CanvasRenderingContext2D, stars: any[]) => {
            ctx.clearRect(0, 0, width, height)
            ctx.beginPath()
            for (let i = 0; i < stars.length; i++) {
                for (let j = i + 1; j < stars.length; j++) {
                    const distance = Math.sqrt(
                        (stars[i].x - stars[j].x) ** 2 +
                            (stars[i].y - stars[j].y) ** 2
                    )

                    if (distance < maxDistance) {
                        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
                        ctx.moveTo(stars[i].x, stars[i].y)
                        ctx.lineTo(stars[j].x, stars[j].y)
                    }
                }
            }
            ctx.lineWidth = 0.1
            ctx.stroke()
        }

        const updateStars = () => {
            stars.forEach((star) => {
                const dx = star.x - mouseX
                const dy = star.y - mouseY
                const distance = Math.sqrt(dx * dx + dy * dy)
                if (distance < 100) {
                    star.x += dx / distance
                    star.y += dy / distance
                } else {
                    star.x += star.dx
                    star.y += star.dy
                }

                if (star.x < 0 || star.x > width) star.dx *= -1
                if (star.y < 0 || star.y > height) star.dy *= -1
            })
        }

        const drawStars = () => {
            ctx.clearRect(0, 0, width, height)
            bufferCtx.clearRect(0, 0, width, height)

            stars.forEach((star) => {
                drawStar(ctx, star.x, star.y, star.size, star.color)
                drawStar(bufferCtx, star.x, star.y, star.size, star.color)
            })

            drawLines(bufferCtx, stars)

            ctx.drawImage(bufferCanvas, 0, 0)

            updateStars()
            requestAnimationFrame(drawStars)
        }

        drawStars()

        const handleMouseMove = (event: MouseEvent) => {
            mouseX = event.clientX
            mouseY = event.clientY
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('resize', updateCanvasSize)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('resize', updateCanvasSize)
        }
    }, [numStars])

    return (
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-[-1] max-sm:hidden">
            <canvas ref={canvasRef} />
        </div>
    )
}

export default StarsBackground
