---
outline: deep
---

# Pages <DocsBadge path="cms/themes/pages.html" />

**Define a URL for each page on your website.**

Pages connect October CMS routes and server lifecycle methods to route-level Vue components. LAIKA 
keeps Octobers native file-based routing and page configuration while replacing Twig page markup 
with a Vue single-file component.

> [!TIP] Difference to Classic Templating
> In classic templating, October renders the page's Twig markup inside the selected layout. In 
> LAIKA, October resolves the route and prepares the payload, then the matching Vue page is rendered 
> inside its Vue layout. URL parameters, PHP lifecycle methods and AJAX handlers remain server-side 
> features.

## Basic Page

Create a `.vue` file in the theme's `pages` directory:

```vue
<october>
url = "/about"
title = "About"
layout = "default"
</october>

<template>
    <article>
        <h1>About us</h1>
        <p>Learn more about our team.</p>
    </article>
</template>
```

## Page Configuration

The `<october>` block uses October's normal page configuration. Common values include:

```vue
<october>
url = "/about"
title = "About"
layout = "default"
description = "Information about the team"
hidden = 0
</october>
```

You can also declare October components in this block. Their public values are included in the 
LAIKA payload and exposed by `useComponent`.

## URL Parameters

October's route parameter syntax is unchanged:

```vue
<october>
url = "/blog/:slug"
title = "Article"
</october>
```

Optional parameters and wildcard parameters work as they do in October CMS. Read resolved route 
values from the LAIKA page or router runtime rather than parsing `window.location` yourself.

## Passing Server Values to Vue

Values assigned to the page during the server lifecycle become page properties:

```vue
<october>
url = "/welcome"
title = "Welcome"
</october>

<php>
function onStart(): void
{
    $this['heading'] = 'Welcome to our website';
}
</php>

<template>
    <h1>{{ heading }}</h1>
</template>

<script lang="ts" setup>
defineProps<{
    heading: string;
}>();
</script>
```

Only send values that are safe and useful in the browser. Models and other complex values should be 
transformed into serializable data on the server.

## Dynamic Pages and Lifecycle

Combine URL parameters with `onStart` or `onEnd` to load route-specific data. If a record cannot be 
found, return an October response or route the request to an appropriate error page on the server.

Page methods such as `onInit`, `onStart` and `onEnd` run as part of the October request. Vue 
lifecycle hooks run later in the browser and should only be used for client-side behavior.

## AJAX Handlers and Forms

Define October AJAX handlers in the page's `<php>` block and call them with `useOctober().request()`:

```vue
<php>
function onSubscribe(): array
{
    $email = (string) post('email');

    return ['subscribed' => $email !== ''];
}
</php>

<template>
    <form @submit.prevent="subscribe">
        <input v-model="email" type="email" required>
        <button type="submit">Subscribe</button>
    </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useOctober } from '@ratmd/laika';

const october = useOctober();
const email = ref('');

async function subscribe(): Promise<void> {
    await october.request('onSubscribe', {
        data: { email: email.value },
    });
}
</script>
```

Validation, authorization and persistence must still happen inside the server handler.

## Redirects and Custom Responses

October page lifecycle methods and AJAX handlers may return redirects or other supported responses. 
LAIKA's request layer handles the CMS response, while ordinary server redirects continue to be 
handled by October before the Vue application mounts.

## Page Titles and Error Pages

Static values such as `title` come from the page configuration and are managed by LAIKA. For 
additional dynamic metadata, set server page values during the lifecycle or use LAIKA's `Head` 
component in Vue.

October's `404` and error page conventions still apply to the server request. Create the 
corresponding LAIKA page files when those responses should render through the Vue application, and 
keep error output safe for public display.
