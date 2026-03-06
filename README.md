# webext-keyboard-shortcuts

Keyboard shortcut manager for Chrome and browser extensions. Register hotkeys with combo detection, check for conflicts with built-in browser shortcuts, and integrate with the Chrome commands API. Works with Manifest V3.

INSTALL

```
npm install webext-keyboard-shortcuts
```

QUICK START

```typescript
import { KeyboardShortcuts } from 'webext-keyboard-shortcuts';

const shortcuts = new KeyboardShortcuts();

shortcuts.register('Ctrl+Shift+S', () => saveData(), 'Save data');
shortcuts.register('Ctrl+K', () => openSearch(), 'Quick search');
```

API

The library exports the KeyboardShortcuts class and the Shortcut type.

Shortcut type

```typescript
interface Shortcut {
  keys: string;
  action: () => void;
  description?: string;
}
```

KeyboardShortcuts class

Creating an instance automatically attaches a keydown listener to the document.

```typescript
const shortcuts = new KeyboardShortcuts();
```

register(keys, action, description?)

Register a keyboard shortcut. Keys use a plus-separated format like "Ctrl+Shift+S". Modifier keys are normalized so that Meta and Cmd are treated as Ctrl. Returns the instance for chaining.

```typescript
shortcuts
  .register('Ctrl+S', () => save(), 'Save')
  .register('Ctrl+Shift+F', () => find(), 'Find in page');
```

unregister(keys)

Remove a previously registered shortcut.

```typescript
shortcuts.unregister('Ctrl+S');
```

getAll()

Returns an array of all registered Shortcut objects.

```typescript
const all = shortcuts.getAll();
```

enable() / disable()

Toggle whether shortcuts fire. Useful when the user is typing in an input field.

```typescript
shortcuts.disable();
// later
shortcuts.enable();
```

getConflicts(keys)

Check if a key combo conflicts with common Chrome built-in shortcuts such as Ctrl+T, Ctrl+W, F5, F11, F12, and others. Returns an array of matching Chrome shortcuts.

```typescript
const conflicts = shortcuts.getConflicts('Ctrl+T');
// ['Ctrl+T']
```

KeyboardShortcuts.onCommand(callback) (static)

Listen for Chrome extension command events via chrome.commands.onCommand.

```typescript
KeyboardShortcuts.onCommand((command) => {
  console.log('Command received', command);
});
```

KeyboardShortcuts.getCommands() (static)

Get all registered Chrome extension commands from the manifest.

```typescript
const commands = await KeyboardShortcuts.getCommands();
```

KEY FORMAT

Keys are case-insensitive and whitespace is stripped during normalization. The library maps Meta and Cmd to Ctrl so shortcuts work across platforms.

Valid examples

- Ctrl+S
- Ctrl+Shift+K
- Alt+H
- Cmd+Shift+S (treated as Ctrl+Shift+S)
- F5

REQUIREMENTS

- TypeScript 5.3+
- A browser environment with DOM access (content scripts, popups, options pages)
- For static methods, the chrome.commands API must be available

DEVELOPMENT

```
git clone https://github.com/theluckystrike/webext-keyboard-shortcuts.git
cd webext-keyboard-shortcuts
npm install
npm run build
npm test
```

LICENSE

MIT. See LICENSE file.

ABOUT

Built by theluckystrike. Part of the Zovo project at zovo.one.
