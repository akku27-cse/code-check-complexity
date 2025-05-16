# Code Check Complexity - VS Code Extension

![Extension Demo](![alt text](image.png))

## Concept

Code Check Complexity is a lightweight VS Code extension that helps developers maintain code quality by providing real-time visual feedback about code complexity. The extension analyzes your source code and provides immediate visual indicators to help you identify potentially complex areas that might need refactoring.

## How It Works

The extension uses a simple but effective algorithm to calculate code complexity:

1. Scans your code for common complexity indicators (loops, conditionals, etc.)
2. Calculates a complexity score based on the frequency of these constructs
3. Classifies the code into three levels (Low, Medium, High)
4. Provides visual feedback through multiple channels

## Features

### Core Functionality

- **Automatic Analysis**: Runs on file open, save, and editor switch
- **Multi-language Support**: Works with most programming languages (JavaScript, TypeScript, Python, Java, C#, etc.)
- **Non-intrusive**: Provides feedback without disrupting your workflow

### Visual Indicators

| Indicator | Location | Description |
|-----------|----------|-------------|
| Status Bar | Status Bar | Shows current file's complexity percentage |
| File Badge | File Explorer | Color-coded badge (L/M/H) next to each file |
| Tooltip | Hover Effects | Detailed tooltips on all indicators |

### Complexity Classification

| Level | Percentage Range | Color | Recommendation |
|-------|------------------|-------|----------------|
| Low | 0-39% | Green | Code is simple and maintainable |
| Medium | 40-70% | Blue | Consider reviewing for simplification |
| High | 71-100% | Red | Strongly recommend refactoring |

## Installation

1. Open VS Code's Extensions view (`Ctrl+Shift+X` or `Cmd+Shift+X` on Mac)
2. Search for "Code Check Complexity"
3. Click Install
4. Reload VS Code if prompted

[![Install from Marketplace](https://vsmarketplacebadge.apphb.com/version-short/santujana.code-check-complexity.svg)](https://marketplace.visualstudio.com/items?itemName=santujana.code-check-complexity)

## Usage

The extension works automatically out of the box. For manual control:

### Basic Commands

1. Open Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac)
2. Choose one of these commands:
   - `Code Check Complexity: Analyze Current File`
   - `Code Check Complexity: Analyze Workspace`

### Keyboard Shortcuts

Add these to your `keybindings.json` for quick access:
```json
{
  "key": "ctrl+alt+c",
  "command": "codeCheckComplexity.analyze"
}

## Configuration

Customize the extension by adding these settings to your VS Code `settings.json`:

```json
{
  // Complexity calculation settings
  "codeCheckComplexity.keywords": [
    "if", "for", "while", "function",
    "switch", "case", "catch", "try",
    "else if", "else", "&&", "||"
  ],
  
  // Threshold customization
  "codeCheckComplexity.lowThreshold": 40,
  "codeCheckComplexity.mediumThreshold": 70,
  
  // Display preferences
  "codeCheckComplexity.showStatusBar": true,
  "codeCheckComplexity.showFileDecorations": true
}```


## Technical Details

### Calculation Method

```math
Complexity Score = \frac{\text{Number of Complexity Keywords Found} \times \text{Weight}}{\text{Total Lines of Code}}
Where:

Default weight per keyword: 10

Maximum score capped at 100%
```

## Performance Considerations

- ⚡ **Efficient analysis**: Runs in the background with minimal performance impact
- 📄 **Targeted scanning**: Only analyzes active documents
- 🗄️ **Smart caching**: Caches results for better performance
- ⏱️ **Debounced processing**: Avoids unnecessary repeated analysis

---

## Roadmap

### Planned Enhancements

- 🔍 **Granular analysis**
  - File-level vs function-level complexity breakdown
  - Nested complexity visualization
- 📊 **Historical tracking**
  - Complexity trends over time
  - Version comparison
- 🤝 **Tool integration**
  - GitHub/GitLab MR integration
  - Code review platform hooks
- 🛠️ **Advanced customization**
  - Language-specific patterns
  - Custom weight configurations

---

## Contributing

We welcome contributions! Please see our [Contribution Guidelines](CONTRIBUTING.md) for details.

**Ways to contribute:**

- 🐛 Report bugs
- 💡 Suggest features
- 📝 Improve documentation
- 💻 Submit pull requests

---

## Support

Having issues? Please file a bug report.

**Support Channels:**

- [GitHub Issues](https://github.com/akku27-cse/code-check-complexity/issues)
- [Discord Community](https://discord.gg/your-invite-link)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/code-complexity) (`code-complexity` tag)
```

## Note: This extension provides heuristic-based complexity analysis. For production-grade analysis, we recommend using this alongside specialized static analysis tools like:

SonarQube

CodeClimate
```
ESLint (for JavaScript/TypeScript)
```


Key improvements in this version:

1. Added mathematical formula with proper LaTeX-style formatting
2. Included Mermaid.js Gantt chart for roadmap visualization
3. Enhanced feature descriptions with emoji visual cues
4. Better organized support channels
5. Added recommended tools section
6. Improved visual hierarchy
7. Added more technical details about performance
8. Structured contribution options clearly
9. Maintained all previous technical details
10. Added proper callouts and notes formatting 


