---
outline: deep
---

# Snippets <DocsBadge path="cms/themes/snippets.html" />

**Bridge the gap between developers and publishers.**

Snippets are reusable content elements that publishers can insert into rich-text and Markdown
content. They remain a native October CMS feature and are processed on the server. LAIKA provides
the resulting markup to LAIKA components without replacing October's snippet definitions or editor
workflow.

> [!TIP] Difference to Classic Templating
> Classic Twig renders a content block and applies the `|content` filter, which expands snippets and 
> CMS links. LAIKA's `useOctober().content()` helper renders the content file without that 
> post-processing step. Content containing snippets should be processed in a server partial and then 
> rendered in Vue.

## Creating Snippets

October snippets can be based on a CMS partial or an October component. Their names, properties and 
editor controls are defined using October's normal snippet configuration.

Use a partial-based snippet for reusable Twig markup. Use a component-based snippet when the block 
needs component properties, server lifecycle behavior or AJAX handlers.

## Snippet Properties

Properties configured by an editor are passed to the snippet when October processes the content. 
Keep property names stable and provide sensible defaults so existing page-builder content remains 
valid when the snippet evolves.

The snippet is resolved entirely on the server. Vue receives only the resulting HTML, not the 
snippet definition or its property editor.

## Rendering Snippets in LAIKA

Create a small classic partial that renders the requested content block and applies October's 
`content` filter:

```twig
{# partials/content/render.htm #}
{{ content(contentFile, parameters)|content }}
```

Then render that partial from Vue:

```vue
<template>
    <ServerPartial
        name="content/render"
        :parameters="{
            contentFile: 'article.htm',
            parameters: { section: 'news' },
        }"
    />
</template>

<script lang="ts" setup>
import { ServerPartial } from '@ratmd/laika';
</script>
```

October loads the content file, replaces its variables, expands snippets and CMS links with 
`|content`, and returns the finished HTML to LAIKA.

## Programmatic Rendering

The same bridge partial can be loaded with `useOctober().renderPartial()` when you need to control 
the response yourself:

```vue
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useOctober } from '@ratmd/laika';

const october = useOctober();
const html = ref('');

onMounted(async () => {
    html.value = await october.renderPartial('content/render', {
        contentFile: 'article.htm',
        parameters: {},
    });
});
</script>
```

Render the result with `v-html` only when the server content is trusted.

## Component Snippets and AJAX

A component-based snippet runs on the October side while the content is processed. Server-rendered 
output is returned normally. For interactive behavior, expose an October AJAX handler and call it 
through LAIKA's request API, or enhance the result with a dedicated Vue component.

Classic `data-request` attributes may remain in the returned markup, but a Vue-first implementation 
should call the handler explicitly so loading, errors and client state stay under component control.

## Limitations

- `useOctober().content()` alone does not expand snippets or CMS links.
- Returned snippet markup is HTML; Vue does not compile Vue directives or components inside it.
- Snippet definitions and editor metadata are not part of the LAIKA payload.
- Components that Vue must access through `useComponent` need to be declared on the page or layout, not only inside a partial or snippet.
