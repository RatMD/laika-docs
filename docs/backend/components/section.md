---
outline: deep
---

# Section <DocsBadge path="cms/components/section.html" />

**Define a website section with a dedicated URL.**

The `[section]` component loads a single Tailor entry using its blueprint handle and a URL parameter
or fixed identifier. In a LAIKA theme, declare it in the `<october>` block of a page or layout and
read the resolved entry through its component alias.

> [!TIP] Difference to Classic Templating
> Classic Twig receives a smart component variable that can expose fields or start database queries.
> LAIKA resolves the primary entry on the server and serializes its fields into the component payload.
> Use `relations[]` to include related records needed by Vue.

## Available Properties

| Property   | Description |
| ---------- | ----------- |
| handle     | Handle of the Tailor entry blueprint. |
| identifier | Field used to locate the entry: `slug`, `fullslug` or `id`. Defaults to `slug`. |
| value      | Fixed or external lookup value. When omitted, LAIKA uses the matching URL parameter. |
| isDefault  | Makes the page the default preview page for entries from this section. |
| relations  | LAIKA extension that eager-loads related records before serializing the entry. |

## Basic Usage

The following page loads a blog post from the `:slug` URL parameter:

```vue
<october>
url = "/blog/:slug"

[section post]
handle = "Blog\Post"
relations[] = author
</october>

<template>
    <article v-if="post.get('id')">
        <h1>{{ post.get('title', '') }}</h1>
        <p>{{ post.get('summary', '') }}</p>
    </article>
</template>

<script lang="ts" setup>
import { useComponent } from '@ratmd/laika';

const post = useComponent('post');
</script>
```

