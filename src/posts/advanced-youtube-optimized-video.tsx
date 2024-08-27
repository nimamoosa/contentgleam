import { Blog, BlogBoxReg, BlogContainer, BlogSection } from '@/components/blog'
import { Container } from '@/components/display'
import TextComponent from '@/components/text'
import handleLink from '@/constants/handleBlogLink'
import { Image } from '@nextui-org/react'
import Link from 'next/link'
import { BiCircle } from 'react-icons/bi'
import { BsFillCircleFill } from 'react-icons/bs'

export default function AdvancedYoutubeOptimizedVideo() {
    const topItems: { [key: string]: string[] } = {
        'Customized Video Structure:': [
            '<semi><yellow-100>Intro & Hook:</yellow-100></semi> Captivate your audience from the get-go with a well-designed hook.',

            '<semi><yellow-100>Introduction:</yellow-100></semi> Set the stage with a compelling intro that introduces the host and engages viewers.',

            "<semi><yellow-100>Main Content Sections:</yellow-100></semi> Ensure smooth transitions and organized content, tailored to your video's length and type.",

            '<semi><yellow-100>Engagement Prompts:</yellow-100></semi> Seamlessly integrate prompts to like, subscribe, or comment, enhancing viewer interaction.',

            "<semi><yellow-100>Call-to-Action (CTA):</yellow-100></semi> Conclude with a persuasive CTA to drive specific actions, aligned with your video's goals.",

            '<semi><yellow-100>Outro:</yellow-100></semi>: Conclude your video with a strong outro that recaps key points, offers closing thoughts, or directs viewers to additional resources. A well-crafted outro leaves a lasting impression and encourages continued engagement.'
        ],

        'Title Optimization:': [
            '<semi><blue-100>Get three unique:</blue-100></semi> The tool generates three unique, SEO-optimized titles designed to boost click-through rates (CTR) and increase virality. Each title is backed by keyword research and crafted to create curiosity, compelling viewers to click and watch your video.',
            '<semi><blue-100>Audience Targeting:</blue-100></semi> The effectiveness of each title is explained, highlighting how it appeals to different segments of your audience, whether they are tutorial seekers, entertainment viewers, or another target group. Description Optimization'
        ],

        'Description Optimization:': [
            '<semi><green-200>Professional Descriptions:</green-200></semi> Receive a professional, SEO-optimized description that enhances your video’s discoverability. This includes a concise overview of the content, key highlights, clickable timestamps for easy navigation, and a strong CTA to encourage viewer retention and engagement.'
        ],

        'Hashtag and Keyword Optimization:': [
            '<semi><indigo-200>Niche-Specific Hashtags:</indigo-200></semi> The tool provides 5-10 trending hashtags tailored to your video’s niche, helping to increase its visibility within the relevant community.',
            '<semi><indigo-200>SEO-Rich Keywords:</indigo-200></semi> Get 5-7 strategically chosen keywords that are essential for boosting your video’s search performance. Each keyword is explained in terms of its role in enhancing discoverability.'
        ],

        'Personalized Video Insights:': [
            '<semi><red-100>Audience Retention Tips:</red-100></semi> Improve your video’s pacing and transitions to keep viewers engaged throughout the entire video. This section also offers insights into optimal upload times based on your audience’s engagement patterns.',
            '<semi><red-100>Content Ideas for Other Platforms:</red-100></semi> The tool suggests complementary content ideas that can be adapted for platforms like Instagram or TikTok, helping you expand your reach and brand presence across multiple channels.',
            '<semi><red-100>Upload Timing Recommendations:</red-100></semi> Learn the best times to upload your videos based on your audience’s behavior, ensuring that your content is released when viewers are most active.'
        ],

        'Bonus Optimization Tips (Optional):': [
            '<bold>Thumbnail Creation Tips:</bold> Receive actionable advice on creating visually compelling thumbnails that attract clicks. The tool offers three specific tips to enhance your thumbnail design, making your video more appealing at first glance.',
            '<bold>Enhancing Audio and Visual Quality:</bold> Recommendations are provided to help improve the overall production quality of your videos, from audio clarity to visual appeal, ensuring a professional look and feel.'
        ]
    }

    const keyItems: string[] = [
        `<green-300>Dynamic Adaptability:</green-300> The tool adapts to your video’s length, type, topic, and target audience, offering personalized recommendations that ensure your content is both engaging and discoverable.`,
        `<green-300>Comprehensive SEO Optimization:</green-300> Every aspect of your video, from titles to descriptions and keywords, is optimized for search engines, helping you rank higher and attract more viewers.`,
        `<green-300>User-Friendly Interface:</green-300> The input process is straightforward and intuitive, allowing you to quickly generate a complete video blueprint without needing extensive SEO knowledge.`,
        `<green-300>Time-Saving:</green-300> By automating the video structuring and SEO process, this tool frees up your time, allowing you to focus on content creation and other important tasks.`,
        `<green-300>Versatility:</green-300> Whether you're a beginner or an experienced YouTuber, this tool scales with your needs, providing value at every stage of your content creation journey.`
    ]

    return (
        <Blog dir="ltr">
            <BlogSection className="max-sm:text-center">
                <p>
                    In the fiercely competitive world of YouTube, producing
                    quality content is just the beginning. To truly stand out,
                    grow your channel, and engage with a broader audience, you
                    need a strategic approach that goes beyond basic video
                    creation. This involves optimizing both your video structure
                    and its discoverability through effective SEO practices. The
                    Advanced YouTube Video Structuring and SEO tool is designed
                    precisely for this purpose. It provides content creators
                    with a powerful and comprehensive blueprint for crafting
                    YouTube videos that are not only engaging but also optimized
                    for maximum visibility and performance.
                </p>
            </BlogSection>

            <BlogSection className="mt-5">
                <BlogBoxReg title="What Does This Tool Offer?">
                    <BlogContainer>
                        <TextComponent
                            message={`The <bold>Advanced YouTube Video Structuring and SEO</bold> model provides a complete package, from a fully structured video script to SEO-optimized titles, descriptions, hashtags, and personalized insights. Here’s what you can expect:`}
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
                            src="/youtube_3.png"
                            className="w-[500px] h-[500px] max-sm:w-[300px] max-sm:h-[300px]"
                        />
                    </BlogContainer>
                </BlogBoxReg>
            </BlogSection>

            <BlogSection>
                <BlogBoxReg title="How Does It Work?" wrapperClassName="mt-9">
                    <BlogContainer>
                        <TextComponent
                            message={`Using the <bold><yellow-300>YouTube SEO Optimizer</yellow-300></bold> is straightforward. You start by entering your video’s keywords, a brief outline, and any specific preferences you have for optimization. The AI then processes this information to generate optimized titles, descriptions, and tags that are ready for use. The results are designed to be copy-paste ready, making it easy for you to integrate them directly into your video uploads.`}
                        />
                    </BlogContainer>
                    <BlogContainer className="mt-3">
                        <BlogBoxReg title="Why Use This Tool?">
                            <TextComponent
                                message={`Whether you’re a seasoned YouTuber aiming to refine your
                    strategy or a newcomer looking to make a mark, the Advanced
                    YouTube Video Structuring and SEO tool is an invaluable
                    asset. By tailoring your video’s structure and optimizing it
                    for search engines, you can significantly enhance your
                    content’s performance, attract more viewers, and grow your
                    channel with confidence. This tool is not just about
                    improving one video—it’s about building a consistent,
                    strategic approach to content creation that yields long-term
                    results.`}
                            />
                        </BlogBoxReg>
                    </BlogContainer>
                </BlogBoxReg>
            </BlogSection>

            <BlogSection className="max-sm:text-center flex flex-col">
                <BlogContainer>
                    <TextComponent
                        message={`Incorporating the Advanced YouTube Video Structuring and SEO tool into your workflow is a game-changer. It equips you with the insights and optimizations needed to make your content stand out, ensuring that your videos reach their full potential in the highly competitive YouTube landscape.`}
                    />
                </BlogContainer>

                <BlogContainer className="text-center mt-5">
                    <Link
                        href={handleLink('advanced-youtube-optimized-video')}
                        target="_blank"
                        className="underline underline-offset-8 text-blue-400">
                        Advanced Youtube Optimized Video
                    </Link>
                </BlogContainer>
            </BlogSection>
        </Blog>
    )
}
