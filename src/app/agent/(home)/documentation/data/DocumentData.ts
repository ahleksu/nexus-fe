export const documentData: Documentation[] = [
    {
        title: "No Internet Connection",
        content: `## Troubleshooting Steps

### 1. Check Physical Connections
- Ensure all cables are securely plugged in
- Verify modem/router lights are on (power, DSL/coax, internet)
- Try unplugging and replugging power to modem/router

### 2. Restart Your Equipment
\`\`\`bash
1. Power off modem and router
2. Wait 30 seconds
3. Power on modem first, wait for lights to stabilize
4. Then power on router
\`\`\`

### 3. Check for Outages
Visit [our status page](#) or call 1-800-ISP-HELP

### Common Error Codes:
| Code | Meaning | Solution |
|------|---------|----------|
| ERR_NETWORK | Connection failed | Restart device |
| DNS_PROBE | DNS issues | Try Google DNS (8.8.8.8) |`,
        rank: 1
    },
    {
        title: "Slow Internet Speeds",
        content: `## Diagnosing Speed Issues

### Speed Test
Run a test at [speedtest.net](https://speedtest.net):
\`\`\`
Expected: 100Mbps download / 10Mbps upload
Actual: [Your results will show here]
\`\`\`

### Potential Causes:
- Too many connected devices (limit: 10-15 per router)
- WiFi interference (try changing channels)
- Old equipment (modems older than 3 years)

### Optimization Tips:
1. Use 5GHz band for closer devices
2. Position router centrally
3. Update router firmware`,
        rank: 2
    },
    {
        title: "WiFi Connection Drops",
        content: `## Fixing Intermittent WiFi

### Quick Fixes:
- Move closer to router
- Reduce interference from:
  - Microwaves
  - Baby monitors
  - Cordless phones

### Advanced Solutions:
\`\`\`bash
# Change WiFi channel (for advanced users):
1. Login to router admin (192.168.1.1)
2. Navigate to Wireless Settings
3. Try channels 1, 6, or 11 (for 2.4GHz)
\`\`\`

### Recommended Router Settings:
- Security: WPA2-PSK (AES)
- Channel width: 20MHz for 2.4GHz
- DHCP enabled`,
        rank: 3
    },
    {
        title: "Modem Not Syncing",
        content: `## DSL/Cable Light Blinking

### Indicator Lights Guide:
| Light | Status | Meaning |
|-------|--------|---------|
| Power | Solid | Normal |
| DSL   | Blinking | Connecting |
| Internet | Off | No sync |

### Reset Procedure:
1. Press and hold reset button for 30 seconds
2. Wait 5 minutes for full reboot
3. Check lights:
   - Solid DSL = Good
   - Blinking >10min = Call support

### Line Test:
\`\`\`bash
# For modem diagnostic page:
Open http://192.168.100.1
Check SNR margin (should be >10dB)
\`\`\``,
        rank: 4
    },
    {
        title: "Email Setup Guide",
        content: `## Configuring Email Clients

### IMAP Settings:
\`\`\`
Incoming Server: mail.isp.com
Port: 993 (SSL)
Username: full@email.com
Password: yourpassword

Outgoing Server: smtp.isp.com
Port: 465 (SSL)
\`\`\`

### Common Errors:
- **Authentication failed**: Reset password at [ISP Portal](#)
- **Connection timeout**: Verify ports and SSL settings
- **Sent mail not saving**: Enable "Sent items" folder sync

### Mobile Setup:
1. Delete existing account
2. Add as new account
3. Select "Manual setup"
4. Enter settings above`,
        rank: 5
    },
    {
        title: "TV Service Issues",
        content: `## Troubleshooting TV Service

### No Signal Flowchart:
\`\`\`
1. Check cable connections → Reseat coax
2. Reboot set-top box → Hold power 10sec
3. Test different TV input → Rule out TV issue
4. Call support if unresolved
\`\`\`

### Error Codes:
| Code | Solution |
|------|----------|
| ERR-100 | Refresh signal (menu → system → refresh) |
| ERR-200 | Factory reset (last resort) |
| ERR-300 | Replace HDMI cable |

### Signal Strength:
- Ideal: -6dBmV to +6dBmV
- Check: Menu → Diagnostics → Signal`,
        rank: 6
    }
];