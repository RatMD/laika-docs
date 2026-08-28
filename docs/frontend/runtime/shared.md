---
outline: deep
---

# $shared / useShared()

**Provides reactive access to values shared with the current LAIKA page.**

Shared values can be supplied by the OctoberCMS `[resources]` component or by server-side LAIKA
integration code. Use `$shared` in templates or `useShared()` in Composition API code.

## Basic Usage

```vue
<template>
    <p>{{ $shared.companyName }}</p>
</template>

<script lang="ts" setup>
import { useShared } from '@ratmd/laika';

interface SharedProperties {
    companyName?: string;
}

const shared = useShared<SharedProperties>();
console.log(shared.value?.companyName);
</script>
```

## Declaring Shared Values

Values declared by `[resources]` are merged into the shared payload.

```vue
<october>
[resources]
vars[companyName] = 'Acme'
</october>
```

The ref returned by `useShared()` updates whenever LAIKA swaps or patches the shared payload. See
the [`[resources]` component](/backend/components/resources) for additional configuration examples.
