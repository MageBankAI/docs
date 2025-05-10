# MageBank API Documentation

This repository contains comprehensive documentation for the MageBank API, built with [Mintlify](https://mintlify.com/).

## Getting Started

Follow these steps to set up and run the documentation locally:

### Prerequisites

- Node.js (version 19 or higher)
- npm or yarn

### Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/magebank-docs.git
cd magebank-docs
```

2. Install the Mintlify CLI:
```bash
npm install -g mintlify
```

3. Run the documentation locally:
```bash
mintlify dev
```

The documentation will be available at `http://localhost:3000`.

## Project Structure

```
magebank-docs/
├── README.md                      # This file
├── docs.json                      # Main configuration file
├── index.mdx                      # Homepage
├── quickstart.mdx                 # Quickstart guide
├── development.mdx                # Development guide
├── api-reference/                 # API reference documentation
│   ├── introduction.mdx           # API introduction
│   ├── openapi.json               # OpenAPI specification
│   ├── agents/                    # Agents API endpoints
│   ├── wallets/                   # Wallets API endpoints
│   ├── transactions/              # Transactions API endpoints
│   ├── investments/               # Investments API endpoints
│   ├── payments/                  # Payments API endpoints
│   ├── users/                     # Users API endpoints
│   └── savings/                   # Savings API endpoints
├── user-guide/                    # User guides
├── images/                        # Images for the documentation
├── logo/                          # Logo files
└── snippets/                      # Reusable content snippets
```

## Deployment

To deploy the documentation, follow these steps:

1. Push your changes to the main branch of your repository.
2. Connect your repository to [Mintlify](https://mintlify.com/).
3. Follow the deployment instructions on the Mintlify dashboard.

## Contributing

1. Create a new branch for your changes.
2. Make your changes and test them locally using `mintlify dev`.
3. Commit your changes and push them to your branch.
4. Create a pull request to merge your changes into the main branch.

## Customizing the Documentation

### Adding New Pages

1. Create a new `.mdx` file in the appropriate directory.
2. Add the page to the navigation in `docs.json`.

### Updating the OpenAPI Specification

1. Update the `api-reference/openapi.json` file with your changes.
2. Run `mintlify dev` to see the changes.

### Changing the Theme

Edit the `colors` section in `docs.json` to customize the theme:

```json
"colors": {
    "primary": "#FF5722",
    "light": "#FF7043",
    "dark": "#E64A19"
}
```

## Need Help?

If you need assistance with the documentation, please contact:

- Email: support@magebank.ai
- GitHub: Open an issue in this repository

## License

This documentation is provided under the [MIT License](LICENSE).