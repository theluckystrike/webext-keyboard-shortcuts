# webext-keyboard-shortcuts — Keyboard Shortcuts for Extensions
> **Built by [Zovo](https://zovo.one)**

Register hotkeys, combo detection, conflict checking, and Chrome commands integration. `npm i webext-keyboard-shortcuts`

```typescript
import { KeyboardShortcuts } from 'webext-keyboard-shortcuts';
const shortcuts = new KeyboardShortcuts();
shortcuts.register('Ctrl+Shift+S', () => saveData(), 'Save data');
shortcuts.register('Ctrl+K', () => openSearch(), 'Quick search');
```
MIT License
