# Rick and Morty
[API](https://rickandmortyapi.com/)

*Will use this API for GraphQL query later on, now use axios get only.*

## TODO
- Home Screen: 

  get a random character

- Character Screen: (Try flatlist horizontal mode)

  pagination according to api's data, 20 chars per page, 34 pages in total, 671 chars in total.

  `https://rickandmortyapi.com/api/character?page=1`

  ```json
    {
      "info": {
      "count": 671,
      "pages": 34,
      "next": "https://rickandmortyapi.com/api/character?page=2",
      "prev": null
      },
      "results": [
      {
      "id": 1,
      "name": "Rick Sanchez",
      "status": "Alive",
      "species": "Human",
      "type": "",
      "gender": "Male",
      "origin": {
      "name": "Earth (C-137)",
      "url": "https://rickandmortyapi.com/api/location/1"
      },
      "location": {
      "name": "Earth (Replacement Dimension)",
      "url": "https://rickandmortyapi.com/api/location/20"
      },
      "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      "episode": [
      "https://rickandmortyapi.com/api/episode/1",
      ],
      "url": "https://rickandmortyapi.com/api/character/1",
      "created": "2017-11-04T18:48:46.250Z"
  },
  ```

  - Search Screen

    Search by name, by the query `<query>=<value>`, e.g.   
    `https://rickandmortyapi.com/api/character/?page=2&name=rick&status=alive`

    **Available parameters:**

    - name: filter by the given name.
    - status: filter by the given status (alive, dead or unknown).
    - species: filter by the given species.
    - type: filter by the given type.
    - gender: filter by the given gender (female, male, genderless or unknown).
