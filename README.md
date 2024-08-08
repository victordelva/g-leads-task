# Fullstack Developer | Take-Home Assignment C

## Overview

This take-home assignment is designed to assess your skills as a Fullstack Developer with a focus on frontend development at Genesy AI.

This assignment uses the same stack as our product, and the tasks are similar to what you would be working on if you join our team.

## Task Description

Using the provided wireframes, create a functional UI and implement the following features.

**Feel free to modify the project structure, design patterns, database schema, UI design, installed packages, UI component library as needed, and any other aspects to improve the project.**\
Use any tools you prefer for development, including ChatGPT.

The only technologies you have to stick with are: React.js, TypeScript, TanStack Query, Node.js, Express, and Prisma.

Commit your changes regularly to show your progress.

### Features

![UI Wireframes](/docs/ui-wireframes.png)

1. **UI/UX**:
   - Develop the UI layout based on the provided wireframes. Feel free to make changes to the design, it's just a starting point.
   - Ensure the UI clearly communicates loading states, errors, and what each button does for a user-friendly experience.

2. **Leads Table**:
   - Display leads in a table format.
   - Rows can be selected, to perform actions on selected leads.

3. **Delete Selected Leads**:
   - Implement functionality to delete selected leads.

4. **Custom Message Generation**:
   - Generate a personalized message for each lead by replacing `{field}` in the template with the lead's corresponding field value.
   - If a field used in the template is missing on a lead:
      - Display an error message.
      - Do not generate the message for that lead.
   - For now, we just need to store 1 message per lead, so it can be a column in the leads table.

5. **Gender Guessing**:
   - Use an external API (e.g., Genderize API) to guess the gender of selected leads.
   - Ensure the API call is made on the backend.
   - Save the guessed gender in the database.

6. **CSV Import**:
   - Import leads from a CSV file.
   - Two leads are considered the same if they have the same `firstName` and `lastName`.
   - Exclude leads missing required fields (e.g., first name).
   - You can find some example CSV files in the [`/docs`](/docs) folder.
   - [OPTIONAL] Import report: Save import information (timestamp, file name, attempted imports, successful imports, text describing the errors) in the database and link this information to the respective leads. It doesn't need to be displayed in the UI, nor very detailed.

#### Aspects we value

- No code, lint, or console errors
- User experience and interface quality
- Production-ready code
- Effective use of TypeScript and libraries

## Development Instructions

### Backend

To set up and run the backend:

```zsh
cd backend
npm install
npm run dev
```

Every time you change the Prisma schema, run:

```zsh
npx prisma migrate dev
```

### Frontend

To set up and run the frontend:

```zsh
cd frontend
npm install
npm run dev
```

#### Frontend notes

- We included the hook `useApiMutation` that lets us centralize optimistic updates. We use it in our code, but since it may be a bit complex to understand without us explaining it, feel free to use the `useMutation` hook directly, or any other way you prefer.
- We included the function `endpoint` that lets us build an `api` object with all the endpoints. To reference the types used, use `ApiOutput` and `ApiOutput`, like so: `ApiOutput<typeof api.leads.getMany>`.
