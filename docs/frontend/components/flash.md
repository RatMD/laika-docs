---
title: 'Flash Component'
outline: deep
---

# &lt;Flash /&gt;

**Renders flash messages returned with the current LAIKA page payload.**

The `<Flash />` component reads OctoberCMS flash messages from the reactive page payload. It updates
automatically after navigation or an AJAX request replaces the payload.


## Basic Usage

Import the component and use its default slot to decide how each message should be displayed.

```vue
<template>
    <Flash type="success" v-slot="{ type, message }">
        <div :class="`alert alert-${type}`">
            {{ message }}
        </div>
    </Flash>
</template>

<script lang="ts" setup>
import { Flash } from '@ratmd/laika';
</script>
```


## Available Properties

| Property | Type                                    | Description                                               |
| -------- | --------------------------------------- | --------------------------------------------------------- |
| type     | `info`, `error`, `success` or `warning` | Restricts the component to a specific flash-message type. |

## Slot Properties

The default slot receives the following properties.

| Property | Type                   | Description                                     |
| -------- | ---------------------- | ----------------------------------------------- |
| type     | `string`               | The flash-message type.                         |
| message  | `string` or `string[]` | The message or messages returned by OctoberCMS. |

Nothing is rendered when the selected flash type has no messages or when no default slot is
provided.
