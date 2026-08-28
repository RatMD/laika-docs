---
title: 'ProgressBar Component'
outline: deep
---

# &lt;ProgressBar /&gt;

**Displays the progress of LAIKA router navigation.**

The `<ProgressBar />` component renders a thin fixed bar at the top of the viewport while a LAIKA
navigation request is active. It advances while the request is pending and disappears shortly after
the request completes.

> [!WARNING]
> Do not add `<ProgressBar />` manually when using LAIKA's standard root application. Doing so renders
> a second progress bar using the same shared state.

## Basic Usage

LAIKA includes `<ProgressBar />` in its root application automatically. You normally only need to
customize its appearance.

If you are building a custom root component, it can also be imported and rendered manually:

```vue
<template>
    <ProgressBar />
</template>

<script lang="ts" setup>
import { ProgressBar } from '@ratmd/laika';
</script>
```

## Available Properties

The component does not accept any properties or provide slots.


## Customizing the Color

Set the `--laika-progress-bar` CSS custom property to match your theme.

```css
:root {
    --laika-progress-bar: #2563eb;
}
```

The default color is `#DE3163`.


## Manual Progress

The progress-bar state is shared with the `getProgressBar()` helper. This can be useful for work that
does not pass through the LAIKA router.

```ts
import { getProgressBar } from '@ratmd/laika';

const progress = getProgressBar();

progress.start();

try {
    await performAsyncWork();
} finally {
    progress.done();
}
```

| Method    | Description                                                  |
| --------- | ------------------------------------------------------------ |
| `start()` | Shows the bar and begins advancing it.                       |
| `done()`  | Completes and hides the bar.                                 |
| `fail()`  | Finishes the active progress state after a failed operation. |
