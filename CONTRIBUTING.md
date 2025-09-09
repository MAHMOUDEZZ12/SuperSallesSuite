# Contributing to selltoday.ai

First off, thank you for considering contributing! This project is designed to be a modular and extensible platform, and your contributions are welcome.

## Core Architecture

Before you start, please familiarize yourself with the core concepts outlined in the `README.md`. Understanding how **Projects**, **Brand Kit**, and **Storage** interact with **Service Cards** is key to developing new features.

- **Frontend**: Next.js with ShadCN UI components.
- **AI Backend**: Genkit with Gemini models.
- **Database**: Firestore.

## Adding a New Service Card (AI Tool)

Adding a new tool is the most common way to contribute. The process is designed to be straightforward:

### Step 1: Create the AI Flow

- All AI logic lives in `src/ai/flows/`.
- Create a new file for your tool, e.g., `src/ai/flows/my-new-tool.ts`.
- Use `zod` to define the `inputSchema` and `outputSchema` for your flow. This provides type safety and is used to auto-generate the UI.
- Use `ai.defineFlow()` to wrap your logic. This is where you'll call the Gemini models.
- Export your flow function and its input/output types.

### Step 2: Define the Client-Side Tool

- Open `src/lib/tools-client.tsx`.
- Add a new `Feature` object to the `tools` array. This object defines how the tool appears in the UI.
- **id**: A unique, URL-friendly ID for your tool.
- **title/description**: User-facing name and description.
- **icon/color**: For styling the card in the UI.
- **categories/mindMapCategory**: To place the tool in the correct filter groups.
- **creationFields**: This is crucial. Define the form fields needed for your tool's input. The `id` of each field should match a key in the Zod `inputSchema` from Step 1.
- **renderResult**: (Optional) A function that defines how to render the output from your AI flow.

### Step 3: Connect the Flow

- Open `src/lib/tools.tsx`.
- Import your new flow function from `src/ai/flows/your-new-tool.ts`.
- Add your tool's `id` and flow function to the `flowRunnerMap` object.

That's it! The UI for the tool page (`/dashboard/tool/[toolId]`) is generated automatically from the `creationFields` you defined. When the user clicks "Generate", it will call your connected flow with the form data.

Thank you for making selltoday.ai even better!
