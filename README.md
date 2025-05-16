# Code Check Complexity - VS Code Extension

![Extension Demo](https://via.placeholder.com/800x400?text=Demo+Screenshot+Here)

A VS Code extension that analyzes code complexity and provides visual feedback through status bar indicators, gutter decorations, and file explorer badges.

## Features

- **Real-time Complexity Analysis**: Automatically analyzes your code as you work
- **Visual Feedback**:
  - Status bar percentage indicator
  - Color-coded gutter decorations (green/blue/red)
  - File explorer badges (L/M/H)
- **Multiple Language Support**: Works with JavaScript, TypeScript, Python, Java, and more
- **Customizable Thresholds**: Configure your own complexity thresholds

## Installation

1. Open VS Code
2. Go to the Extensions view (`Ctrl+Shift+X`)
3. Search for "Code Check Complexity"
4. Click Install

Alternatively, you can install from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=yourname.code-check-complexity).

## Usage

The extension works automatically when you:
- Open a file
- Save a file
- Switch between files

### Manual Analysis

You can manually trigger analysis:
1. Open the Command Palette (`Ctrl+Shift+P`)
2. Type "Analyze Code Complexity"
3. Press Enter

### Understanding the Indicators

| Indicator | Complexity Level | Color | Description |
|-----------|------------------|-------|-------------|
| L | Low (<40%) | Green | Simple, easy to understand code |
| M | Medium (40-70%) | Blue | Moderately complex code |
| H | High (>70%) | Red | Complex code that may need refactoring |

## Configuration

You can customize the extension behavior by adding these settings to your VS Code `settings.json`:

```json
{
  "codeCheckComplexity.keywords": [
    "if", "for", "while", "function", 
    "switch", "case", "catch", "try",
    "else if", "else"
  ],
  "codeCheckComplexity.lowThreshold": 40,
  "codeCheckComplexity.mediumThreshold": 70
}
