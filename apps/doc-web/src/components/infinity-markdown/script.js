import { httpClientForDocument } from '@app/net/httpClient';
const hljs = require('highlight.js');
const md = require('markdown-it')({
    html: true,
    xhtmlOut: true,
    breaks: true,
    langPrefix: 'language-',
    linkify: true,
    typographer: true,
    quotes: '“”‘’',
    highlight: function(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' + hljs.highlight(lang, str, true).value + '</code></pre>';
            } catch (__) {}
        }
        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
});

export default {
    data() {
        return {};
    },
    mounted() {
        if (this.markdownUrl !== '') {
            this.fetchAndRenderMarkdown(this.markdownUrl);
        } else {
            this.renderMarkdown(this.markdownText, this.$el);
        }
    },
    methods: {
        async fetchAndRenderMarkdown(url) {
            const res = await httpClientForDocument.get(url);
            this.renderMarkdown(res, this.$el);
        },
        renderMarkdown(markdownContent, node) {
            const result = md.render(markdownContent);
            node.innerHTML = result;
        }
    },
    props: {
        markdownText: {
            type: String,
            default: ''
        },
        markdownUrl: {
            type: String,
            default: ''
        }
    }
};
