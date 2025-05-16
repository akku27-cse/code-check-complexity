import * as vscode from 'vscode';

class ComplexityFileDecorationProvider implements vscode.FileDecorationProvider {
    private _onDidChangeFileDecorations: vscode.EventEmitter<vscode.Uri | vscode.Uri[] | undefined> =
        new vscode.EventEmitter<vscode.Uri | vscode.Uri[] | undefined>();
    readonly onDidChangeFileDecorations: vscode.Event<vscode.Uri | vscode.Uri[] | undefined> =
        this._onDidChangeFileDecorations.event;

    private complexityData: Map<string, { level: 'low' | 'medium' | 'high'; percentage: number }> = new Map();

    updateComplexity(uri: vscode.Uri, level: 'low' | 'medium' | 'high', percentage: number) {
        this.complexityData.set(uri.toString(), { level, percentage });
        this._onDidChangeFileDecorations.fire(uri);
    }

    provideFileDecoration(uri: vscode.Uri): vscode.ProviderResult<vscode.FileDecoration> {
        const data = this.complexityData.get(uri.toString());
        if (!data) {
            return null;
        }

        let badge = 'L';
        let color = new vscode.ThemeColor('charts.green');
        let tooltip = `Complexity: ${data.percentage}% (Low)`;

        if (data.level === 'medium') {
            badge = 'M';
            color = new vscode.ThemeColor('charts.blue');
            tooltip = `Complexity: ${data.percentage}% (Medium)`;
        } else if (data.level === 'high') {
            badge = 'H';
            color = new vscode.ThemeColor('charts.red');
            tooltip = `Complexity: ${data.percentage}% (High)`;
        }

        return {
            badge,
            color,
            tooltip
        };
    }
}

export function activate(context: vscode.ExtensionContext) {
    console.log('Code Check Complexity extension is now active!');

    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = 'codeCheckComplexity.analyze';
    context.subscriptions.push(statusBarItem);

    const decorationProvider = new ComplexityFileDecorationProvider();
    context.subscriptions.push(vscode.window.registerFileDecorationProvider(decorationProvider));

    let lowDecorationType = vscode.window.createTextEditorDecorationType({
        isWholeLine: true,
        borderColor: new vscode.ThemeColor('charts.green'),
        borderStyle: 'solid',
        borderWidth: '0 0 2px 0'
    });

    let mediumDecorationType = vscode.window.createTextEditorDecorationType({
        isWholeLine: true,
        borderColor: new vscode.ThemeColor('charts.blue'),
        borderStyle: 'solid',
        borderWidth: '0 0 2px 0'
    });

    let highDecorationType = vscode.window.createTextEditorDecorationType({
        isWholeLine: true,
        borderColor: new vscode.ThemeColor('charts.red'),
        borderStyle: 'solid',
        borderWidth: '0 0 2px 0'
    });

    function analyzeComplexity(text: string): number {
        const matches = text.match(/\b(if|for|while|function|switch|case|catch|try|else if|else)\b/g);
        return matches ? Math.min(matches.length * 10, 100) : 5;
    }

    function getComplexityLevel(value: number): 'low' | 'medium' | 'high' {
        if (value < 40) {
            return 'low';
        } else if (value >= 40 && value <= 70) {
            return 'medium';
        } else {
            return 'high';
        }
    }

    function analyzeActiveDocument() {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showWarningMessage('No active editor found');
            return;
        }

        const text = editor.document.getText();
        const percentage = analyzeComplexity(text);
        const level = getComplexityLevel(percentage);

        // Update status bar
        statusBarItem.text = `Complexity: ${percentage}%`;
        statusBarItem.tooltip = `Code complexity level: ${level}`;
        
        if (level === 'low') {
            statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');
        } else if (level === 'medium') {
            statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.errorBackground');
        } else {
            statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.prominentBackground');
        }
        
        statusBarItem.show();

        // Update gutter decorations
        const range = new vscode.Range(
            new vscode.Position(0, 0),
            new vscode.Position(editor.document.lineCount - 1, 0)
        );

        const decorationOptions: vscode.DecorationOptions[] = [{
            range
        }];

        editor.setDecorations(lowDecorationType, []);
        editor.setDecorations(mediumDecorationType, []);
        editor.setDecorations(highDecorationType, []);

        if (level === 'low') {
            editor.setDecorations(lowDecorationType, decorationOptions);
        } else if (level === 'medium') {
            editor.setDecorations(mediumDecorationType, decorationOptions);
        } else {
            editor.setDecorations(highDecorationType, decorationOptions);
        }

        // Update file decoration
        decorationProvider.updateComplexity(editor.document.uri, level, percentage);
    }

    // Register command
    let disposable = vscode.commands.registerCommand('codeCheckComplexity.analyze', () => {
        analyzeActiveDocument();
    });

    context.subscriptions.push(disposable);

    // Auto-analyze when document changes
    vscode.workspace.onDidSaveTextDocument(() => {
        analyzeActiveDocument();
    });

    vscode.window.onDidChangeActiveTextEditor(() => {
        analyzeActiveDocument();
    });

    // Initial analysis if there's an active editor
    if (vscode.window.activeTextEditor) {
        analyzeActiveDocument();
    }
}

export function deactivate() {
    console.log('Code Check Complexity extension is now deactivated');
}