import {
    GenerationConfig,
    GoogleGenerativeAI,
    HarmBlockThreshold,
    HarmCategory
} from '@google/generative-ai'

const generationConfig: GenerationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'text/plain'
}

const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ''
)
const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    safetySettings: [
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE
        },
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE
        }
        // Add more safety settings as needed
    ],
    generationConfig
})
const chatSession = model.startChat({
    generationConfig
    // history: [
    //   {
    //     role:"user",
    //     parts:[
    //       {
    //         text:"hi"
    //       }
    //     ]
    //   }
    // ],
})

export { model, chatSession }
