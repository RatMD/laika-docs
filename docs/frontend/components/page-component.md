---
title: 'PageComponent'
outline: deep
---

# &lt;PageComponent /&gt;

**Renders an OctoberCMS component registered on the current layout or page.**

The `<PageComponent />` component connects a component declaration in the `<october>` block with
its server-rendered HTML or its LAIKA component data.

> [!WARNING]
> Server-rendered component HTML is inserted using `innerHTML`. Only render HTML produced by a
> trusted server-side component.

## Basic Usage

Declare the OctoberCMS component and render it by its alias.

```vue
<october>
[sitePicker]
</october>

<template>
    <PageComponent name="sitePicker" />
</template>

<script lang="ts" setup>
import { PageComponent } from '@ratmd/laika';
</script>
```

Without a slot, LAIKA renders the HTML returned by the component. If that HTML is not present in the
current payload, it is loaded automatically.

## Available Properties

| Property | Type     | Description                                                     |
| -------- | -------- | --------------------------------------------------------------- |
| name     | `string` | Required component name or alias from the current page payload. |

## Custom Rendering

Use the default slot when you want Vue to render the component instead of its server-generated
HTML. The slot receives the same component handle returned by `useComponent()`.

```vue
<PageComponent name="sitePicker" v-slot="sitePicker">
    <nav v-if="sitePicker.exists('sites')">
        {{ sitePicker.get('sites') }}
    </nav>
</PageComponent>
```

Nothing is rendered when the requested component is not registered on the current layout or page.
