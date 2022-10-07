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

