import { BotTypes } from '@/types/bot'

const TemplatesAI = (): BotTypes[] => {
    return [
        /* YOUTUBE */

        {
            name: 'YouTube Tags Generator',
            desc: 'Generates relevant YouTube tags based on your video title and outline, formatted for easy insertion into your video description.',
            category: 'youtube',
            icon: '/youtube/youtube_2.jpg',
            model: 'youtube-tag',
            is_available: true,
            aiPrompt:
                'Generate 10 relevant YouTube tags in bullet points based on the provided title and outline. Format tags for rich text editor insertion.',
            input_label:
                'Enter the title and outline for generating YouTube tags.'
        },

        {
            name: 'YouTube SEO Optimizer',
            desc: 'Optimizes YouTube video titles, descriptions, and tags to enhance SEO performance and visibility.',
            category: 'youtube',
            icon: '/youtube/youtube_1.jpg',
            model: 'youtube-seo-optimizer',
            is_available: true,
            aiPrompt:
                'Generate optimized YouTube titles, descriptions, and tags based on provided keywords and outline for better SEO performance.',
            input_label:
                'Enter keywords, outline, and specific preferences for SEO optimization.'
        },

        {
            name: 'Advanced YouTube Video Structuring and SEO',
            desc: 'Develop a comprehensive and optimized YouTube video blueprint that dynamically adapts to video length, content type, and audience goals. This model provides a complete video script, SEO-optimized title, description, hashtags, and personalized insights to maximize engagement and performance.',
            category: 'content-creation',
            is_available: true,
            icon: '/youtube/youtube_1.jpg',
            model: 'advanced-youtube-optimized-video',
            aiPrompt: `Generate a sophisticated and optimized YouTube video structure based on these inputs:
        
            **Inputs:**
            - **Video Length in Minutes**
            - **Video Type**
            - **Video Topic**
            - **Target Audience**
        
            **Output Requirements:**
        
            1. **Customized Video Structure**:
               - **Intro & Hook**: Design an engaging hook to captivate attention immediately. Tailor it to the audience and content type for maximum relevance.
               - **Introduction**: Suggest a compelling intro that sets expectations and introduces the host. Establish trust and encourage viewer engagement.
               - **Main Content Sections**: Organize content into coherent sections based on video length and type, ensuring smooth transitions.
               - **Engagement Prompts**: Integrate natural breaks to remind viewers to like, subscribe, or comment, tailored to the audience.
               - **Call-to-Action (CTA)**: Craft a persuasive CTA motivating specific actions, aligned with the video's goals.
               - **Outro**: Recap key points and offer closing thoughts or resources, encouraging continued engagement.
        
            2. **Title Optimization**:
               - Create 3 unique, SEO-friendly titles designed to boost CTR and virality. Include keyword research and curiosity-driven hooks.
               - Explain the effectiveness of each title and its target audience (e.g., tutorial seekers, entertainment viewers).
        
            3. **Description Optimization**:
               - Generate a professional description that includes:
                 - A concise overview.
                 - Key highlights and clickable timestamps.
                 - SEO keywords for enhanced discoverability.
                 - A strong CTA to improve retention and engagement.
        
            4. **Hashtag and Keyword Optimization**:
               - Provide 5-10 niche-specific and trending hashtags.
               - Suggest 5-7 SEO-rich keywords and explain their role in boosting search performance.
        
            5. **Personalized Video Insights**:
               - Offer tips for improving audience retention, such as pacing and transitions.
               - Suggest complementary content ideas for platforms like Instagram or TikTok.
               - Recommend optimal upload times based on audience engagement patterns.
        
            6. **Bonus Optimization Tips (Optional)**:
               - Provide ideas for creating a visually compelling thumbnail with 3 actionable tips.
               - Recommend ways to enhance audio quality and visual appeal for a professional look.
        
            This model adapts to video length, type, topic, and audience, ensuring optimal performance for high engagement and discoverability on YouTube and other platforms.`,
            input_label: 'Enter your video topic (e.g., How to make pizza)'
        },

        /* YOUTUBE */

        // {
        //   name: "Rewrite Article (Plagiarism Free)",
        //   desc: "Use this tool to rewrite existing Article or Blog Post which can bypass AI detectors and also make it plagiarism free.",
        //   icon: "https://cdn-icons-png.flaticon.com/128/3131/3131607.png",
        //   category: "Rewriting Tool",
        //   model: "rewrite-article",
        //   aiPrompt:
        //     "Rewrite give article without any Plagiarism in rich text editor format",
        //   form: [
        //     {
        //       label:
        //         "🤖 Provide your Article/Blogpost or any other content to rewrite.",
        //       field: "textarea",
        //       name: "article",
        //       required: true,
        //     },
        //   ],
        // },

        // {
        //   name: "Text Improver",
        //   desc: "This handy tool refines your writing, eliminating errors and redundancies for a clear, readable result. It also offers a comprehensive tone analysis and suggests better word choices.",
        //   icon: "https://cdn-icons-png.flaticon.com/128/1686/1686815.png",
        //   category: "Writing Assistant",
        //   model: "text-improver",
        //   aiPrompt:
        //     "Given textToImprove, Rewrite text without any grammar mistake and professionally in rich text editor format",
        //   form: [
        //     {
        //       label: "Enter text that you want to re-write or improve",
        //       field: "textarea",
        //       name: "textToImprove",
        //     },
        //   ],
        // },

        // {
        //   name: "Add Emojis to Text",
        //   desc: "An AI tool that serves as your personal blog post title writer, generating catchy and viral-worthy titles in your chosen language.",
        //   icon: "https://cdn-icons-png.flaticon.com/128/2584/2584606.png",
        //   category: "blog",
        //   model: "add-emoji-to-text",
        //   aiPrompt:
        //     "Add Emoji to outline text depends on outline and rewrite it in rich text editor format",
        //   form: [
        //     {
        //       label: "Enter your text to add emojis",
        //       field: "textarea",
        //       name: "outline",
        //       required: true,
        //     },
        //   ],
        // },

        {
            name: 'Instagram Post Generator',
            desc: 'An AI tool that generates engaging and viral Instagram posts based on given keywords. Perfect for crafting compelling content that captures attention and drives engagement.',
            icon: '/insta/insta_1.jpg',
            category: 'social-media',
            is_available: true,
            model: 'instagram-post-generator',
            aiPrompt: `Generate 3 Instagram posts based on the provided keywords. Each post should include a catchy caption and relevant hashtags, formatted for easy insertion into Instagram. Ensure the content is engaging, aligns with current trends, and is tailored to attract your target audience.
        
            **Inputs:**
            - **Keywords**: .
        
            **Output Requirements:**
            - **Post 1**: Caption with engaging content, relevant emojis, and hashtags.
            - **Post 2**: Caption with engaging content, relevant emojis, and hashtags.
            - **Post 3**: Caption with engaging content, relevant emojis, and hashtags.`,
            input_label: 'Enter Keywords for your post'
        },

        {
            name: 'Advanced Instagram Content Creator',
            desc: 'Create high-performing Instagram posts with optimized captions, hashtags, and visual content suggestions tailored to your niche and goals.',
            icon: '/insta/insta_1.jpg',
            category: 'instagram',
            model: 'advanced-instagram-content-creator',
            is_available: true,
            aiPrompt: `
              Generate a comprehensive and engaging Instagram post concept based on the following inputs:
              
              **Inputs:**
              - **Topic**: The main subject or theme of the post (e.g., Healthy Eating, Travel Tips).
              - **Niche/Industry**: The specific niche or industry related to the post (e.g., Fitness, Technology).
              - **Post Objective**: The goal you want to achieve with this post (e.g., increase engagement, drive sales).
              - **Audience Profile**: The target audience characteristics (e.g., age group, interests, location).
              - **Content Theme**: The overall theme or mood of the post (e.g., inspirational, informative, entertaining).
              - **Boost Post**: boost post like get best comment,more likes,more add story .
              
              **Output Requirements:**
              1. **Creative Concept & Idea**: A unique and trending post idea tailored to the specified topic and niche, ensuring relevance and appeal to the target audience.
              2. **Post Picture**: Create post picture or cover (no required)
              3. **Post time**: Time to post based on user input and appropriate time for audience
              4. **Compelling Caption**: 
                  - A strong hook to grab attention.
                  - A persuasive message aligned with the post's objective.
                  - A clear call-to-action (CTA) to encourage engagement.
              5. **Hashtag Optimization**: 
                  - Generate 20-25 relevant and trending hashtags to maximize reach and visibility.
              6. **Visual Content Suggestions**: 
                  - Recommend the best visual format (e.g., Carousel, Reel, IGTV) based on the topic and audience.
                  - Provide tips for creating high-quality visual content.
              7. **Optimal Posting Strategy**: 
                  - Suggest the best times to post for maximum engagement based on the audience profile and topic.
              8. **Post-Engagement Strategy**: 
                  - Provide tips for boosting post-engagement after publishing.
                  - Recommend how to track and measure the success of the post.
              `,
            input_label: 'Enter your topic post'
        },

        {
            name: 'Instagram Story Ideas Generator',
            desc: 'An AI tool for generating creative and engaging Instagram Story ideas based on your input. Perfect for enhancing your Instagram presence with fresh and interactive content.',
            icon: '/insta/insta_1.jpg',
            category: 'social-media',
            is_available: true,
            model: 'instagram-story-ideas-generator',
            aiPrompt: `Provide 5 creative and interactive Instagram Story ideas based on the given topic. Each idea should include suggestions for visuals, text overlays, and interactive elements (e.g., polls, quizzes). Ensure the ideas are engaging and align with Instagram’s best practices for Stories.
        
            **Inputs:**
            - **Topic**: .
        
            **Output Requirements:**
            - **Story Idea 1**: Description of the story idea, including suggested visuals, text overlays, and interactive elements.
            - **Story Idea 2**: Description of the story idea, including suggested visuals, text overlays, and interactive elements.
            - **Story Idea 3**: Description of the story idea, including suggested visuals, text overlays, and interactive elements.
            - **Story Idea 4**: Description of the story idea, including suggested visuals, text overlays, and interactive elements.
            - **Story Idea 5**: Description of the story idea, including suggested visuals, text overlays, and interactive elements.`,
            input_label: 'Enter the topic for your Instagram Stories'
        },

        {
            name: 'Instagram Engagement Boost Strategies',
            desc: 'An AI tool that provides actionable strategies to increase engagement on your Instagram posts and Stories. Ideal for improving visibility and interaction with your content.',
            icon: '/insta/insta_1.jpg',
            category: 'social-media',
            is_available: true,
            model: 'instagram-engagement-boost-strategies',
            aiPrompt: `Provide 5 actionable strategies to boost engagement on Instagram posts and Stories. Each strategy should include specific actions to take, best practices to follow, and tips for measuring success.
        
            **Inputs:**
            - **Current Engagement Metrics**: .
            - **Content Type**: .
            - **Video Topic**: .
        
            **Output Requirements:**
            - **Strategy 1**: Detailed action plan, best practices, and success measurement tips.
            - **Strategy 2**: Detailed action plan, best practices, and success measurement tips.
            - **Strategy 3**: Detailed action plan, best practices, and success measurement tips.
            - **Strategy 4**: Detailed action plan, best practices, and success measurement tips.
            - **Strategy 5**: Detailed action plan, best practices, and success measurement tips.`,
            input_label: 'Enter your video topic'
        }

        /**
         * SITE
         */

        /**
         * SITE
         */

        // {
        //   name: "Instagram Hash Tag Generator",
        //   desc: "An AI tool that serves as your personal blog post title writer, generating catchy and viral-worthy titles in your chosen language.",
        //   icon: "https://cdn-icons-png.flaticon.com/128/7045/7045432.png",
        //   category: "blog",

        //   model: "instagram-hash-tag-generator",
        //   aiPrompt:
        //     "Generate 15 Instagram hash tag depends on a given keywords and give output in  in rich text editor format",
        //   form: [
        //     {
        //       label: "Enter Keywords for your instagram hastag",
        //       field: "input",
        //       name: "keywords",
        //       required: true,
        //     },
        //   ],
        // },

        // {
        //   name: "Instagram Post/Reel Idea",
        //   desc: "An AI tool that generate New and trending instagram idea depends on your niche",
        //   icon: "https://cdn-icons-png.flaticon.com/128/1029/1029183.png",
        //   category: "instagram",

        //   model: "instagram-post-idea-generator",
        //   aiPrompt:
        //     "Generate 5-10 Instagram idea depends on niche with latest trend and give output in  in rich text editor format",
        // },

        // {
        //   name: "English Grammer Check",
        //   desc: "AI Model to Correct your english grammer by providing the text",
        //   icon: "https://cdn-icons-png.flaticon.com/128/12596/12596700.png",
        //   category: "english",

        //   model: "english-grammer-checker",
        //   aiPrompt:
        //     "Rewrite the inputText by correcting the grammer and give output in  in rich text editor format",
        //   form: [
        //     {
        //       label: "Enter text to correct the grammer",
        //       field: "input",
        //       name: "inputText",
        //       required: true,
        //     },
        //   ],
        // },

        // {
        //   name: "Write Code",
        //   desc: "AI Model to generate programming code in any language",
        //   icon: "https://cdn-icons-png.flaticon.com/128/6062/6062646.png",
        //   category: "Coding",

        //   model: "write-code",
        //   aiPrompt:
        //     "Depends on user codeDescription write a code and give output in  in rich text editor format in code block ",
        //   form: [
        //     {
        //       label:
        //         "Enter description of code you want along with Programming Lang",
        //       field: "textarea",
        //       name: "codeDesscripton",
        //       required: true,
        //     },
        //   ],
        // },

        // {
        //   name: "Explain Code",
        //   desc: "AI Model to explain programming code in any language",
        //   icon: "https://cdn-icons-png.flaticon.com/128/8488/8488751.png",
        //   category: "Coding",

        //   model: "explain-code",
        //   aiPrompt:
        //     "Depends on user codeDescription explain code line by line and give output in  in rich text editor format in code block ",
        //   form: [
        //     {
        //       label: "Enter code which you want to understand",
        //       field: "textarea",
        //       name: "codeDesscripton",
        //       required: true,
        //     },
        //   ],
        // },

        // {
        //   name: "Code Bug Detector",
        //   desc: "This tool analyzes your input, like error messages and code snippets, to pinpoint and fix bugs, offering detailed solutions and alternatives in a straightforward, user-friendly way.",
        //   icon: "https://cdn-icons-png.flaticon.com/128/4426/4426267.png",
        //   category: "code-bug-detector",

        //   model: "code-bug-detector",
        //   aiPrompt:
        //     "Depends on user codeInput find bug in code and give solution and give output in  in rich text editor format in code block ",
        //   form: [
        //     {
        //       label: "Enter code which you want to test bug",
        //       field: "textarea",
        //       name: "codeInput",
        //       required: true,
        //     },
        //   ],
        // },

        // {
        //   name: "Tagline Generator",
        //   desc: "Struggling to find the perfect tagline for your brand? Let our AI-tool assist you in creating a tagline that stands out.",
        //   icon: "https://cdn-icons-png.flaticon.com/128/2178/2178616.png",
        //   category: "Marketting",

        //   model: "tagline-generator",
        //   aiPrompt:
        //     "Depends on user productName and outline generate catchy 5-10 tagline for the business product and give output  in rich text editor format ",
        //   form: [
        //     {
        //       label: "Product/Brand Name",
        //       field: "input",
        //       name: "productName",
        //       required: true,
        //     },
        //     {
        //       label: "What you are selling / Marketting",
        //       field: "textarea",
        //       name: "outline",
        //       required: true,
        //     },
        //   ],
        // },

        // {
        //   name: "Product Description",
        //   desc: "This is your AI-powered SEO expert, creating captivating and keyword-rich e-commerce product descriptions to boost your online sales.",
        //   icon: "https://cdn-icons-png.flaticon.com/128/679/679922.png",
        //   category: "Marketting",

        //   model: "product-description",
        //   aiPrompt:
        //     "Depends on user productName and description generate small description for product for e-commer business give output  in rich text editor format  ",
        //   form: [
        //     {
        //       label: "Product Name",
        //       field: "input",
        //       name: "productName",
        //       required: true,
        //     },
        //     {
        //       label: "Product Details",
        //       field: "textarea",
        //       name: "outline",
        //       required: true,
        //     },
        //   ],
        // },
    ]
}

export default TemplatesAI
