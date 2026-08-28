---
outline: deep
---

# $router / useRouter()

**Navigates between LAIKA pages and performs payload-aware requests.**

Use `$router` in Vue templates or `useRouter()` in Composition API code. Internal links should
normally use the [`<Link />`](/frontend/components/link) component.

## Basic Usage

```vue
<script lang="ts" setup>
import { useOctober, useRouter } from '@ratmd/laika';

const october = useOctober();
const router = useRouter();

async function openArticle(slug: string) {
    const url = october.page('blog-post', { slug });
    if (url) {
        await router.get(url);
    }
}
</script>
```


## Available Methods

| Method                         | Description                                                      |
| ------------------------------ | ---------------------------------------------------------------- |
| `visit(url, options?)`         | Performs a LAIKA visit using the configured HTTP method.         |
| `get(url, options?)`           | Performs a GET visit and updates browser history.                |
| `post(url, data?, options?)`   | Performs a POST visit.                                           |
| `put(url, data?, options?)`    | Performs a PUT visit.                                            |
| `patch(url, data?, options?)`  | Performs a PATCH visit.                                          |
| `delete(url, data?, options?)` | Performs a DELETE visit.                                         |
| `raw(url, options?)`           | Returns the raw `Response` without applying it as a LAIKA visit. |

> [!WARNING]
> `raw()` only performs the HTTP request. It does not update browser history, swap the current page
> or apply a returned LAIKA payload.

## Visit Options

| Option        | Type                                      | Description                                                         |
| ------------- | ----------------------------------------- | -------------------------------------------------------------------- |
| method        | `get`, `post`, `put`, `patch` or `delete` | HTTP method used by `visit()` or `raw()`.                            |
| data          | `object`                                  | Request body for non-GET requests.                                   |
| replace       | `boolean`                                 | Replaces the current history entry instead of adding one.            |
| preserveState | `boolean`                                 | Preserves the current Vue page instance while applying the response. |
| only          | `string[]`                                | Requests only the selected payload paths.                            |
| force         | `boolean`                                 | Adds the `X-Laika-Force` request header.                             |
| require       | `string[]`                                | Declares required payload paths.                                     |
| headers       | `Record<string, string>`                  | Additional request headers.                                          |
