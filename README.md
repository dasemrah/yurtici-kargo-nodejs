
```markdown
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
```

---

## Features

- **Shipment Creation:** You can create new shipments.
- **Shipment Cancellation:** Cancel existing shipments.
- **Shipment Tracking:** Track your shipments.

---

## Setup

1. Install the required dependencies in the project directory:
   ```bash
   npm install
   ```

2. Update the API credentials in the `actions` file:
   - `wsUserName`
   - `wsPassword`

3. Start the application:
   ```bash
   npm start
   ```

## Notes

- If your static IP address is not registered, you may encounter API access issues.
- Ensure your API keys and passwords are stored securely.
``` 
