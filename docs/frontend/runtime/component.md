---
outline: deep
---

# $components / useComponent()

**Provides reactive access to OctoberCMS components registered on the current page.**

Use `$components` in Vue templates or `useComponent()` in Composition API code. Components are
addressed by the name or alias declared in the page or layout `<october>` block.

## Basic Usage

```vue
<october>
[sitePicker]
</october>

<template>
    <p v-if="$components.has('sitePicker')">
        {{ $components.sitePicker.get('isEnabled', false) }}
    </p>
</template>

<script lang="ts" setup>
import { useComponent } from '@ratmd/laika';

const sitePicker = useComponent('sitePicker');
console.log(sitePicker.get('isEnabled', false));
</script>
```

## Components Facade

| Access                   | Description                                                     |
| ------------------------ | --------------------------------------------------------------- |
| `$components.alias`      | Returns a reactive handle for a registered component alias.     |
| `$components.has(alias)` | Checks whether an alias exists in the current payload.          |
| `$components.get(alias)` | Returns its handle, or `null` when the alias is not registered. |

## Component Handle

Each handle exposes the current server payload together with helper methods.

| Property  | Description                                             |
| --------- | ------------------------------------------------------- |
| component | Registered OctoberCMS component name.                   |
| alias     | Component alias used by the page.                       |
| class     | Server-side component class.                            |
| options   | Configured component properties.                        |
| props     | Values exposed to the page by the component.            |
| methods   | Public component methods available for lazy loading.    |
| vars      | Public component properties available for lazy loading. |
| html      | Server-rendered component markup, when loaded.          |

| Method                       | Description                                                               |
| ---------------------------- | ------------------------------------------------------------------------- |
| `get(key, fallback?)`        | Returns a loaded property or the supplied fallback value.                 |
| `exists(key)`                | Checks whether a property, public method or public variable is available. |
| `loaded(key)`                | Checks whether a value is already present in `props`.                     |
| `load(keyOrKeys)`            | Lazily requests one or more properties from the server.                   |
| `loadHtml()`                 | Lazily requests the component's server-rendered markup.                   |
| `request(handler, options?)` | Calls an AJAX handler scoped to this component alias.                     |


## Lazy Properties

Lazy requests preserve the current Vue page state and patch only the requested component values.

```vue
<script lang="ts" setup>
import { onMounted } from 'vue';
import { useComponent } from '@ratmd/laika';

const sitePicker = useComponent('sitePicker');

onMounted(async () => {
    if (sitePicker.exists('sites') && !sitePicker.loaded('sites')) {
        await sitePicker.load('sites');
    }
});
</script>
```

## Component AJAX Handlers

`request()` automatically prefixes the handler with the current component alias.

```ts
const result = await sitePicker.request('onRefresh', {
    data: { locale: 'en' },
});
```

See the [`<PageComponent />`](/frontend/components/page-component) component to render a handle or
its server-generated HTML.
