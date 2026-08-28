---
outline: deep
---

# $october / useOctober()

**Provides client-side equivalents for common OctoberCMS Twig functions and AJAX operations.**

Use `$october` inside Vue templates or `useOctober()` in Composition API code.

## Basic Usage

```vue
<template>
    <img :src="$october.theme('assets/images/logo.svg')" alt="Logo">
</template>

<script lang="ts" setup>
import { useOctober } from '@ratmd/laika';

const october = useOctober();
const contactUrl = october.page('contact');
</script>
```

## URLs and Formatting

When `page()` persistence is enabled, matching parameters from the current route are reused to fill
the target page pattern. Explicit parameters not used by that pattern become query parameters.

| Method                                     | Description                                                          |
| ------------------------------------------ | -------------------------------------------------------------------- |
| `app(path)`                                | Resolves a path relative to the OctoberCMS application URL.          |
| `theme(path)`                              | Resolves one path or an array of paths relative to the active theme. |
| `page(name?, params?, persistence?)`       | Generates the URL of an OctoberCMS page.                             |
| `link(path)`                               | Resolves an OctoberCMS CMS-link value.                               |
| `media(file)`                              | Resolves a file from the OctoberCMS media library.                   |
| `resize(input, width?, height?, options?)` | Generates an image-resizer URL.                                      |
| `currency(value, options?)`                | Formats a numeric value using `Intl.NumberFormat`.                   |
| `htmlLimit(html, maxLength?, end?)`        | Limits visible text while preserving the encountered HTML tree.      |

## Localization

| Method                                    | Description                                            |
| ----------------------------------------- | ------------------------------------------------------ |
| `trans(key, replacements?)`               | Returns a localized string with optional replacements. |
| `transChoice(key, number, replacements?)` | Selects and transforms a pluralized localized string.  |
| `trans_choice(...)`                       | PHP-style alias of `transChoice()`.                    |

```ts
const title = october.trans('site.welcome', { name: 'Laika' });
const count = october.transChoice('site.messages', 2, { count: 2 });
```

## Placeholders

| Method                         | Description                                        |
| ------------------------------ | -------------------------------------------------- |
| `placeholder(name, fallback?)` | Returns a server or client-side placeholder value. |
| `hasPlaceholder(name)`         | Checks whether a placeholder exists.               |
| `setPlaceholder(name, value)`  | Sets a reactive client-side placeholder value.     |


## AJAX and Server Rendering

| Method                             | Description                                               |
| ---------------------------------- | --------------------------------------------------------- |
| `request(handler, options?)`       | Calls an OctoberCMS page or component AJAX handler.       |
| `renderPartial(name, parameters?)` | Renders a trusted OctoberCMS partial on the server.       |
| `content(name, parameters?)`       | Renders a trusted OctoberCMS content block on the server. |

```ts
const result = await october.request('onSubscribe', {
    data: { email: 'laika@example.com' },
    flash: true,
});

if (!result.ok         ) {
    console.error(result.message, result.invalid);
}
```

### Request Options

The result contains `ok`, HTTP `status`, returned `data`, validation errors, a message, severity and
any rendered partials.

| Option        | Type                      | Description                                              |
| ------------- | ------------------------- | -------------------------------------------------------- |
| data          | `Record<string, unknown>` | Values sent to the AJAX handler.                         |
| only          | `string[]`                | Payload paths refreshed after the request.               |
| partials      | `string[]`                | OctoberCMS partials requested from the handler response. |
| flash         | `boolean`                 | Enables or disables AJAX flash handling.                 |
| preserveState | `boolean`                 | Preserves the current Vue page state.                    |

## Markdown Filters

All Markdown filter methods are asynchronous and resolve to an HTML string. For reactive filter
state, use [`useOctoberFilter()`](/frontend/runtime/october-filter).

> [!WARNING]
> Partial, content-block and Markdown results are HTML strings. Insert only trusted or appropriately
> filtered output using `v-html`.

| Method                             | Description                                               |
| ---------------------------------- | --------------------------------------------------------- |
| `filter(name, content)`            | Runs one of the supported OctoberCMS Markdown filters.    |
| `md(content)`                      | Applies the `md` filter.                                  |
| `mdSafe(content)`                  | Applies the `md_safe` filter.                             |
| `mdClean(content)`                 | Applies the `md_clean` filter.                            |
| `mdIndent(content)`                | Applies the `md_indent` filter.                           |
| `md_safe`, `md_clean`, `md_indent` | PHP-style aliases of the corresponding camelCase methods. |
