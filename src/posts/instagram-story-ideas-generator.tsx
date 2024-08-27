import {
    Blog,
    BlogBox,
    BlogBoxReg,
    BlogContainer,
    BlogSection
} from '@/components/blog'
import { Container } from '@/components/display'
import TextComponent from '@/components/text'
import handleLink from '@/constants/handleBlogLink'
import { Image } from '@nextui-org/react'
import Link from 'next/link'
import { BiCircle } from 'react-icons/bi'
import { BsFillCircleFill } from 'react-icons/bs'

export default function InstagramStoryIdeasGenerator() {
    const topItems: { [key: string]: string[] } = {
        'Creative and Interactive Story Ideas:': [
            'Receive 5 unique Instagram Story ideas based on your chosen topic.',
            'Each idea includes detailed suggestions for visuals, text overlays, and interactive elements like polls or quizzes to maximize viewer engagement.'
        ],

        'Tailored Visual Suggestions:': [
            'Get recommendations for the type of visuals that will complement each story idea, enhancing its appeal and effectiveness.'
        ],

        'Effective Text Overlays:': [
            'Obtain guidance on creating compelling text overlays that capture attention and convey your message clearly.'
        ],

        'Interactive Elements::': [
            'Integrate engaging interactive components, such as polls, questions, and quizzes, to encourage viewer participation and interaction.'
        ],

        'Alignment with Best Practices:': [
            'Ensure your stories align with Instagram’s best practices for Stories, helping you create content that performs well and meets audience expectations.'
        ],

        'Boosted Engagement:': [
            'Leverage innovative ideas to foster higher engagement rates and keep your audience coming back for more.'
        ]
    }

    return (
        <Blog dir="ltr">
            <BlogSection className="max-sm:text-center">
                <p>
                    In today’s fast-paced social media landscape, keeping your
                    Instagram Stories fresh and engaging is crucial for
                    capturing your audience's attention and maintaining their
                    interest. The Instagram Story Ideas Generator is a
                    cutting-edge AI tool designed to help you achieve just that.
                    By generating creative and interactive Instagram Story ideas
                    based on your inputs, this tool ensures that your content
                    stands out and resonates with your audience.
                </p>
            </BlogSection>

            <BlogSection className="mt-5">
                <BlogBoxReg title="Why Use This Tool?">
                    <p>
                        Maintaining an active and engaging Instagram Story feed
                        requires constant creativity and originality. The
                        Instagram Story Ideas Generator takes the guesswork out
                        of content creation by offering you tailored story ideas
                        that are both visually appealing and interactive.
                        Whether you’re looking to boost engagement, promote a
                        product, or simply connect with your audience on a
                        deeper level, this tool provides you with a stream of
                        fresh ideas that align with best practices for Instagram
                        Stories.
                    </p>
                </BlogBoxReg>
            </BlogSection>

            <BlogSection>
                <BlogBoxReg title="Key Features">
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

                    <BlogContainer className="mt-5">
                        <Image
                            isBlurred
                            isZoomed
                            src="/instagram_3.png"
                            className="w-[500px] h-[500px] max-sm:w-[300px] max-sm:h-[300px]"
                        />
                    </BlogContainer>
                </BlogBoxReg>
            </BlogSection>

            <BlogSection>
                <BlogBoxReg title="Call to Action" wrapperClassName="mt-9">
                    <BlogContainer className="mt-3">
                        <TextComponent
                            message={`Ready to transform your Instagram Stories into captivating and engaging content? Try the Instagram Story Ideas Generator today and watch your Instagram engagement soar! Enter your topic and let the tool guide you in crafting the perfect stories for your audience.`}
                        />
                    </BlogContainer>
                </BlogBoxReg>
            </BlogSection>

            <BlogSection>
                <BlogBoxReg title="Conclusion">
                    <BlogBox
                        className="max-sm:text-center"
                        content={`The <semi><blue-200>Instagram Story Ideas Generator</blue-200></semi> is an essential tool for any social media manager, marketer, or influencer looking to elevate their Instagram presence. By providing a steady flow of creative and engaging story ideas, this tool simplifies the content creation process and helps you maintain an active and appealing Instagram feed. Don’t let your Instagram Stories become stale—use this tool to consistently deliver fresh and interactive content that captivates your audience.`}
                    />
                </BlogBoxReg>
            </BlogSection>

            <BlogSection className="max-sm:text-center flex flex-col">
                <BlogContainer className="text-center mt-5">
                    <Link
                        href={handleLink('instagram-story-ideas-generator')}
                        target="_blank"
                        className="underline underline-offset-8 text-blue-400">
                        Instagram Story Ideas Generator
                    </Link>
                </BlogContainer>
            </BlogSection>
        </Blog>
    )
}
