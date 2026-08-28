---
outline: deep
---

# Collection <DocsBadge path="cms/components/collection.html" />

**Adds a collection of model records to the page.**

The `[collection]` component loads entries from a Tailor section. In a LAIKA theme, the query is
executed on the server while the page payload is built and the resulting records are exposed through
the component alias.

> [!TIP] Difference to Classic Templating
> Classic Twig exposes a smart component variable that can build queries while rendering. LAIKA
> cannot pass that PHP query object to Vue, so query operations, relationships and pagination are
> configured in the `<october>` block before the result is serialized.

## Available Properties

| Property    | Description |
| ----------- | ----------- |
| handle      | Handle of the Tailor entry blueprint. |
| as          | Name of the result inside the component properties. Defaults to `items`. |
| relations   | Relationships to eager-load before serializing the records. |
| paginate    | Use `first`, `last`, `nested` or a positive number. Leave empty to return every matching record. |
| where       | Query method declarations applied in their configured order. |
| whereParams | Named values referenced by `$name` placeholders in `where` declarations. Missing values fall back to query-string parameters. |

October's native component also defines `recordsPerPage`, `pageNumber`, `sortColumn` and
`sortDirection`. LAIKA's current payload resolver builds the query directly and uses `paginate` and
`where` instead of those native properties.

## Basic Usage

This example loads blog posts, includes their authors and orders them before adding the result to the
payload as `posts`:

```vue
<october>
[collection blog]
handle = "Blog\Post"
as = posts
relations[] = author
where[] = "orderBy,published_at,desc"
</october>

<template>
    <article v-for="post in posts" :key="post.id">
        <h2>{{ post.title }}</h2>
    </article>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useComponent } from '@ratmd/laika';

const blog = useComponent('blog');
const posts = computed(() => blog.get('posts', []));
</script>
```

Setting `paginate` to a positive number returns October's serialized pagination result. The records
are then available inside its `data` property.

