---
outline: deep
---

# $site / useSite()

**Provides reactive access to the active OctoberCMS site.**

Use `$site` inside Vue templates or `useSite()` inside Composition API code.

## Basic Usage

```vue
<template>
    <section :lang="$site.locale">
        <p>{{ $site.name }}</p>
    </section>
</template>

<script lang="ts" setup>
import { useSite } from '@ratmd/laika';

const site = useSite();
console.log(site.value?.code);
</script>
```

## Site Properties

The ref returned by `useSite()` updates when the active LAIKA payload changes.

| Property | Type     | Description                       |
| -------- | -------- | --------------------------------- |
| name     | `string` | Display name of the active site.  |
| code     | `string` | Unique site code.                 |
| url      | `string` | Configured site URL.              |
| prefix   | `string` | URL prefix used by the site.      |
| theme    | `string` | Theme assigned to the site.       |
| locale   | `string` | Active site locale.               |
| timezone | `string` | Timezone configured for the site. |
