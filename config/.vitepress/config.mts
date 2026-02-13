import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    base: '/',
    srcDir: "../docs",
    title: "LAIKA",
    description: "A Vue/Vite OctoberCMS Bridge.",
    lastUpdated: true,
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/getting-started', activeMatch: '/guide' },
            { text: 'Reference', link: '/reference/overview', activeMatch: '/reference' },
        ],
        sidebar: {
            '/guide': [
                {
                    text: 'Getting Started', 
                    link: '/guide/getting-started',
                },
                {
                    text: 'Configuration', 
                    link: '/guide/configuration',
                },
                {
                    text: 'Differences',
                    items: [
                        { text: 'Templating', link: '/guide/templating/structure' },
                        { text: 'Layouts', link: '/guide/templating/layouts' },
                        { text: 'Pages', link: '/guide/templating/pages' },
                        { text: 'Partials', link: '/guide/templating/partials' },
                        { text: 'Content Blocks', link: '/guide/templating/content-blocks' },
                        { text: 'Components', link: '/guide/templating/components' },
                        { text: 'Snippets', link: '/guide/templating/snippets' },
                    ]
                },
            ],
            '/reference': [
                {
                    text: "Reference",
                    items: [
                        { text: "Overview", link: "/reference/overview" },
                    ]
                },
                {
                    text: 'Components',
                    items: [
                        { text: '&lt;Head /&gt;', link: '/reference/components/head' },
                        { text: '&lt;PageComponent /&gt;', link: '/reference/components/page-component' },
                        { text: '&lt;PageContent /&gt;', link: '/reference/components/page-content' },
                        { text: '&lt;ProgressBar /&gt;', link: '/reference/components/progress-bar' },
                    ]
                },
                {
                    text: 'Runtime API',
                    items: [
                        { text: '$components | useComponent', link: '/reference/runtime/component' },
                        { text: '$laika | useLaika', link: '/reference/runtime/laika' },
                        { text: '$october | useOctober', link: '/reference/runtime/october' },
                        { text: '$payload | usePayload', link: '/reference/runtime/payload' },
                        { text: '$router | useRouter', link: '/reference/runtime/router' },
                    ]
                },
            ],
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/ratmd/laika.js' }
        ],
        search: {
            provider: 'local'
        },
        footer: {
            message: 'This software is not an official OctoberCMS product and is not associated with, sponsored by, or endorsed by OctoberCMS.',
            copyright: 'Copyright © rat.md, Published under MIT License.'
        },
    }
})
