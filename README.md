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