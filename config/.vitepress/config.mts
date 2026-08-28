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
            { text: 'Backend', link: '/backend/getting-started', activeMatch: '/backend' },
            { text: 'Frontend', link: '/frontend/overview', activeMatch: '/frontend' },
        ],
        sidebar: {
            '/backend': [
                {
                    text: 'Getting Started', 
                    link: '/backend/getting-started',
                },
                {
                    text: 'Templating',
                    items: [
                        { text: 'Themes', link: '/backend/templating/themes' },
                        { text: 'Layouts', link: '/backend/templating/layouts' },
                        { text: 'Pages', link: '/backend/templating/pages' },
                        { text: 'Partials', link: '/backend/templating/partials' },
                        { text: 'Content Blocks', link: '/backend/templating/content-blocks' },
                        { text: 'Components', link: '/backend/templating/components' },
                        { text: 'Snippets', link: '/backend/templating/snippets' },
                    ],
                    collapsed: true
                },
                {
                    text: 'Components',
                    items: [
                        { text: '[section]', link: '/backend/components/section' },
                        { text: '[collection]', link: '/backend/components/collection' },
                        { text: '[global]', link: '/backend/components/global' },
                        { text: '[resources]', link: '/backend/components/resources' },
                        { text: '[sitePicker]', link: '/backend/components/site-picker' },
                    ],
                    collapsed: true
                },
            ],
            '/frontend': [
                {
                    text: "Frontend",
                    items: [
                        { text: "Overview", link: "/frontend/overview" },
                        { text: "Getting Started", link: "/frontend/getting-started" },
                    ]
                },
                {
                    text: 'Components',
                    items: [
                        { text: '&lt;Flash /&gt;', link: '/frontend/components/flash' },
                        { text: '&lt;Head /&gt;', link: '/frontend/components/head' },
                        { text: '&lt;Link /&gt;', link: '/frontend/components/link' },
                        { text: '&lt;OctoberFilter /&gt;', link: '/frontend/components/october-filter' },
                        { text: '&lt;PageComponent /&gt;', link: '/frontend/components/page-component' },
                        { text: '&lt;PageContent /&gt;', link: '/frontend/components/page-content' },
                        { text: '&lt;ProgressBar /&gt;', link: '/frontend/components/progress-bar' },
                        { text: '&lt;ServerPartial /&gt;', link: '/frontend/components/server-partial' },
                    ],
                    collapsed: true
                },
                {
                    text: 'Runtime API',
                    items: [
                        { text: '$laika | useLaika', link: '/frontend/runtime/laika' },
                        { text: '$router | useRouter', link: '/frontend/runtime/router' },
                        { text: '$payload | usePayload', link: '/frontend/runtime/payload' },
                        { text: '$site | useSite', link: '/frontend/runtime/site' },
                        { text: '$theme | useTheme', link: '/frontend/runtime/theme' },
                        { text: '$page | usePage', link: '/frontend/runtime/page' },
                        { text: '$components | useComponent', link: '/frontend/runtime/component' },
                        { text: '$october | useOctober', link: '/frontend/runtime/october' },
                        { text: '$shared | useShared', link: '/frontend/runtime/shared' },
                        { text: 'useOctoberFilter', link: '/frontend/runtime/october-filter' },
                        { text: 'getProgressBar', link: '/frontend/runtime/progress-bar' },
                    ],
                    collapsed: true
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
