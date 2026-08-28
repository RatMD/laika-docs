---
outline: deep
---

# &lt;ServerPartial /&gt;

**Loads and renders an OctoberCMS partial on the server.**

The `<ServerPartial />` component requests a theme partial from OctoberCMS and inserts the returned
HTML into the current Vue page. It reloads automatically when the partial name or its parameters
change.

> [!WARNING]
> Partial output is inserted using `innerHTML`. Only render partials and parameters trusted by your
> OctoberCMS application.

## Basic Usage

```vue
<template>
    <ServerPartial name="site/footer" />
</template>

<script lang="ts" setup>
import { ServerPartial } from '@ratmd/laika';
</script>
```

Pass values to the partial using the `parameters` property.

```vue
<ServerPartial
    name="blog/post-card"
    :parameters="{ post }"
/>
```

## Available Properties

| Property   | Type     | Default | Description                                        |
| ---------- | -------- | ------- | -------------------------------------------------- |
| name       | `string` | —       | Required OctoberCMS partial name.                  |
| parameters | `object` | `{}`    | Values made available while rendering the partial. |
| tag        | `string` | `div`   | HTML element used to contain the rendered partial. |

Parameter changes are observed deeply, so updating a value inside a reactive parameters object
reloads the partial.


## Rendering State

The generated element includes attributes that can be used for styling or status handling.

| Attribute             | Description                                              |
| --------------------- | -------------------------------------------------------- |
| `data-laika-partial`  | Contains the requested partial name.                     |
| `data-loading="true"` | Present while the partial is being loaded.               |
| `data-error`          | Contains the request error message when rendering fails. |

```css
[data-laika-partial][data-loading="true"] {
    opacity: 0.5;
}
```

When a partial is refreshed, its previous HTML remains visible until the new request completes. The
component does not provide slots.
