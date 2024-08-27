import { Blog, BlogBoxReg, BlogContainer, BlogSection } from '@/components/blog'
import { Container } from '@/components/display'
import TextComponent from '@/components/text'
import handleLink from '@/constants/handleBlogLink'
import { Image } from '@nextui-org/react'
import Link from 'next/link'
import { BiCircle } from 'react-icons/bi'
import { BsFillCircleFill } from 'react-icons/bs'

export default function InstagramEngagementBoostStrategies() {
    const topItems: { [key: string]: string[] } = {
        'Customized Engagement Strategies:': [
            '<semi><yellow-100>Strategy 1:</yellow-100></semi> Receive a specific action plan that includes detailed steps to boost engagement, accompanied by best practices and tips on how to measure success.',

            '<semi><yellow-100>Strategy 2:</yellow-100></semi> Get a second actionable strategy with a focus on enhancing interaction, ensuring that every action you take is grounded in proven methods.',

            '<semi><yellow-100>Strategy 3:</yellow-100></semi> Benefit from a third tailored strategy that targets your unique content type and metrics, helping you refine your approach for better results.',

            '<semi><yellow-100>Strategy 4:</yellow-100></semi> Explore another strategy aimed at increasing visibility and engagement through optimized content practices and engagement techniques.',

            '<semi><yellow-100>Strategy 5:</yellow-100></semi> Access a final set of tactics with comprehensive guidance on tracking effectiveness and adjusting your strategy as needed.'
        ],

        'Detailed Action Plans:': [
            '<semi><blue-100>Each strategy</blue-100></semi> includes step-by-step actions to implement, ensuring clarity and ease of execution.',
            '<semi><blue-100>Learn how to</blue-100></semi> apply best practices that align with Instagram’s algorithms and user behavior to drive higher engagement.'
        ],

        'Best Practices and Tips:': [
            '<semi><indigo-200>Discover</indigo-200></semi> proven methods and insider tips for enhancing post visibility and interaction.',
            '<semi><indigo-200>Understand</indigo-200></semi> how to leverage Instagram’s features, such as Stories and IGTV, to capture your audience’s attention.'
        ],

        'Success Measurement:': [
            '<semi><red-100>Receive guidance</red-100></semi> on tracking engagement metrics and evaluating the success of your strategies.',
            '<semi><red-100>Learn how</red-100></semi> to adjust your approach based on performance data to continually improve engagement.'
        ]
    }

    return (
        <Blog dir="ltr">
            <BlogSection className="max-sm:text-center">
                <p>
                    In today’s crowded social media landscape, simply posting
                    content on Instagram is not enough to capture attention and
                    drive meaningful interactions. To truly excel and build a
                    thriving online presence, you need a strategic approach that
                    maximizes engagement on your posts and Stories. This is
                    where the Instagram Engagement Boost Strategies tool comes
                    into play.
                </p>
            </BlogSection>

            <BlogSection className="mt-5">
                <BlogBoxReg title="What This Tool Offers?">
                    <BlogContainer>
                        <TextComponent
                            message={`The <bold>Instagram Engagement Boost Strategies</bold> tool provides you with a detailed and actionable plan to significantly enhance your interaction metrics. By analyzing your current engagement levels and understanding your content type and objectives, this tool delivers tailored strategies that are designed to optimize your Instagram presence. Here’s what you can expect:`}
                        />
                    </BlogContainer>

                    {Object.keys(topItems).map((item, index) => {
                        const getArr = topItems[item]

                        return (
                            <BlogContainer key={index + 1}>
                                <Container>
                                    <TextComponent
                                        message={`${
                                            index + 1
                                        }. <bold>${item}</bold>`}
                                    />
                                </Container>

                                <Container
                                    flexDecoration="col"
                                    className="ml-7 mt-1">
                                    {getArr.map((arr, idx) => {
                                        return (
                                            <Container
                                                flexDecoration="row"
                                                alignItems="start">
                                                <Container>
                                                    <BsFillCircleFill
                                                        className="mt-2.5 mr-2"
                                                        size={7}
                                                    />
                                                </Container>
                                                <TextComponent
                                                    key={idx}
                                                    className="m-1"
                                                    message={arr}
                                                />
                                            </Container>
                                        )
                                    })}
                                </Container>
                            </BlogContainer>
                        )
                    })}
                </BlogBoxReg>
            </BlogSection>
            <BlogSection>
                <BlogContainer className="mt-5">
                    <Image
                        isBlurred
                        isZoomed
                        src="/instagram_4.png"
                        className="w-[500px] h-[500px] max-sm:w-[300px] max-sm:h-[300px]"
                    />
                </BlogContainer>
            </BlogSection>

            <BlogSection>
                <BlogBoxReg title="Conclusion" wrapperClassName="mt-9">
                    <TextComponent
                        message={`The Instagram Engagement Boost Strategies tool is an invaluable asset for anyone looking to elevate their Instagram game. By providing actionable strategies and detailed plans tailored to your unique needs, this tool helps you navigate the complexities of social media engagement. Whether you’re aiming to increase likes, comments, or overall interaction, incorporating these strategies into your content plan will help you connect with your audience more effectively and achieve your Instagram goals with greater success.`}
                    />
                </BlogBoxReg>
            </BlogSection>

            <BlogSection className="max-sm:text-center flex flex-col">
                <BlogContainer className="text-center mt-5">
                    <Link
                        href={handleLink(
                            'instagram-engagement-boost-strategies'
                        )}
                        target="_blank"
                        className="underline underline-offset-8 text-blue-400">
                        Instagram Engagement Boost Strategies
                    </Link>
                </BlogContainer>
            </BlogSection>
        </Blog>
    )
}
