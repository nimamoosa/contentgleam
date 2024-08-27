import { Blog, BlogBoxReg, BlogContainer, BlogSection } from '@/components/blog'
import { Container } from '@/components/display'
import TextComponent from '@/components/text'
import handleLink from '@/constants/handleBlogLink'
import { Image } from '@nextui-org/react'
import Link from 'next/link'
import { BiCircle } from 'react-icons/bi'
import { BsFillCircleFill } from 'react-icons/bs'

export default function AdvancedInstagramContentCreator() {
    const topItems: { [key: string]: string[] } = {
        'Enhanced Visibility and Engagement:': [
            '<semi><yellow-100>Boost Post Performance:</yellow-100></semi> By generating tailored captions, optimizing hashtags, and suggesting the best posting times, this tool helps increase the visibility of your posts, making them more likely to reach and engage with a larger audience.'
        ],

        'Tailored Content for Your Audience:': [
            '<semi><blue-100>Audience-Centric Approach:</blue-100></semi> The tool’s suggestions are based on your target audience’s profile, ensuring that your content resonates with their interests and preferences. This personalized approach enhances engagement and builds stronger connections with your followers.'
        ],

        'Description Optimization:': [
            '<semi><green-200>Professional Descriptions:</green-200></semi> Receive a professional, SEO-optimized description that enhances your video’s discoverability. This includes a concise overview of the content, key highlights, clickable timestamps for easy navigation, and a strong CTA to encourage viewer retention and engagement.'
        ],

        'Efficient Content Creation:': [
            '<semi><indigo-200>Save Time and Effort:</indigo-200></semi> The tool streamlines the content creation process by providing ready-to-use post ideas, captions, and hashtags. This efficiency allows you to focus more on other aspects of your Instagram strategy.'
        ],

        'Strategic Posting for Maximum Impact:': [
            '<semi><red-100>Optimal Timing:</red-100></semi> With recommendations on the best times to post, the tool helps you schedule your content for maximum impact. This strategic timing increases the chances of your posts being seen and interacted with by your audience.'
        ],

        'Comprehensive Post Strategy:': [
            '<bold>Holistic Approach:</bold> From creative concepts to post-engagement strategies, this tool covers all aspects of post creation. It ensures that every element of your post is optimized for effectiveness, providing a complete strategy for success.'
        ]
    }

    const keyItems: string[] = [
        `<green-300>Creative Concept & Idea:</green-300> Generate a unique and trending post idea that aligns with your chosen topic and niche. This feature ensures that your content is fresh, relevant, and appealing to your target audience.`,
        `<green-300>Compelling Caption:</green-300> Craft a strong hook, a persuasive message, and a clear call-to-action (CTA). The tool’s captions are designed to grab attention and drive interaction, aligning with your post’s objective.`,
        `<green-300>Hashtag Optimization:</green-300> Receive a curated list of 20-25 relevant and trending hashtags to enhance your post’s reach. This feature helps you tap into current trends and increase your content’s discoverability.`,
        `<green-300>Visual Content Suggestions:</green-300> Get recommendations for the best visual formats, such as Carousel, Reel, or IGTV. The tool also provides tips for creating high-quality visuals that complement your captions and engage your audience.`,
        `<green-300>Optimal Posting Strategy:</green-300> Find out the best times to post based on your audience’s engagement patterns. This feature ensures that your posts go live when they’re most likely to receive attention and interaction.`,
        `<green-300>Post-Engagement Strategy:</green-300> Gain insights on boosting post-engagement after publishing. The tool offers tips on how to track performance and measure the success of your posts, helping you refine your strategy for future content.`
    ]

    return (
        <Blog dir="ltr">
            <BlogSection className="max-sm:text-center">
                <p>
                    In the fast-paced world of social media, crafting posts that
                    stand out on Instagram requires more than just creativity;
                    it demands a strategic approach. The Advanced Instagram
                    Content Creator tool is designed to help you create
                    compelling and optimized Instagram posts that are tailored
                    to your specific goals and audience. Whether you’re aiming
                    to boost engagement, drive sales, or simply grow your
                    follower base, this tool offers a comprehensive solution to
                    elevate your Instagram presence.
                </p>
            </BlogSection>

            <BlogSection className="mt-5">
                <BlogBoxReg title="Why Use This Tool?">
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
                <BlogBoxReg title="Key Features">
                    {keyItems.map((item, index) => {
                        return (
                            <BlogContainer
                                key={index}
                                className="flex justify-center mt-3">
                                <Container className="mr-2 mt-[3px] ">
                                    <BiCircle className="text-sm" />
                                </Container>
                                <TextComponent message={item} />
                            </BlogContainer>
                        )
                    })}

                    <BlogContainer className="mt-5">
                        <Image
                            isBlurred
                            isZoomed
                            src="/instagram_2.png"
                            className="w-[500px] h-[500px] max-sm:w-[300px] max-sm:h-[300px]"
                        />
                    </BlogContainer>
                </BlogBoxReg>
            </BlogSection>

            <BlogSection>
                <BlogBoxReg title="Call to Action" wrapperClassName="mt-9">
                    <BlogContainer className="mt-3">
                        <TextComponent
                            message={`<bold><yellow-200>Ready to take your Instagram game to the next level?</yellow-200></bold Start using the Advanced Instagram Content Creator today and watch your engagement soar. Whether you’re aiming for more likes, comments, or followers, this tool provides the insights and optimization you need to make every post count. Don’t wait—empower your Instagram strategy now and see the results for yourself!`}
                        />
                    </BlogContainer>
                </BlogBoxReg>
            </BlogSection>

            <BlogSection className="max-sm:text-center flex flex-col">
                <BlogContainer className="text-center mt-5">
                    <Link
                        href={handleLink('advanced-instagram-content-creator')}
                        target="_blank"
                        className="underline underline-offset-8 text-blue-400">
                        Advanced Instagram Content Creator
                    </Link>
                </BlogContainer>
            </BlogSection>
        </Blog>
    )
}
