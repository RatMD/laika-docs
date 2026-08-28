---
outline: deep
---

# Partials <DocsBadge path="cms/themes/partials.html" />

**Reuse chunks of HTML code anywhere in website.**

The `partials` directory contains reusable interface fragments. In a LAIKA theme, these fragments
can be implemented as Vue single-file components or as classic server-rendered October CMS
partials.

```text
partials/
├── site/
│   ├── SiteHeader.vue
│   └── SiteFooter.vue
└── server/
    └── greeting.htm
```

Both types can coexist in the same theme:

> [!TIP] Difference to Classic Templating
> A classic October theme uses the `partials` directory exclusively for server-rendered Twig
> fragments called with `{% partial %}`. LAIKA also uses this directory for reusable Vue
> single-file components. Classic `.htm` partials remain available through `<ServerPartial>` and
> `useOctober().renderPartial()`.


## LAIKA Components

A `.vue` file inside `partials` is a reusable LAIKA component. It can be imported by pages, layouts
and other LAIKA components.

```vue
<!-- partials/site/SiteFooter.vue -->
<template>
    <footer class="site-footer">
        <strong>{{ applicationName }}</strong>

        <nav>
            <slot />
        </nav>
    </footer>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
    applicationName?: string;
}>(), {
    applicationName: 'My Website',
});
</script>
```

Import the component using the theme alias:

```vue
<template>
    <SiteFooter application-name="LAIKA">
        <a href="/privacy">Privacy</a>
    </SiteFooter>
</template>

<script lang="ts" setup>
import SiteFooter from '@/partials/site/SiteFooter.vue';
</script>
```

Vite includes imported LAIKA components in the frontend build. Their templates are rendered by Vue
and can use props, slots, events, composables and other Vue features.


### Props

Use props to pass data into a LAIKA component:

```vue
<!-- partials/elements/UserCard.vue -->
<template>
    <article class="user-card">
        <h2>{{ user.name }}</h2>
        <p>{{ user.description }}</p>
    </article>
</template>

<script lang="ts" setup>
interface User {
    name: string;
    description: string;
}

defineProps<{
    user: User;
}>();
</script>
```

```vue
<UserCard :user="author" />
```


### Slots

Slots allow the parent component to provide markup:

```vue
<!-- partials/elements/Card.vue -->
<template>
    <article class="card">
        <header>
            <slot name="header" />
        </header>

        <div class="card-body">
            <slot />
        </div>
    </article>
</template>
```

```vue
<Card>
    <template #header>
        <h2>Welcome</h2>
    </template>

    <p>This content is provided by the parent component.</p>
</Card>
```


## LAIKA Components and October Components

A LAIKA component is a Vue single-file component stored in `partials`. An October component is a
server-side PHP component declared inside an `<october>` block.

These are separate concepts:

```text
LAIKA component
└── partials/site/SiteFooter.vue

October component
└── [sitePicker] declared inside <october>
```

A LAIKA component can access an October component through `useComponent()` when that October
component has been declared on the active page or layout.


## Server-rendered Partials

Classic October `.htm` partials remain useful when a fragment requires Twig, server-side rendering
or an existing October implementation.

```twig
{# partials/server/greeting.htm #}
<p>Hello {{ name }}!</p>
```

Render the partial from a LAIKA component using `<ServerPartial>`:

```vue
<template>
    <ServerPartial
        name="server/greeting"
        :parameters="{ name: 'Alex' }"
    />
</template>

<script lang="ts" setup>
import { ServerPartial } from '@ratmd/laika';
</script>
```

October renders the Twig file on the server and LAIKA inserts the returned HTML into the Vue
interface.


### Parameters

Pass values to the server partial through the `parameters` property:

```vue
<template>
    <ServerPartial
        name="products/card"
        :parameters="{
            productId,
            compact: true,
        }"
    />
</template>

<script lang="ts" setup>
import { ServerPartial } from '@ratmd/laika';

defineProps<{
    productId: number;
}>();
</script>
```

When the partial name or parameters change, `<ServerPartial>` reloads the server-rendered fragment.

Parameters cross the client/server boundary and must be serializable. Do not pass Vue components,
functions, browser objects or other client-only values.


### Wrapper Element

Use the `tag` property to select the wrapper element:

```vue
<ServerPartial
    tag="section"
    name="account/summary"
/>
```


### Loading and Error State

The wrapper receives state attributes while the request is loading or has failed:

```css
[data-loading] {
    opacity: 0.5;
}

[data-error] {
    border: 1px solid #dc2626;
}
```


## Programmatic Rendering

Use `useOctober().renderPartial()` when the returned HTML must be handled programmatically:

```vue
<template>
    <div v-if="html" v-html="html" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useOctober } from '@ratmd/laika';

const october = useOctober();
const html = ref('');

onMounted(async () => {
    html.value = await october.renderPartial('server/greeting', {
        name: 'Alex',
    });
});
</script>
```

Only insert HTML produced by a trusted server template.


## Choosing a Partial Type

Use a `.vue` LAIKA component when the fragment:

- Requires client-side interaction or reactive state.
- Uses Vue props, slots, events or composables.
- Should participate directly in the Vite application.
- Is shared by pages, layouts or other LAIKA components.

Use a classic `.htm` October partial when the fragment:

- Requires Twig or server-only logic.
- Must reuse existing October markup.
- Depends on server rendering.
- Should be loaded independently through an AJAX request.

A server partial can also provide a migration boundary while an existing October theme is gradually
converted to LAIKA components.


## Server-rendered Partial Lifecycle

October executes the `.htm` partial and its Twig logic before returning the resulting HTML.
Components available in the current October request can participate in that server render.

The returned string is HTML rather than a Vue template. Vue directives, LAIKA components and Vue
event bindings contained in that string are not compiled or activated.


## Limitations

- `<ServerPartial>` renders returned HTML and does not provide a Vue slot.
- Server-partial parameters must be serializable.
- Vue syntax contained in returned server HTML is not compiled.
- October components that must be available through `useComponent()` should be declared on the
  active page or layout.
- Server-rendered HTML should only be inserted when it comes from a trusted source.