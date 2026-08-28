---
outline: deep
---

# getProgressBar()

**Provides access to the shared LAIKA progress-bar state and controls.**

LAIKA uses this singleton internally for router navigation. Calling `getProgressBar()` returns the
same reactive state used by the built-in [`<ProgressBar />`](/frontend/components/progress-bar).

## Basic Usage

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

## State

The state object is reactive and shared by every caller.

| Property  | Type      | Description                                           |
| --------- | --------- | ----------------------------------------------------- |
| active    | `boolean` | Whether the progress bar is visible.                  |
| percent   | `number`  | Current completion percentage.                        |
| color     | `string`  | Fallback color used by the component.                 |
| timestamp | `number`  | Time at which the current progress operation started. |

## Available Methods

Calling `done()` while the bar is inactive has no effect unless `force` is `true`.

| Method         | Description                                                    |
| -------------- | -------------------------------------------------------------- |
| `start()`      | Activates the bar at 10% and advances it gradually toward 90%. |
| `done(force?)` | Advances to 100%, then hides and resets the bar.               |
| `fail()`       | Forces the same completion sequence after a failed operation.  |

> [!NOTE]
> Router visits control this state automatically. Manual controls are intended for asynchronous work
> that does not pass through the LAIKA router.
