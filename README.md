[![CI](https://github.com/theluckystrike/webext-keyboard-shortcuts/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/webext-keyboard-shortcuts/actions)
[![npm](https://img.shields.io/npm/v/@theluckystrike/webext-keyboard-shortcuts)](https://www.npmjs.com/package/@theluckystrike/webext-keyboard-shortcuts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

# webext-keyboard-shortcuts

Keyboard shortcut manager for Chrome extensions — register hotkeys, detect key combos, check for conflicts with built-in browser shortcuts, and integrate seamlessly with the Chrome commands API. Works with Manifest V3.

## Install

```bash
npm install webext-keyboard-shortcuts
```

## Usage

```typescript
import { KeyboardShortcuts } from 'webext-keyboard-shortcuts';

// Create instance (automatically attaches keydown listener)
const shortcuts = new KeyboardShortcuts();

// Register keyboard shortcuts
shortcuts.register('Ctrl+Shift+S', () => {
  console.log('Save triggered!');
}, 'Save data');

shortcuts.register('Ctrl+K', () => {
  console.log('Quick search opened!');
}, 'Open quick search');

// Chain multiple registrations
shortcuts
  .register('Ctrl+S', () => save(), 'Save document')
  .register('Ctrl+Shift+F', () => find(), 'Find in page');

// Check for conflicts with Chrome's built-in shortcuts
const conflicts = shortcuts.getConflicts('Ctrl+T');
if (conflicts.length > 0) {
  console.warn('Shortcut conflicts with:', conflicts);
}

// Disable shortcuts when user is typing in an input
document.querySelector('input')?.addEventListener('focus', () => shortcuts.disable());
document.querySelector('input')?.addEventListener('blur', () => shortcuts.enable());

// Integrate with Chrome extension commands
KeyboardShortcuts.onCommand((command) => {
  console.log('Chrome command triggered:', command);
});

const commands = await KeyboardShortcuts.getCommands();
console.log('Registered Chrome commands:', commands);
```

## API Reference

### Types

#### `Shortcut`

```typescript
interface Shortcut {
  keys: string;           // Key combo (e.g., "Ctrl+Shift+S")
  action: () => void;    // Callback function to execute
  description?: string;  // Optional description for UI display
}
```

### Class: `KeyboardShortcuts`

Creates a new keyboard shortcut manager. Automatically attaches a `keydown` event listener to the document.

```typescript
const shortcuts = new KeyboardShortcuts();
```

#### Methods

| Method | Description |
|--------|-------------|
| `register(keys, action, description?)` | Register a keyboard shortcut. Returns `this` for method chaining. |
| `unregister(keys)` | Remove a previously registered shortcut. |
| `getAll()` | Returns all registered `Shortcut` objects as an array. |
| `enable()` | Enable all shortcuts. |
| `disable()` | Disable all shortcuts (useful when user is typing in input fields). |
| `getConflicts(keys)` | Check for conflicts with built-in Chrome shortcuts. Returns an array of conflicting shortcuts. |

#### Static Methods

| Method | Description |
|--------|-------------|
| `KeyboardShortcuts.onCommand(callback)` | Listen for Chrome extension command events via `chrome.commands.onCommand`. |
| `KeyboardShortcuts.getCommands()` | Get all registered Chrome extension commands from the manifest. Returns a Promise. |

### Key Format

Keys are case-insensitive and whitespace is stripped during normalization. The library maps `Meta` and `Cmd` to `Ctrl` for cross-platform compatibility.

**Valid examples:**
- `Ctrl+S`
- `Ctrl+Shift+K`
- `Alt+H`
- `Cmd+Shift+S` (treated as `Ctrl+Shift+S`)
- `F5`

## Requirements

- TypeScript 5.3+
- A browser environment with DOM access (content scripts, popups, options pages)
- For static methods, the `chrome.commands` API must be available

## Chrome Extension Guide

For more information on keyboard shortcuts in Chrome extensions, see the official [Chrome Extension Commands documentation](https://developer.chrome.com/docs/extensions/mv3/commands/).

## Development

```bash
git clone https://github.com/theluckystrike/webext-keyboard-shortcuts.git
cd webext-keyboard-shortcuts
npm install
npm run build
npm test
```

## License

MIT

---
Built by [theluckystrike](https://github.com/theluckystrike) — [zovo.one](https://zovo.one)
