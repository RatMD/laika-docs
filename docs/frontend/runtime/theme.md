---
outline: deep
---

# $theme / useTheme()

**Provides reactive access to the active OctoberCMS theme.**

Use `$theme` inside Vue templates or `useTheme()` inside Composition API code. 

## Basic Usage

A generic type can describe custom values stored in the theme options as shown below.

```vue
<template>
    <p>Theme: {{ $theme.name }}</p>
</template>

<script lang="ts" setup>
import { useTheme } from '@ratmd/laika';

interface ThemeOptions {
    brandColor?: string;
}

const theme = useTheme<ThemeOptions>();
console.log(theme.value?.options.brandColor);
</script>
```

## Theme Properties

The ref returned by `useTheme()` updates when the active LAIKA payload changes.

| Property    | Type               | Description                        |
| ----------- | ------------------ | ---------------------------------- |
| name        | `string` or `null` | Theme name.                        |
| description | `string` or `null` | Theme description.                 |
| homepage    | `string` or `null` | Theme homepage.                    |
| author      | `string` or `null` | Theme author.                      |
| authorCode  | `string` or `null` | OctoberCMS author code.            |
| code        | `string` or `null` | Theme code.                        |
| options     | `object`           | Custom theme configuration values. |
