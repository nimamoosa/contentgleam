'use client'

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

export default function YoutubeTags() {
    const keyItems: string[] = [
        `<green-300>Relevance and Accuracy</green-300>: The generator uses advanced algorithms to analyze your video title and outline,
          producing tags that are not only relevant but also effective in enhancing your video's <indigo-100>discoverability</indigo-100>.`,
        `<green-300>Easy Integration:</green-300> The tags are formatted in bullet points, making them easy to copy and paste directly into your video's description.
          This ensures that your tags are neatly organized and ready for use.`,
        `<green-300>Category-Specific Optimization:</green-300> Whether your content falls under entertainment, education, gaming, or any other category,
          the YouTube Tags Generator tailors its suggestions to best fit the category, enhancing your video’s reach.`,
        `<green-300>Rich Text Editor Compatibility:</green-300> The tags generated are designed to be compatible with rich text editors,
          ensuring that the formatting is maintained when inserting into your video description.`,
        `<green-300>User-Friendly Interface:</green-300> With a simple and intuitive input process, you only need to enter your video’s title and outline to receive a set of tags.
          No need to spend hours brainstorming or researching tags manually.`
    ]

    return (
        <Blog dir="ltr">
            <BlogSection className="max-sm:text-center">
                <p>
                    In the vast world of YouTube, standing out from the crowd is
                    essential to attracting viewers and growing your channel.
                    One of the key strategies for achieving this is optimizing
                    your video tags. Tags help YouTube's algorithm understand
                    the content of your video, making it easier for your target
                    audience to find your content. This is where the YouTube
                    Tags Generator comes into play.
                </p>
            </BlogSection>

            <BlogSection className="mt-5">
                <BlogBoxReg title="What is the YouTube Tags Generator?">
                    <TextComponent
                        message={`The <yellow-200>YouTube Tags Generator</yellow-200> is a powerful tool designed to
                    help content creators generate relevant and effective tags
                    for their <orange-200>YouTube videos</orange-200>. Based on the video title and
                    outline you provide, this tool automatically generates a set
                    of 10 highly relevant tags. These tags are formatted for
                    easy insertion into your video description, saving you time
                    and ensuring your video is <indigo-200>optimized for search</indigo-200>.`}
                    />
                </BlogBoxReg>
            </BlogSection>

            <BlogSection>
                <BlogBoxReg title="Key Features">
                    {keyItems.map((item, index) => {
                        return (
                            <BlogContainer
                                key={index}
                                className="flex justify-center">
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
                            src="/youtube_2.png"
                            className="w-[500px] h-[500px] max-sm:w-[300px] max-sm:h-[300px]"
                        />
                    </BlogContainer>
                </BlogBoxReg>
            </BlogSection>

            <BlogSection>
                <BlogBoxReg title="How Does It Work?" wrapperClassName="mt-9">
                    <BlogContainer>
                        <TextComponent
                            message={`The process is straightforward. You start by entering your video title and a brief outline of its content into the tool.
                             The <yellow-300>YouTube Tags Generator</yellow-300> then analyzes this input to generate 10 relevant tags. These tags are presented in a bullet-point format, 
                                which you can easily copy and paste into your video description or tag section.`}
                        />
                    </BlogContainer>

                    <BlogContainer className="mt-3">
                        <TextComponent
                            className="font-semibold"
                            message="Why Should You Use the YouTube Tags Generator?"
                        />
                    </BlogContainer>

                    <BlogContainer className="flex justify-center">
                        <Container className="mr-2 mt-[3px] ">
                            <BiCircle className="text-sm" />
                        </Container>
                        <TextComponent
                            message={`<green-300>Boost Your SEO:</green-300> <red-200>YouTube's</red-200> search engine optimization (SEO) relies heavily on tags to categorize and recommend content. By using this tool, you ensure that your video is associated with the right keywords, increasing the chances of appearing in search results.`}
                        />
                    </BlogContainer>

                    <BlogContainer className="flex justify-center">
                        <Container className="mr-2 mt-[3px] ">
                            <BiCircle className="text-sm" />
                        </Container>
                        <TextComponent
                            message={`<green-300>Save Time:</green-300> Instead of spending valuable time researching and brainstorming tags, let the <indigo-300>YouTube Tags Generator</indigo-300> do the work for you. This frees up more time for content creation and other important tasks.`}
                        />
                    </BlogContainer>

                    <BlogContainer className="flex justify-center">
                        <Container className="mr-2 mt-[3px] ">
                            <BiCircle className="text-sm" />
                        </Container>
                        <TextComponent
                            message={`<green-300>Increase Viewer Engagement:</green-300> By using the right tags, your video is more likely to reach viewers who are interested in your content, leading to higher engagement rates.`}
                        />
                    </BlogContainer>
                </BlogBoxReg>
            </BlogSection>

            <BlogSection>
                <BlogBoxReg title="Conclusion">
                    <BlogBox
                        className="max-sm:text-center"
                        content={`The <orange-200>YouTube Tags Generator</orange-200> is an essential tool for any
                    YouTube content creator looking to optimize their videos for
                    search and discovery. With its ability to generate relevant
                    and accurate tags based on your video’s title and outline,
                    this tool simplifies the process of SEO optimization,
                    ensuring your content reaches the right audience. Whether
                    you're a seasoned YouTuber or just starting, incorporating
                    this tool into your video production process can
                    significantly enhance your channel's growth and visibility.`}
                    />
                </BlogBoxReg>
            </BlogSection>

            <BlogSection className="max-sm:text-center flex flex-col">
                <BlogContainer>
                    <TextComponent
                        message={`So, the next time you're uploading a video, don't forget to use
                the <blue-200>YouTube Tags Generator</blue-200> to maximize your content's potential
                on YouTube!`}
                    />
                </BlogContainer>

                <BlogContainer className="text-center mt-5">
                    <Link
                        href={handleLink('youtube-tag')}
                        target="_blank"
                        className="underline underline-offset-8 text-blue-400">
                        Youtube Tag Generator
                    </Link>
                </BlogContainer>
            </BlogSection>
        </Blog>
    )
}
