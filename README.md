# Next Prompt

NextJS application for storing and managing AI prompts.

![Next.js 15](https://img.shields.io/badge/-Next.js%2015-000000?style=flat-square&logo=next.js)
![React 19](https://img.shields.io/badge/-React%2019-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Auth.js 5](https://img.shields.io/badge/-Auth.js%205-FF6B6B?style=flat-square&logo=authjs&logoColor=white)
![Mongoose](https://img.shields.io/badge/-Mongoose-47A248?style=flat-square&logo=mongoose&logoColor=white)

## Features

- User authentication
  - Sign in with Google
  - Sign out
  - Protected pages and server actions
- Prompt CRUD using server actions
  - Create prompt with zod validation
  - Update prompt using the same form component
  - Read prompt
  - Delete prompt
- Use DAL _(Data Access Layer)_
- Use server components when possible

## TODO

- Prompt search _(by prompt, tag or username)_
- Prompt filtering by tag
- View other user's profile (`profile/[username]`)
- Authentication in one place (middleware)
- Prompt delete confirmation
