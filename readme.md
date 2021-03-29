# Exploding Kittens In Electron 

Welcome to Exploding Kittens In Python. This is a clone of [Exploding Kittens]("https://www.explodingkittens.com") card game created in [Electron]("https://www.electronjs.org"). This runs completely on its own with out Node or Electron needed to be installed.

## Running 
To run this Electron app you'll need [Node]("https://nodejs.org) and [Electron]("https://electronjs.org")

Once you have cloned the repo simply run these commands: 

```
$ npm i # Installs the dependencies 

$ electron .

# Or

$ npm start
```

## Packaging

Now when you're ready to package the app, so all your friends can see, run:

```
$ npm run package-win # This will package the app for Windows x64

# and/or

$ npm run package-linux # This will package the app for Linux x64
```

This is create the packaged app in a folder under `out/`, click on the executable to run the packaged app

The app is packaged using [Electron Packager]("https://www.npmjs.com/package/electron-packager")

## License

"Exploding Kittens" is a trademark of Exploding Kittens Inc.