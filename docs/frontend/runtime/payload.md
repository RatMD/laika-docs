---
outline: deep
---

# $payload / usePayload()

**Provides reactive access to the complete LAIKA payload.**

`$payload` exposes the current payload inside Vue templates. `usePayload()` returns a computed ref
for each top-level payload section.

> [!NOTE]
> Use `useSite()`, `useTheme()`, `usePage()` or `useShared()` when only one payload section is needed.

## Basic Usage

```vue
<template>
    <h1>{{ $payload?.page.title }}</h1>
</template>

<script lang="ts" setup>
import { usePayload } from '@ratmd/laika';

const { page, site, shared } = usePayload();

console.log(page.value?.title);
console.log(site.value?.locale);
console.log(shared.value);
</script>
```

## Payload Sections

All values returned by `usePayload()` are computed refs and update when LAIKA swaps or patches the
payload.

| Property   | Description                                                           |
| ---------- | --------------------------------------------------------------------- |
| version    | Server-provided payload version.                                      |
| token      | Combined CSRF and LAIKA request token.                                |
| site       | Active OctoberCMS site configuration.                                 |
| theme      | Active theme metadata and options.                                    |
| page       | Current page metadata, properties and rendered content.               |
| components | OctoberCMS components registered on the current layout and page.      |
| october    | OctoberCMS URLs, routes, localization data and runtime configuration. |
| shared     | Application values shared with the current page.                      |
