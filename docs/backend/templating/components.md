---
outline: deep
---

# Components <DocsBadge path="cms/themes/components.html" />

**Configurable controllers that can be attached to any page, partial or layout.**

October CMS components provide reusable server-side data, behavior and AJAX handlers. In a LAIKA
theme, registered October or plugin components use the familiar `[component]` configuration syntax.
Components that need to be available in the LAIKA payload must be declared on the active page or
layout. Classic October partials can use components available in the current server request.

> [!TIP] Difference to Classic Templating
> Classic Twig can call component properties and methods dynamically while it renders on the server. 
> LAIKA must serialize values before they cross into the browser, so it exposes collected component 
> data through `useComponent` and loads undeclared values explicitly. Components can only be 
> declared on layouts and pages; declarations inside partials or other Vue files are not collected.

## Declaring a Component

Declare components in the `<october>` block of a page or layout:

```vue
<october>
url = "/"
title = "Home"

[sitePicker]
</october>
```

October creates and runs the component during the server request. LAIKA then adds its available 
values to the component section of the page payload.

## Component Aliases

Use October's alias syntax when the same component is needed more than once or when a clearer client 
name is useful:

```vue
<october>
[sitePicker headerSites]
[sitePicker footerSites]
</october>
```

Access the instance using its alias:

```ts
const headerSites = useComponent('headerSites');
```

## External Properties

Component properties are configured in the same way as classic October templates:

```vue
<october>
[blogPosts]
pageNumber = "{{ :page }}"
postsPerPage = 10
sortOrder = "published_at desc"
</october>
```

Property values are resolved by October before the component runs. Route parameters and other 
supported external property values therefore remain server-side concerns.

## Reading Component Values

Use the `$components` global in a template or the `useComponent` composable in `<script setup>`:

```vue
<template>
    <p v-if="$components.sitePicker.get('isEnabled', false)">
        Multiple sites are available.
    </p>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useComponent } from '@ratmd/laika';

const sitePicker = useComponent('sitePicker');
const sites = computed(() => sitePicker.get('sites', []));
</script>
```

Raw collected values are stored under `.props`. Prefer `.get(name, defaultValue)` when a safe 
fallback makes the template easier to use.

## Eager Properties

If a component method or computed value is needed immediately, list it with `eager[]`. LAIKA 
resolves only the declared entries and includes them in the initial payload:

```vue
<october>
[sitePicker]
eager[] = isEnabled
eager[] = sites
</october>

<template>
    <nav v-if="sitePicker.get('isEnabled', false)">
        <a
            v-for="site in sitePicker.get('sites', [])"
            :key="site.id"
            :href="site.url"
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

Eager loading avoids an additional request but increases the initial payload. Use it for values 
required during the first render.

## Lazy Properties

Load a value only when it is needed with `.load()`:

```vue
<template>
    <button type="button" @click="showSites">
        Show sites
    </button>

    <ul>
        <li v-for="site in sitePicker.get('sites', [])" :key="site.id">
            {{ site.name }}
        </li>
    </ul>
</template>

<script lang="ts" setup>
import { useComponent } from '@ratmd/laika';

const sitePicker = useComponent('sitePicker');

async function showSites(): Promise<void> {
    await sitePicker.load('sites');
}
</script>
```

The loaded result is stored in the component state and can then be read with `.get()`.

## Component Markup

`PageComponent` renders the component's default server markup:

```vue
<template>
    <PageComponent name="sitePicker" />
</template>

<script lang="ts" setup>
import { PageComponent } from '@ratmd/laika';
</script>
```

Use `.loadHtml()` when you need to request and handle the rendered markup programmatically. Returned 
component markup is server-rendered HTML and is not compiled as a Vue template.

For a Vue-native interface, read the component data with `useComponent` and write the markup in Vue 
instead.

## AJAX Handlers

Call a handler belonging to the component through its runtime instance:

```vue
<script lang="ts" setup>
import { useComponent } from '@ratmd/laika';

const newsletter = useComponent('newsletter');

async function subscribe(email: string): Promise<void> {
    await newsletter.request('onSubscribe', {
        data: { email },
    });
}
</script>
```

The server component remains responsible for validation, authorization and persistence.

## Component Lifecycle

October runs component initialization and page lifecycle methods on the server before building the 
LAIKA payload. Vue setup and lifecycle hooks run later in the browser. Values needed by Vue must be 
collected, eager-loaded or requested lazily; arbitrary PHP methods cannot be executed directly in 
JavaScript.

## Limitations

- Declare components on a page or layout so LAIKA can collect them.
- Only serializable values can be included in the client payload.
- Eager values increase the initial response size.
- Server-rendered component HTML is not compiled as Vue markup.
- Keep permissions and sensitive business logic inside PHP handlers.
