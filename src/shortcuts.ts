/**
 * Keyboard Shortcuts — Register and manage keyboard shortcuts
 */
export interface Shortcut { keys: string; action: () => void; description?: string; }

export class KeyboardShortcuts {
    private shortcuts = new Map<string, Shortcut>();
    private active = true;

    constructor() { document.addEventListener('keydown', (e) => this.handleKeydown(e)); }

    /** Register a shortcut (e.g. "Ctrl+Shift+S") */
    register(keys: string, action: () => void, description?: string): this {
        this.shortcuts.set(this.normalize(keys), { keys, action, description });
        return this;
    }

    /** Unregister a shortcut */
    unregister(keys: string): void { this.shortcuts.delete(this.normalize(keys)); }

    /** Get all registered shortcuts */
    getAll(): Shortcut[] { return Array.from(this.shortcuts.values()); }

    /** Enable/disable all shortcuts */
    enable(): void { this.active = true; }
    disable(): void { this.active = false; }

    /** Check for conflicts with built-in Chrome shortcuts */
    getConflicts(keys: string): string[] {
        const chromeShortcuts = ['Ctrl+T', 'Ctrl+W', 'Ctrl+N', 'Ctrl+Tab', 'Ctrl+Shift+T', 'Ctrl+L', 'Ctrl+H', 'Ctrl+J', 'Ctrl+D', 'F5', 'F11', 'F12'];
        const norm = this.normalize(keys);
        return chromeShortcuts.filter((s) => this.normalize(s) === norm);
    }

    /** Listen for Chrome extension commands */
    static onCommand(callback: (command: string) => void): void {
        chrome.commands?.onCommand.addListener(callback);
    }

    /** Get all registered Chrome commands */
    static async getCommands(): Promise<chrome.commands.Command[]> {
        return chrome.commands?.getAll() || [];
    }

    private handleKeydown(e: KeyboardEvent): void {
        if (!this.active) return;
        const parts: string[] = [];
        if (e.ctrlKey || e.metaKey) parts.push('ctrl');
        if (e.shiftKey) parts.push('shift');
        if (e.altKey) parts.push('alt');
        if (e.key.length === 1) parts.push(e.key.toLowerCase());
        else parts.push(e.key.toLowerCase());

        const combo = parts.join('+');
        const shortcut = this.shortcuts.get(combo);
        if (shortcut) { e.preventDefault(); shortcut.action(); }
    }

    private normalize(keys: string): string {
        return keys.toLowerCase().replace(/\s/g, '').replace('meta', 'ctrl').replace('cmd', 'ctrl').split('+').sort().join('+');
    }
}
