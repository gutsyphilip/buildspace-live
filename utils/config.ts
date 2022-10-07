export const SITE_INFO = {
    id: 'buildspacelive',
    name: 'Buildspace Live',
    title: 'Buildspace Live',
    description: "Generate image assets for your design projects using text prompts. All without leaving Figma.",
    url: 'https://stablepixel.com',
    image: 'https://stablepixel.com/meta.png',
    twitter:'@gutsyphilip'
}

const env = process.env.NEXT_PUBLIC_APP_ENV || process.env.NODE_ENV
export const IS_PRODUCTION = env === 'production'

export const STREAM_PLAYBACK_URL = process.env.NEXT_PUBLIC_PLAYBACK_URL;
export const PUBLIC_CHAT_TOKEN = process.env.NEXT_PUBLIC_CHAT_TOKEN;
export const PUBLIC_CHAT_ENDPOINT = process.env.NEXT_PUBLIC_CHAT_ENDPOINT;
export const BUILDSPACE_WS_ACCESS_KEY_ID = process.env.BUILDSPACE_AWS_ACCESS_KEY_ID;
export const BUILDSPACE_AWS_SECRET_ACCESS_KEY = process.env.BUILDSPACE_AWS_SECRET_ACCESS_KEY;


