---
outline: deep
---

# useOctoberFilter()

**Processes reactive text using an OctoberCMS Markdown filter.**

`useOctoberFilter()` watches its filter name and source value, runs the server-side filter and
exposes readonly result, loading and error refs.

## Basic Usage

```vue
<template>
    <p v-if="markdown.pending.value">Rendering...</p>
    <p v-else-if="markdown.error.value">
        {{ markdown.error.value.message }}
    </p>
    <div v-else v-html="markdown.value.value"></div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useOctoberFilter } from '@ratmd/laika';

const source = ref('# Hello LAIKA');
const markdown = useOctoberFilter('md_safe', source);
</script>
```


## Arguments

Both arguments accept Vue refs and getter functions. Changing either value refreshes the result
automatically.

| Argument | Type                                       | Description                                              |
| -------- | ------------------------------------------ | -------------------------------------------------------- |
| name     | `OctoberFilterName` or reactive getter/ref | Filter name: `md`, `md_safe`, `md_clean` or `md_indent`. |
| source   | `string` or reactive getter/ref            | Source content sent to the selected filter.              |

## Returned State

Results and active requests are cached by filter name and source content. Older responses are
ignored when the reactive inputs change before a request completes.

| Property | Type                           | Description                                       |
| -------- | ------------------------------ | ------------------------------------------------- |
| value    | `Readonly<Ref<string>>`        | HTML returned by the filter.                      |
| pending  | `Readonly<Ref<boolean>>`       | Whether a filter request is active.               |
| error    | `Readonly<Ref<Error \| null>>` | Most recent request error.                        |
| refresh  | `() => Promise<void>`          | Runs the filter again with the current arguments. |

> [!WARNING]
> The returned value is HTML. Select the appropriate safe or cleaning filter whenever the source may
> contain untrusted content.
