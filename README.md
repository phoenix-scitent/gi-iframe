# Simple local gi tester

Set this up locally to test the `governance-staging` (or what-have-you) locally.

Install this alongside a directory called `governance-content` (ideally, the repo of that name).  Then run:
```
node index.js
```

It will detect the directories that have content in them and create a list of them and an iframe in a new file, `index.html`, that you can simply open in a browser directly off the filesystem.
