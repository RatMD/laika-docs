---
outline: deep
title: "[resources] Component"
---

# Resources <DocsBadge path="cms/components/resources.html" />

**Inject assets, variables and headers to the page.**

The `[resources]` component adds page-specific CSS, JavaScript, metadata and shared values. LAIKA
keeps managed head entries synchronized while navigating between pages and makes shared values
available through `$shared` and `useShared()`.

> [!TIP] Difference to Classic Templating
> October's component adds assets to server-rendered bundles and can set response headers. LAIKA's
> client-side resource manager handles `css`, `js`, `meta` and `vars`. It does not synchronize
> `less`, `scss` or `headers`; import preprocessor source files through Vite instead.

## Available Properties

| Property | Description |
| -------- | ----------- |
| css      | Stylesheets added to the document `<head>`. |
| js       | JavaScript files added to the document `<head>`. |
| vars     | Values added to the shared LAIKA payload. |
| meta     | LAIKA extension for named `<meta>` elements in the document `<head>`. |

Declare resources in the `<october>` block of a page or layout. Layout and page resources are
merged, with the page value taking precedence when both use the same key.

Paths beginning with `@/` resolve from the active theme directory. Files processed by Vite should
normally be imported from the Vue or TypeScript source instead.

## Basic Usage

```vue
<october>
[resources]
css[] = "@/assets/vendor/gallery.css"
js[] = "@/assets/vendor/gallery.js"
meta[description] = "Read our latest articles"
vars[activeNavigation] = "blog"
</october>

<template>
    <nav :data-active-item="shared.activeNavigation">
        <!-- Navigation links -->
    </nav>
</template>

<script lang="ts" setup>
import { useShared } from '@ratmd/laika';

const shared = useShared();
</script>
```

Shared values are reactive and remain available through `$shared` in templates or the object
returned by `useShared()` in Composition API code.

