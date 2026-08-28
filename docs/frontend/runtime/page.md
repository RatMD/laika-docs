---
outline: deep
---

# $page / usePage()

**Provides reactive access to the current OctoberCMS page.**

Use `$page` inside Vue templates or `usePage()` inside Composition API code.

## Basic Usage

A generic type can describe properties assigned to the page by OctoberCMS or its components.

```vue
<template>
    <h1>{{ $page.title }}</h1>
</template>

<script lang="ts" setup>
import { usePage } from '@ratmd/laika';

interface PageProps {
    heading?: string;
}

const page = usePage<PageProps>();
console.log(page.value?.props.heading);
</script>
```

## Page Properties

The ref returned by `usePage()` updates when navigation swaps or patches the page payload.

| Property     | Description                                                      |
| ------------ | ---------------------------------------------------------------- |
| id           | OctoberCMS page identifier.                                      |
| url          | Current request URL.                                             |
| file         | Source page filename.                                            |
| component    | Vue component name resolved for the page.                        |
| props        | Properties assigned to the page.                                 |
| layout       | Active layout identifier.                                        |
| theme        | Active theme identifier.                                         |
| locale       | Current page locale.                                             |
| title        | Page title.                                                      |
| head         | Server-provided document-head elements.                          |
| flash        | Current `info`, `error`, `success` and `warning` flash messages. |
| content      | Server-rendered page content.                                    |
| placeholders | Values assigned to OctoberCMS placeholders.                      |
