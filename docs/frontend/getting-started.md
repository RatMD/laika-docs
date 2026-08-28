---
outline: deep
---

# Frontend Getting Started

**Creates the LAIKA Vue application and installs its client-side runtime.**

The main `@ratmd/laika` package exports the application factory and Vue plugin. The separate
`@ratmd/laika/vite` entry point provides the Vite build plugin used by LAIKA themes.


## Application Setup

Use `createLaikaApp()` in the JavaScript or TypeScript entry file of your theme.

```ts
import type { DefineComponent } from 'vue';
import { createApp, h } from 'vue';
import { createLaikaApp } from '@ratmd/laika';

const pages = import.meta.glob<DefineComponent>('./pages/**/*.vue', {
    import: 'default',
});

await createLaikaApp({
    resolve: (name) => {
        const resolvePage = pages[`./pages/${name}.vue`];

        if (!resolvePage) {
            throw new Error(`Unable to resolve LAIKA page: ${name}`);
        }

        return resolvePage();
    },

    setup({ root, App, props, plugin }) {
        const app = createApp({
            render: () => h(App, props),
        });

        app.use(plugin);
        app.mount(root);

        return app;
    },
});
```

LAIKA reads the initial payload from a non-empty
`<script type="application/json" data-laika="payload">` element inside the document `<head>`. The
OctoberCMS server integration generates this element during the initial page request.

The root component is mounted to `.app` by default. Both the payload element and root element must
exist before `createLaikaApp()` runs.


## Application Options

| Option | Type | Description |
| ------ | ---- | ----------- |
| resolve | `(name: string) => ResolveResult` | Required resolver for Vue page components. |
| setup | `(context: LaikaSetup) => App` | Required callback that creates, configures and mounts the Vue application. |
| rootId | `string` | Custom root selector. LAIKA uses `.app` by default. |
| title | `(title: string) => string` | Transforms page titles before assigning `document.title`. |
| onError | `(error: unknown) => void` | Reserved option that is not invoked by the current implementation. |

The page resolver may return a Vue component, a component module, or a promise resolving to either
form.


## Setup Context

The `setup()` callback receives the following values.

| Property | Description |
| -------- | ----------- |
| root | Resolved HTML element to which the Vue application should be mounted. |
| App | LAIKA root component responsible for rendering pages and layouts. |
| props | Initial payload, component resolver and optional title callback passed to `App`. |
| plugin | LAIKA Vue plugin configured for the current application. |
| payload | Initial server-generated LAIKA payload. |

The callback must return the created Vue `App` instance.


## Vue Plugin

The `plugin` supplied to `setup()` installs LAIKA's router and OctoberCMS client API. It also
registers the following Vue template globals:

| Global | Description |
| ------ | ----------- |
| `$laika` | Low-level LAIKA runtime. |
| `$router` | Client-side navigation API. |
| `$payload` | Complete current payload. |
| `$site` | Active OctoberCMS site. |
| `$theme` | Active theme metadata and options. |
| `$page` | Current page metadata and properties. |
| `$components` | Registered OctoberCMS component handles. |
| `$october` | OctoberCMS URLs, translations, AJAX and rendering helpers. |
| `$shared` | Values shared with the current page. |

The same plugin is exported as `laikaPlugin` for custom setups:

```ts
import { laikaPlugin } from '@ratmd/laika';

app.use(laikaPlugin);
```

Installing `laikaPlugin` alone does not initialize a LAIKA application. The app must still render
the LAIKA root component with a valid initial payload and component resolver. Standard applications
should use the `plugin` supplied to `createLaikaApp().setup()`.


### Advanced Plugin API

The Vue plugin also exposes low-level lifecycle and payload methods.

| Method | Description |
| ------ | ----------- |
| `onRouterBefore(request)` | Runs before a LAIKA navigation request. |
| `onRouterSuccess(request, response)` | Handles successful responses and applies the returned payload. |
| `onRouterFailure(request, response?)` | Runs after a failed navigation request. |
| `swap(payload, preserveState?, only?)` | Resolves the next page component and applies a payload. |
| `patch(current, next, only)` | Returns a payload with only the selected paths replaced. |

These methods are part of LAIKA's navigation lifecycle. Replacing a default lifecycle method may
prevent normal routing or payload updates, so they should be treated as advanced APIs.


## Vite Plugin

Import the build plugin from the dedicated `@ratmd/laika/vite` entry point.

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import laika from '@ratmd/laika/vite';

export default defineConfig({
    plugins: [
        laika(),
        vue(),
    ],
});
```

The plugin runs before Vue compilation and performs two tasks:

1. It removes custom `<october>` and `<php>` blocks from Vue SFC files.
2. It extracts statically declared translation keys for the OctoberCMS server integration.


## Vite Plugin Options

| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| stripOctober | `boolean` | `true` | Removes `<october>` and `<php>` blocks from Vue files. |
| i18n.output | `string` | `resources/laika.i18n.json` | Translation output file relative to the Vite root. |
| i18n.include | `RegExp` | Vue and JavaScript/TypeScript files | Selects files scanned for translation calls. |
| i18n.functions | `string[]` | `trans`, `transChoice`, `trans_choice` | Function names recognized by the extractor. |
| i18n.writeOnDev | `boolean` | `true` | Scans, watches and writes translations during development. |
| i18n.extraKeys | `string[]` | `[]` | Additional translation keys included in the output. |


### Translation Extraction

The extractor recognizes statically quoted keys:

```ts
trans('site.title');
transChoice('messages.count', count);
$october.trans('navigation.home');
```

Dynamic keys and template literals cannot be discovered statically:

```ts
trans(dynamicKey);
trans(`pages.${pageName}`);
```

Add such keys explicitly using `i18n.extraKeys`:

```ts
laika({
    i18n: {
        extraKeys: [
            'pages.about',
            'pages.contact',
        ],
    },
});
```

The generated file uses the following structure:

```json
{
    "version": 1,
    "keys": [
        "pages.about",
        "pages.contact",
        "site.title"
    ]
}
```

During development, `i18n.writeOnDev` controls the initial scan, file watcher and subsequent writes.
Production builds always write the collected translation file at the end of the build.

> [!NOTE]
> The Vite plugin creates the configured output directory and translation file when they do not
> already exist.
