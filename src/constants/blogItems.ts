import { BlogItemsType } from '@/types/blog'
import { createBlog } from '@/utils/blogCreated'

const BlogItems: BlogItemsType[] = [
    createBlog({
        author: 'nima',
        description: 'create tags for youtube videos',
        grouping: 'model',
        link: 'youtube-tags-generator',
        title: 'Youtube Tags Generator',
        page_title:
            "YouTube Tags Generator: A Must-Have Tool for Boosting Your Video's Discoverability"
    }),

    createBlog({
        author: 'nima',
        description: 'youtube seo optimizer for youtube video',
        grouping: 'model',
        link: 'youtube-seo-optimizer',
        title: 'Youtube Tags Generator',
        page_title:
            "YouTube SEO Optimizer: Enhance Your Video's Visibility with AI-Driven Optimization"
    }),

    createBlog({
        author: 'nima',
        description:
            "Maximize your YouTube video's potential with the Advanced YouTube Video Structuring and SEO tool",
        grouping: 'model',
        link: 'advanced-youtube-optimized-video',
        title: 'Advanced Youtube Optimized Video',
        page_title:
            'Elevate Your YouTube Content with Advanced Video Structuring and SEO'
    }),

    createBlog({
        author: 'nima',
        description:
            'Effortlessly generate engaging and viral Instagram posts with the Instagram Post Generator, perfect for boosting your social media presence with trend-aligned content.',
        grouping: 'model',
        link: 'instagram-post-generator',
        title: 'Instagram Post Generator',
        page_title:
            'Instagram Post Generator: Elevate Your Social Media Presence'
    }),

    createBlog({
        author: 'nima',
        description:
            'Effortlessly generate engaging and viral Instagram posts with the Instagram Post Generator, perfect for boosting your social media presence with trend-aligned content.',
        grouping: 'model',
        link: 'advanced-instagram-content-creator',
        title: 'Advanced Instagram Content Creator',
        page_title:
            'Advanced Instagram Content Creator: Elevate Your Instagram Strategy'
    }),

    createBlog({
        author: 'nima',
        description:
            'Generate engaging Instagram Stories with ease using our AI-powered tool, which provides creative ideas, visual suggestions, and interactive elements tailored to your topic.',
        grouping: 'model',
        link: 'instagram-story-ideas-generator',
        title: 'Instagram Story Ideas Generator',
        page_title:
            'Elevate Your Instagram Presence with the Instagram Story Ideas Generator'
    }),

    createBlog({
        author: 'nima',
        description:
            'Generate engaging Instagram Stories with ease using our AI-powered tool, which provides creative ideas, visual suggestions, and interactive elements tailored to your topic.',
        grouping: 'model',
        link: 'instagram-story-ideas-generator',
        title: 'Instagram Story Ideas Generator',
        page_title:
            'Elevate Your Instagram Presence with the Instagram Story Ideas Generator'
    })
]

export default BlogItems
