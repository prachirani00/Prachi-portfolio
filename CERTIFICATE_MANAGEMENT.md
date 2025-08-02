# Certificate Links Management Guide

## How to Add Your Certificate Links

### Step 1: Open script.js
Navigate to the `initializeCertificates()` function (around line 136)

### Step 2: Update Certificate URLs
Replace the placeholder URLs with your actual certificate links:

```javascript
const certificateLinks = {
  aws: 'https://your-actual-aws-certificate-link.com',
  'ccna-enterprise': 'https://your-actual-ccna-enterprise-link.com',
  'ccna-intro': 'https://your-actual-ccna-intro-link.com',
  'ccna-switching': 'https://your-actual-ccna-switching-link.com',
  cybersecurity: 'https://your-actual-cybersecurity-link.com',
  python1: 'https://your-actual-python1-link.com',
  python2: 'https://your-actual-python2-link.com'
};
```

## Current Certificates in Portfolio

1. **AWS Academy Graduate - AWS Cloud Foundations** (`aws`)
   - Icon: AWS logo
   - Issued: Dec 3, 2024
   - Issuer: Amazon Web Services

2. **CCNA: Enterprise Networking, Security, and Automation** (`ccna-enterprise`)
   - Icon: Network icon
   - Issued: Jun 11, 2025
   - Issuer: Cisco Networking Academy

3. **CCNA: Introduction to Networks** (`ccna-intro`)
   - Icon: Network icon
   - Issued: Jun 7, 2025
   - Issuer: Cisco Networking Academy

4. **CCNA: Switching, Routing, and Wireless Essentials** (`ccna-switching`)
   - Icon: WiFi icon
   - Issued: Jun 7, 2025
   - Issuer: Cisco Networking Academy

5. **Introduction to Cybersecurity** (`cybersecurity`)
   - Icon: Shield icon
   - Issued: May 21, 2025
   - Issuer: Cisco Networking Academy

6. **Python Essentials 1** (`python1`)
   - Icon: Python logo
   - Issued: May 20, 2025
   - Issuer: Cisco Networking Academy

7. **Python Essentials 2** (`python2`)
   - Icon: Python logo
   - Issued: May 21, 2025
   - Issuer: Cisco Networking Academy

## Adding New Certificates

### To add a new certificate:

1. **Update HTML** (in index.html around line 373):
```html
<div class="cert-item">
  <i class="fas fa-your-icon"></i>
  <div>
    <h3>Your Certificate Name</h3>
    <p>Certificate description</p>
    <a href="#" class="cert-link" data-cert="your-cert-key">View Certificate</a>
  </div>
</div>
```

2. **Update JavaScript** (in script.js):
```javascript
const certificateLinks = {
  // ... existing certificates
  'your-cert-key': 'https://your-certificate-link.com'
};
```

## Certificate Link Types

- **Direct PDF links**: `https://example.com/certificate.pdf`
- **Credential platforms**: Coursera, edX, Udemy, etc.
- **Verification pages**: LinkedIn Learning, AWS, Google, etc.
- **GitHub repositories**: For project-based certificates

## Tips

- Use short, memorable keys for certificate IDs
- Ensure links open in new tabs (automatically handled)
- Test links before updating the live site
- Keep backup copies of certificates
- Consider using a credential management platform

## Styling

The certificates use a consistent design with:
- Hover effects that lift the certificate
- Icon representing the technology/platform
- Clean, professional styling
- Color scheme matching your portfolio theme
