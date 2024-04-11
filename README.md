# AI_context_utility

## Init + pull submodule
```git submodule update --remote --init```

## Install deps
```npm install```

## Build and run:
```npm run create_index c```

Example: 

```npm run create_index redis://localhost:6379 beers ./out.json```

## Alternative build and then run
```npm run build```

and then 

```node dist/src/create_index.js redis://localhost:6379 beers ./out.json```
