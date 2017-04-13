# Running:

Make sure you have mongodb installed and running

```
> npm install
> npm start

> curl localhost:3000/artist
[]

> curl localhost:3000/artist --data '{"name": "Frank Sinatra"}' -H "Content-Type: application/json"
{"__v":0,"name":"Frank Sinatra","_id":"58eed9fd57c1c724cc0d08f2","albums":[]}

> curl localhost:3000/artist/58eed9fd57c1c724cc0d08f2
{"__v":0,"name":"Frank Sinatra","_id":"58eed9fd57c1c724cc0d08f2","albums":[]}

> curl localhost:3000/artist/58eed9fd57c1c724cc0d08f2 --data '{"year": 2017, "title": "My Title", "track_count": 5}' -H "Content-Type: application/json"
{"_id":"58eed9fd57c1c724cc0d08f2","name":"Frank Sinatra","__v":1,"albums":[{"year":2017,"title":"My Title","track_count":5,"_id":"58eeda8d57c1c724cc0d08f4"}]}

