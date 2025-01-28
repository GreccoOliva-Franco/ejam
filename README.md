# EJAM Humble Superheroes API

## Requirements

The requirements are detailed in the `requirements.pdf` file

## Understanding of requirements

- All the API endpoints are **public**, no authentication required
- Every user can access every hero (there is no need for a `user_id` key in `heros` table).
- Each hero has the following columns and restrictions:
```javascript
{
  id: ['unique', 'autoincremental'],
  name: ['string', 'unique', 'min:1-character'],
  superpower: ['string', 'min:1-character'],
  humility: ['number', 'min:0', 'max:10']
}
```
- The API will have the root prefix of `/api/v1/`
- Environment variables for local development will be provided under the `.env.example` file for simplicity

## Deployment

- Install dependencies
```bash
npm i
```

- Copy default environment variables
```bash
cp .env.example .env
```

- Run project
```bash
# for local deployment:
npm run start

# for production deployment:
npm run start:prod
```

## Evaluation criteria

### Technical Skills

- I built a simple layered architecture with repository pattern providing the in-memory data for the heroes dataset
- Readable and self-explainatory code
- Validation API inputs
- Validation for database manipulation

### Team Player Actitud

- Add **Update** and **Delete** functionalities
- Add an ORM and SQLite database
- Let each user have its own list of heroes making the `users` dataset and adding a `hero.user_id` and filtering by `user_id = requester_id`

### Eagerness to Learn

- Try out either tRPC or GraphQL
