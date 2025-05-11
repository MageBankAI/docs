# MageBank API Documentation

<p align="center">
  <img src="/logo/favicon.ico" alt="MageBank Logo" width="100" height="100"/>
</p>

<p align="center">
  <b>Financial infrastructure for AI agents</b>
</p>

<p align="center">
  <a href="https://www.magebank.ai/dashboard">Dashboard</a> • 
  <a href="https://api.magebank.ai">API Reference</a> • 
  <a href="mailto:contact@magebank.ai">Support</a>
</p>

## 🏦 About MageBank

MageBank is a multi-agentic economy bank where AI agents can manage, grow, and transact their wealth. Built specifically for AI agents trusted by humans, MageBank connects to every bank, wallet, and network on Earth, providing the financial infrastructure needed to power the emerging agent economy.

## 📚 Documentation Overview

This repository contains the official MageBank API documentation, built with [Mintlify](https://mintlify.com/). Our comprehensive documentation covers:

- **Agent Management**: Create and manage AI financial agents
- **Wallet Operations**: Handle deposits, withdrawals, and transfers
- **Payments API**: Process financial transactions between agents
- **Savings Vault**: Optimize holdings and earn yield on USDC
- **Multi-Agent Communication**: Integration with MCP servers and Google's A2A framework

## 🚀 Getting Started

### Prerequisites

- Node.js (version 19 or higher)
- npm or yarn

### Installation

1. Clone this repository:
```bash
git clone https://github.com/MageBankAI/magebank-docs.git
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

## 🧩 Project Structure

```
magebank-docs/
├── README.md                      # This file
├── docs.json                      # Main configuration file
├── index.mdx                      # Homepage
├── mcp-and-a2a.mdx                # Agent-to-Agent integration
├── api-reference/                 # API reference documentation
│   ├── introduction.mdx           # API introduction
│   ├── openapi.json               # OpenAPI specification
│   ├── agents/                    # Agents API endpoints
│   ├── payments/                  # Payments API endpoints
│   ├── users/                     # Users API endpoints
│   ├── savings/                   # Savings API endpoints
│   └── transactions/              # Transactions API endpoints
├── user-guide/                    # User guides
├── images/                        # Images for the documentation
├── logo/                          # Logo files
└── snippets/                      # Reusable content snippets
```

## 🔧 Customizing the Documentation

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

## 🤝 Contributing

1. Create a new branch for your changes.
2. Make your changes and test them locally using `mintlify dev`.
3. Commit your changes and push them to your branch.
4. Create a pull request to merge your changes into the main branch.

## 🔒 Sandbox Mode Notice

We are currently in sandbox mode. Only agent-to-agent transactions are currently supported, with agent-to-bank account, agent-to-businesses, and agent-to-checkout pages coming soon.

## 📝 License

This documentation is provided under the [MIT License](LICENSE).

## 📞 Need Help?

If you need assistance with the documentation, please contact:

- Email: [contact@magebank.ai](mailto:contact@magebank.ai)
- GitHub: Open an issue in this repository