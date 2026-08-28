---
outline: deep
---

# Layouts <DocsBadge path="cms/themes/layouts.html" />

**Define the scaffold for your website pages.**

Layouts provide the shared Vue shell, the main structure including headers, navigation, footers and 
other components that should remain consistent between routes.

> [!TIP] Difference to Classic Templating
> A classic October layout renders the current page with `{% page %}`. A LAIKA Vue layout renders it 
> with the default `<slot />`. October's layout setting still controls the server request, while the 
> Vue `layout` option controls client-side composition and navigation.

## Basic Layout

Create layouts in the theme's `layouts` directory:

```vue
<october>
description = "Default website layout"
</october>

<template>
    <div class="site">
        <header>
            <Link link="/">My Website</Link>
        </header>

        <main>
            <slot />
        </main>

        <footer>&copy; My Website</footer>
    </div>
</template>

<script lang="ts" setup>
import { Link } from '@ratmd/laika';
</script>
```

The default slot is the equivalent of October's `{% page %}` tag.

## Assigning a Layout

Import the layout in a page and set it with Vue's `defineOptions` macro:

```vue
<template>
    <article>
        <h1>About us</h1>
    </article>
</template>

<script lang="ts" setup>
import DefaultLayout from '../layouts/default.vue';

defineOptions({
    layout: DefaultLayout,
});
</script>
```

The October configuration may also name a server-side layout:

```vue
<october>
url = "/about"
title = "About"
layout = "default"
</october>
```

In a normal LAIKA setup both refer to the same conceptual layout. The October value participates in 
the initial CMS request; the Vue option tells LAIKA which component should wrap the page in the 
browser.

## Nested Layouts

A page can use several layouts by providing an array. LAIKA nests them in the listed order:

```vue
<script lang="ts" setup>
import AccountLayout from '../layouts/account.vue';
import DefaultLayout from '../layouts/default.vue';

defineOptions({
    layout: [DefaultLayout, AccountLayout],
});
</script>
```

This is useful when an account area needs the global website shell and an additional account-specific 
navigation.

## Layout Configuration

The `<october>` block accepts the same layout configuration and component declarations as October CMS:

```vue
<october>
description = "Layout for signed-in users"

[session]
security = "user"
</october>
```

Components declared on the layout are included in LAIKA's component payload and can be accessed from 
every page using that layout.

## Page Titles and Head Elements

The page payload contains the title and other page information prepared by October. LAIKA manages 
the document title and the head elements supplied by October. Use the `Head` component for 
additional reactive elements owned by the Vue layout.

```vue
<template>
    <Head>
        <meta property="og:title" :content="pageTitle">
    </Head>

    <slot />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { Head, usePage } from '@ratmd/laika';

const page = usePage();
const pageTitle = computed(() => page.value?.title ?? 'My Website');
</script>
```

## Placeholders

Classic layouts use `{% placeholder %}` and pages fill those areas with `{% put %}`. LAIKA exposes 
server placeholders through the page and October runtime APIs.

```vue
<template>
    <aside v-if="sidebar" v-html="sidebar" />
    <slot />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { usePage } from '@ratmd/laika';

const page = usePage();
const sidebar = computed(() => page.value?.placeholders?.sidebar ?? '');
</script>
```

Use `useOctober().placeholder()`, `hasPlaceholder()` and `setPlaceholder()` when placeholder content 
must be read or changed programmatically.

## Server and Vue Lifecycles

Methods in a layout's `<php>` block follow the October layout lifecycle. Use them for work that must 
happen on the server before the payload is returned.

```vue
<php>
function onInit(): void
{
    $this['applicationName'] = 'My Website';
}
</php>
```

Use Vue lifecycle hooks for browser-only behavior such as event listeners or client integrations. 
Priority layouts and server lifecycle methods still affect the October request; they do not replace 
or reorder the Vue layouts selected by the page's `layout` option.
