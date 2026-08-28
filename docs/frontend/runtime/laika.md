---
outline: deep
---

# $laika / useLaika()

**Provides access to the active LAIKA runtime.**

Use `$laika` inside Vue templates or `useLaika()` inside `<script setup>` and other Composition API
contexts.

> [!NOTE]
> This is a low-level API. Prefer the focused payload, router and OctoberCMS composables for normal
> page development.

## Basic Usage

```vue
<template>
    <p>Current component: {{ $laika.payload?.page.component }}</p>
</template>

<script lang="ts" setup>
import { useLaika } from '@ratmd/laika';

const laika = useLaika();
console.log(laika.payload?.page.url);
</script>
```


## Runtime Properties

| Property  | Description                                    |
| --------- | ---------------------------------------------- |
| component | Currently resolved Vue page component.         |
| payload   | Current LAIKA payload.                         |
| layout    | Pending or active runtime layout value.        |
| key       | Current page-component render key.             |
| title     | Callback used to transform the document title. |
| resolver  | Callback used to resolve Vue page components.  |

## Runtime Methods

| Method              | Description                                            |
| ------------------- | ------------------------------------------------------ |
| `getLayout()`       | Returns the current runtime layout value.              |
| `setLayout(layout)` | Sets a layout override consumed by the LAIKA renderer. |
