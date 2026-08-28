---
outline: deep
---

# Getting Started

**Build modern Vue interfaces with the awesome October CMS ecosystem.**

LAIKA is a lightweight bridge between October CMS and a Vite-powered Vue application. It allows
theme interfaces to be written as Vue single-file components while October continues to provide
routing, server lifecycle methods, AJAX handlers, CMS components, partials, content blocks,
snippets and plugin integrations.

The workflow is inspired by [Inertia.js](https://inertiajs.com/), but LAIKA does not turn October
CMS into a conventional API or require the theme to become an isolated single-page application.
October remains responsible for the server request and Vue remains responsible for the interactive
interface presented in the browser.

## Project Goal

LAIKA aims to provide a modern frontend development experience without replacing the parts of
October CMS that already work well.

A LAIKA request involves both environments:

1. October CMS reads the theme source, resolves the route, runs the server lifecycle and prepares
   the page payload.
2. LAIKA transfers that payload and the active component information to the browser.
3. Vue renders the interface using the application compiled by Vite.
4. Subsequent navigation and AJAX requests continue to pass through October CMS.

This allows existing October plugins and CMS features to remain useful while theme developers gain
Vue components, TypeScript, Vite bundling and hot module replacement.

> [!CAUTION]
> LAIKA is currently experimental and may introduce breaking changes. Evaluate and test upgrades
> carefully before using them in production.

## Requirements

LAIKA requires:

- PHP 8.4 or newer
- October CMS 4.2+
- Node.js and npm for compiling the frontend application
- A Vite-powered Vue theme

## Install the October CMS Plugin <DocsBadge path="resources/installing-packages.html#install-plugin" />

Install the `RatMD.Laika` plugin from the root directory of the October CMS application:

```bash
php artisan plugin:install RatMD.Laika
```

The plugin provides the server-side integration responsible for reading LAIKA components, preparing
page payloads, handling navigation requests and connecting October CMS with the Vite application.

For additional information about installing and managing October CMS packages, see
[Installing Plugins and Themes](https://docs.octobercms.com/4.x/resources/installing-packages.html)
in the October CMS documentation.

## Install the Frontend Library

The Vue application uses the `@ratmd/laika` JavaScript package. Install it from the theme directory:

```bash
npm install @ratmd/laika
```

The package provides:

- The LAIKA application factory and Vue plugin
- Client-side navigation and payload handling
- Vue components and composables
- October CMS runtime helpers
- The `@ratmd/laika/vite` build plugin

The frontend package must be configured in the theme's application entry point and Vite
configuration. Continue with the [Frontend Getting Started](/frontend/getting-started) guide for the
complete client-side setup.

## Example Theme

The optional OctoberCMS demo theme for LAIKA provides a complete example of a LAIKA-powered template:

```bash
php artisan theme:install RatMD.LaikaDemo
```

It demonstrates LAIKA components, layouts, navigation, October components, Tailor content and
frontend asset compilation in a working theme.
