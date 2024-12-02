# Yurtiçi Kargo API Integration

This application allows you to create, cancel, and track shipments for **Yurtiçi Kargo**.

---

## Requirements

- **Static IP Address:** It is recommended to register your server's **static IP address** with Yurtiçi Kargo for a more reliable connection when making API calls.
- **API Credentials:** Add the API username and password provided by Yurtiçi Kargo to the application.

---

## API Configuration

You need to add the API credentials provided by Yurtiçi Kargo to the relevant sections in the `actions` file.

Below is a sample configuration:

```javascript
const cargoApiKey = {
    wsUserName: 'your_api_username', // API username provided by Yurtiçi Kargo
    wsPassword: 'your_api_password', // API password provided by Yurtiçi Kargo
    wsLanguage: 'TR' // Communication language (Default: Turkish)
}
