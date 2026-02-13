---
outline: deep
---

# Components <DocsBadge path="setup/installation.html" />

**Configurable controllers that can be attached to any page, partial or layout.**

You should be able to use any registered OctoberCMS or Plugin-related `[component]` within Laika, 
just as you would in a traditional theme.

> [!TIP] Difference to Classic Templating
> In LAIKA Components **can only** be declared at the **layout** or **page** level. Declarations 
> inside partials or other `.htm` files outside `/layouts` and `/pages` are currently not supported.

## Introduction

_WiP_

## Components Aliases

_WiP_

## Access Component

_WiP_

## Lazy Properties

_WiP_

## Eager Properties

In classic OctoberCMS templating, Twig provides a form of dark-magical resolution. Component 
properties and methods can be accessed directly in templates without explicitly defining what should 
be exposed. Twig handles this dynamically at runtime, resolving methods and attributes behind the 
scenes (It stays in PHP, so there is no headache doing so).

Replicating Twig’s dynamic method access would require resolving and serializing every possible 
public method of a component, dramatically increasing payload size and negatively affecting 
performance. Instead, Laika follows an explicit, contract-based approach.

If you need access to component methods or computed values on the client, you can eager-load them 
using `eager[]`. Only the declared methods will be resolved server-side and included in the payload.

Example using the `sitePicker` component:

```vue
<october>
[sitePicker]
eager[] = isEnabled
eager[] = sites
</october>

<template>
    <div v-if="$components.sitePicker.isEnabled">
        <a v-for="site of sites" href="">{{ site.name }}</a>
    </div>
</template>

<script lang="ts" setup>
import { useComponent } from '@ratmd/laika';

// SitePicker
const sitePicker = useComponent('sitePicker');

const sites = computed(() => {
    return sitePicker.sites;
});
</script>
```
