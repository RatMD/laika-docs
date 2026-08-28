---
title: 'Link Component'
outline: deep
---

# &lt;Link /&gt;

**Creates links that use LAIKA navigation whenever possible.**

The `<Link />` component renders a regular `<a>` element. Internal links are handled by the LAIKA
router, while external links and links with another target retain the browser's default behaviour.


## Basic Usage

Use the `page` property to generate a URL from an OctoberCMS page name.

```vue
<template>
    <Link page="blog-post" :params="{ slug: post.slug }" class="post-link">
        Read article
    </Link>
</template>

<script lang="ts" setup>
import { Link } from '@ratmd/laika';
</script>
```

Alternatively, use `link` for a relative path or absolute URL.

```vue
<Link link="/contact">Contact</Link>
<Link link="https://example.com" target="_blank">External website</Link>
```


## Available Properties

| Property    | Type      | Default | Description                                                                   |
| ----------- | --------- | ------- | ----------------------------------------------------------------------------- |
| page        | `string`  | —       | OctoberCMS page name used to generate the destination URL.                    |
| params      | `object`  | `{}`    | Route and query parameters used with `page`.                                  |
| persistence | `boolean` | `true`  | Reuses matching parameters from the current route when generating a page URL. |
| link        | `string`  | —       | Relative path or absolute URL used when `page` is not provided.               |
| target      | `string`  | —       | Standard anchor target, such as `_blank`, `_parent` or `_top`.                |

The `page` property takes precedence over `link`. Additional attributes such as `class`, `id`,
`aria-label` and `rel` are forwarded to the generated anchor.

Modified clicks and non-primary mouse-button clicks retain their normal browser behaviour.
