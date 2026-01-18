# Contributing to World Time Zones

Thank you for your interest in contributing to World Time Zones! This document provides guidelines for contributing to the project.

## How to Contribute

### Reporting Issues
- Check if the issue already exists
- Provide a clear description of the problem
- Include steps to reproduce
- Specify your browser and operating system

### Suggesting Enhancements
- Use a clear and descriptive title
- Provide a detailed description
- Explain the current behavior vs. expected behavior
- Include mockups or examples if applicable

### Submitting Changes

1. **Fork the repository** on GitHub
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Make your changes** with clear commit messages
4. **Test thoroughly** in different browsers and devices
5. **Push to your fork** (`git push origin feature/AmazingFeature`)
6. **Submit a Pull Request** with a clear description

## Development Setup

### Prerequisites
- Git
- A modern web browser
- Text editor (VS Code recommended)
- Python 3 for local testing

### Running Locally
```bash
# Clone the repository
git clone https://github.com/ZzeeroO78/Portfolio.git
cd world-time-app

# Start local server
python3 -m http.server 8000

# Open in browser
# http://localhost:8000
```

## Code Style Guidelines

### JavaScript
- Use `const` by default, `let` for reassignment
- Write clear variable names
- Comment complex logic
- Use arrow functions for callbacks
- Maintain consistent indentation (2 spaces)

### CSS
- Use CSS variables for colors and spacing
- Follow mobile-first approach
- Use meaningful class names
- Keep specificity low
- Organize by component

### HTML
- Use semantic HTML5 elements
- Include proper meta tags
- Write accessible markup (alt text, ARIA labels)
- Keep structure clean and readable

## Testing Checklist

Before submitting a PR, ensure:
- [ ] Works in Chrome/Firefox/Safari/Edge
- [ ] Responsive on mobile, tablet, desktop
- [ ] Dark mode works correctly
- [ ] All features function as expected
- [ ] No console errors
- [ ] Keyboard navigation works
- [ ] Images and icons display correctly
- [ ] Performance is acceptable

## Adding Cities

To add cities to the database:

1. Edit `script.js` and find the `citiesDatabase` object
2. Add cities in alphabetical order within their region
3. Use proper timezone identifiers from [IANA Timezone Database](https://www.iana.org/time-zones)
4. Format: `'city name': 'Region/Timezone'`
5. Test that the city is searchable and works correctly

Example:
```javascript
'sarajevo': 'Europe/Sarajevo',
'zagreb': 'Europe/Zagreb',
```

## File Structure

```
world-time-app/
├── index.html           # Main HTML file
├── styles.css           # Styling
├── script.js            # Main application logic
├── manifest.json        # PWA configuration
├── sw.js                # Service Worker
├── updater.js           # Update notifier
├── .htaccess            # Server configuration
├── robots.txt           # SEO
├── sitemap.xml          # SEO
├── README.md            # Documentation
└── .gitignore           # Git configuration
```

## Performance Considerations

- Minimize DOM manipulation
- Use debouncing for frequent events
- Optimize images (use SVG when possible)
- Cache API responses
- Lazy load non-critical resources
- Avoid blocking operations

## Accessibility

- Ensure color contrast meets WCAG standards
- Use semantic HTML
- Include alt text for images
- Support keyboard navigation
- Test with screen readers
- Keep font sizes readable

## Commit Messages

Write clear commit messages:
- Use present tense ("Add feature" not "Added feature")
- Be specific and descriptive
- Reference issues when applicable
- Example: `feat: Add 50 new cities to Asia region`

## Pull Request Process

1. Update documentation if needed
2. Add/update tests if applicable
3. Follow code style guidelines
4. Provide clear PR description
5. Link related issues
6. Be responsive to feedback

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

## Questions?

- Open an issue for questions
- Check existing documentation
- Review closed issues for similar questions

Thank you for making World Time Zones better! 🌍
