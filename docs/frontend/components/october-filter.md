---
title: 'OctoberFilter Component'
outline: deep
---

# &lt;OctoberFilter /&gt;

**Processes text using an OctoberCMS Markdown filter.**

The `<OctoberFilter />` component sends a string to an OctoberCMS Markdown filter and renders the
returned HTML. It refreshes automatically when the selected filter or input value changes.

> [!WARNING]
> Filtered content is inserted using `innerHTML`. Select the appropriate safe or cleaning filter
> whenever the source may contain untrusted content.

## Basic Usage

```vue
<template>
    <OctoberFilter name="md_safe" :value="article.content" />
</template>

<script lang="ts" setup>
import { OctoberFilter } from '@ratmd/laika';
</script>
```

The processed HTML is rendered inside a `<div>` by default.

## Available Properties

| Property | Type                                       | Default | Description                                        |
| -------- | ------------------------------------------ | ------- | -------------------------------------------------- |
| name     | `md`, `md_safe`, `md_clean` or `md_indent` | —       | Required OctoberCMS Markdown filter.               |
| value    | `string`                                   | `''`    | Source content passed to the filter.               |
| tag      | `string`                                   | `div`   | HTML element used to contain the processed output. |

```vue
<OctoberFilter
    name="md_safe"
    :value="article.content"
    tag="article"
/>
```

## Custom Rendering

Use the default slot to control how loading, error and result states are displayed.

```vue
<OctoberFilter name="md" :value="article.content">
    <template #default="{ value, pending, error, refresh }">
        <p v-if="pending">Rendering content...</p>
        <p v-else-if="error">{{ error.message }}</p>
        <div v-else v-html="value"></div>

        <button type="button" @click="refresh">
            Refresh
        </button>
    </template>
</OctoberFilter>
```

The default slot receives the following properties.

| Property | Type                  | Description                                        |
| -------- | --------------------- | -------------------------------------------------- |
| value    | `string`              | HTML returned by the selected OctoberCMS filter.   |
| pending  | `boolean`             | Whether the filter request is currently running.   |
| error    | `Error` or `null`     | Error returned by the most recent request.         |
| refresh  | `() => Promise<void>` | Runs the filter again with the current properties. |

Without a slot, the generated element receives `data-loading="true"` while the request is pending
and a `data-error` attribute when the request fails.
