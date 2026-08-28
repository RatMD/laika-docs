---
outline: deep
---

# Global <DocsBadge path="cms/components/global.html" />

**Adds global configuration to the page.**

The `[global]` component loads the record belonging to a Tailor global blueprint. It is useful for
site-wide content such as company details, navigation settings or reusable labels.

> [!TIP] Difference to Classic Templating
> Classic Twig reads fields directly from the global component variable. LAIKA resolves the global
> record on the server and serializes every field defined by its blueprint. Vue reads those values
> through the component alias.

## Available Properties

| Property | Description |
| -------- | ----------- |
| handle   | Handle of the Tailor global blueprint. |

## Basic Usage

```vue
<october>
[global siteConfig]
handle = "Site\Config"
</october>

<template>
    <footer>
        <strong>{{ siteConfig.get('company_name', '') }}</strong>
        <p>{{ siteConfig.get('company_address', '') }}</p>
    </footer>
</template>

<script lang="ts" setup>
import { useComponent } from '@ratmd/laika';

const siteConfig = useComponent('siteConfig');
</script>
```

