---
outline: deep
---

# Site Picker <DocsBadge path="cms/components/sitepicker.html" />

**Tools for working with multiple site definitions**

The `[sitePicker]` component provides enabled site definitions and URLs for October's multisite
configuration. Use it to build locale or site selectors that remain on the corresponding page when
the visitor switches sites.

> [!TIP] Difference to Classic Templating
> Classic Twig can call the component's PHP methods while rendering. Vue cannot execute those
> methods directly, so values needed during the first render must be declared with LAIKA's
> `eager[]` option. Other parameterless values can be requested later with `.load()`.

## Available Values

The component has no configurable October properties. LAIKA can expose these public values:

| Value     | Description |
| --------- | ----------- |
| isEnabled | Returns whether more than one site is configured. |
| sites     | Enabled sites in the current site group, including URLs for the current page. |
| allSites  | All enabled sites, including URLs for the current page. |

October also provides `pageSites(pageName, params)` for generating links to another page. Since it
requires arguments, it cannot be resolved with LAIKA's parameterless `eager[]` or `.load()` access.

## Basic Usage

```vue
<october>
[sitePicker]
eager[] = isEnabled
eager[] = sites
</october>

<template>
    <nav v-if="sitePicker.get('isEnabled', false)" aria-label="Select website">
        <a
            v-for="site in sitePicker.get('sites', [])"
            :key="site.id"
            :href="site.url"
            :hreflang="site.locale"
        >
            {{ site.name }}
        </a>
    </nav>
</template>

<script lang="ts" setup>
import { useComponent } from '@ratmd/laika';

const sitePicker = useComponent('sitePicker');
</script>
```

For values not required during the initial render, omit them from `eager[]` and load them when
needed:

```ts
await sitePicker.load('sites');
```

