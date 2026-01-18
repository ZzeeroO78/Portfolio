# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in World Time Zones, please email security details to the project maintainers instead of using the issue tracker.

**Please do not publicly disclose the vulnerability until a fix is available.**

## Security Features

### 1. Content Security
- No external dependencies loaded from CDN
- All assets are local or inline
- No inline scripts with user input
- No eval() or dynamic code execution

### 2. Data Security
- All data stored locally in browser (localStorage)
- No server transmission of user data
- No tracking or analytics by default
- No cookies (except Service Worker cache)

### 3. Network Security
- HTTPS recommended for deployment
- Security headers configured (.htaccess)
- X-Content-Type-Options: nosniff
- X-Frame-Options: SAMEORIGIN
- X-XSS-Protection enabled

### 4. Privacy
- No data collection
- No third-party services
- No user tracking
- Complete offline capability

## Security Best Practices

### For Deployment

1. **Use HTTPS**
   - Always deploy with HTTPS
   - Use valid SSL/TLS certificates

2. **Server Configuration**
   - Enable GZIP compression
   - Set proper cache headers
   - Enable security headers
   - Configure CORS if needed

3. **Regular Updates**
   - Keep dependencies updated
   - Monitor for security patches
   - Update Service Worker regularly

### For Users

1. **Browser Security**
   - Use updated browser
   - Enable auto-updates
   - Use privacy mode for sensitive info
   - Clear cache if concerned about storage

2. **Local Storage**
   - Data stored locally won't be transmitted
   - Use browser's private/incognito mode if needed
   - Clear browser data to remove stored cities

## Vulnerability Disclosure Timeline

- **Day 0**: Vulnerability reported to maintainers
- **Day 1-2**: Initial assessment and acknowledgment
- **Day 3-14**: Patch development and testing
- **Day 14+**: Public disclosure after patch release

## Current Security Status

### Implemented
- ✅ No external CDN dependencies
- ✅ Security headers configured
- ✅ GZIP compression enabled
- ✅ Cache headers optimized
- ✅ MIME types properly set
- ✅ Service Worker security
- ✅ XSS protection
- ✅ Clickjacking protection

### Recommended
- 🔒 Deploy with HTTPS
- 🔒 Use updated browser
- 🔒 Keep OS updated
- 🔒 Regular security audits

## Dependencies Security

### JavaScript Dependencies
- **None** - Pure vanilla JavaScript

### CSS Dependencies
- **None** - Pure CSS3

### External Services
- **None** - Fully self-contained

## Browser Compatibility & Security

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Secure |
| Firefox | 88+ | ✅ Secure |
| Safari | 14+ | ✅ Secure |
| Edge | 90+ | ✅ Secure |
| Mobile Chrome | Latest | ✅ Secure |
| Mobile Safari | Latest | ✅ Secure |

## Known Limitations

1. **Client-Side Only**
   - No server-side validation
   - All computation on user's device

2. **Offline Mode**
   - Service Worker may cache outdated data
   - Manual refresh needed for latest

3. **Local Storage**
   - Limited by browser storage quota
   - Not encrypted by default
   - Can be cleared by user

## Security Headers Implemented

```
X-UA-Compatible: IE=edge
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: (restricted access)
```

## Future Security Improvements

- [ ] Service Worker update verification
- [ ] Integrity checking for manifest files
- [ ] Enhanced offline security
- [ ] Optional data encryption
- [ ] Two-factor authentication (future)

## Security Testing

Regular testing includes:
- XSS vulnerability scanning
- CSRF protection verification
- Input validation testing
- Output encoding verification
- Dependency vulnerability checking

## Contact

For security concerns, contact the project maintainers directly.
Do not use GitHub issues for security vulnerabilities.

---

**Last Updated:** January 18, 2026
**Version:** 2.1
