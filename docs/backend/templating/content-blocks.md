---
outline: deep
---

# Content Blocks <DocsBadge path="cms/themes/content.html" />

**Dedicated files for storing and updating page content.**

Content blocks are native October CMS files for reusable or editor-managed content. LAIKA renders
them through October and provides the resulting HTML or text to LAIKA components.

> [!TIP] Difference to Classic Templating
> Classic Twig templates use `{% content 'file.htm' %}`. LAIKA loads a content block with 
> `useOctober().content()`. The helper renders the content file and substitutes its variables, but 
> it does not apply the CMS `|content` post-processing filter used for snippets and CMS links.

## Supported Formats

October content blocks may use `.htm`, `.html`, `.txt` or `.md` file extensions. The extension 
controls how October treats the content in the editor and while rendering it.

```text
content/
├── contact-address.htm
├── legal-notice.txt
└── welcome.md
```

## Loading a Content Block

Load content after the Vue component has mounted:

```vue
<template>
    <article v-if="content" v-html="content" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useOctober } from '@ratmd/laika';

const october = useOctober();
const content = ref('');

onMounted(async () => {
    content.value = await october.content('welcome.md');
});
</script>
```

Use text interpolation instead of `v-html` when the returned value should be displayed as plain text.

## Passing Variables

October content blocks support simple placeholder variables. Pass their values as the second argument:

```vue
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useOctober } from '@ratmd/laika';

const october = useOctober();
const content = ref('');

onMounted(async () => {
    content.value = await october.content('welcome.htm', {
        name: 'Alex',
        website: 'LAIKA',
    });
});
</script>
```

A corresponding content file can use those values:

```html
<h1>Welcome, {name}</h1>
<p>Thank you for visiting {website}.</p>
```

Parameters must be serializable because they are sent to October for rendering.

## Reactive Loading

Watch a reactive value when the content file or its variables should be reloaded:

```vue
<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useOctober } from '@ratmd/laika';

const october = useOctober();
const locale = ref('en');
const content = ref('');

watch(locale, async (value) => {
    content.value = await october.content('welcome.htm', { locale: value });
}, { immediate: true });
</script>
```

Consider loading frequently used content on the server and including it in the initial page payload 
to avoid an additional browser request.

## Trusted HTML

`v-html` inserts the returned markup directly into the document. Only use it with trusted content 
that has been authored or sanitized on the server. Vue does not compile directives or components 
contained in the returned string.

## Content Blocks or Partials?

Use content blocks for editor-managed copy and simple placeholder replacement. Use partials when the 
fragment needs Twig logic, October components, AJAX handlers or the CMS `|content` filter.

## Snippets and CMS Links

`useOctober().content()` does not run October's `|content` filter, so snippet tags and CMS link 
markup are not expanded by that helper. Render such a content block through a server partial that 
applies `|content`; see the [Snippets](./snippets) page for an example.
