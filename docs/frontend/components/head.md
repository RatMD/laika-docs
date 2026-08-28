---
title: 'Head Component'
outline: deep
---

# &lt;Head /&gt;

**Adds reactive elements to the document `<head>`.**

The `<Head />` component teleports its contents to the document head. Its contents are refreshed
when the active page changes, making it useful for page-specific meta tags, links and structured
data.


## Basic Usage

```vue
<template>
    <Head>
        <meta property="og:title" :content="$page.title">
        <meta property="og:url" :content="$page.url">
    </Head>
</template>

<script lang="ts" setup>
import { Head } from '@ratmd/laika';
</script>
```

LAIKA already manages the document title and the head elements supplied by OctoberCMS. Use
`<Head />` for additional elements owned by your Vue component.


## Available Properties

| Property | Type                 | Description                                                            |
| -------- | -------------------- | ---------------------------------------------------------------------- |
| watchKey | `string` or `number` | Forces the teleported contents to be recreated when the value changes. |

When `watchKey` is omitted, LAIKA uses the current page ID or URL as the reset key.

```vue
<Head :watch-key="article.id">
    <meta property="og:title" :content="article.title">
</Head>
```
