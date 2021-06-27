# Exploding Kittens In Electron 

Welcome to Exploding Kittens In Python. This is a clone of [Exploding Kittens]("https://www.explodingkittens.com") card game created in [Electron]("https://www.electronjs.org"). This runs completely on its own with out Node or Electron needed to be installed.

## Screenshots

![title-screen](https://user-images.githubusercontent.com/67165926/123548732-4700e400-d723-11eb-9f46-5a3bac9a264f.PNG)

![game-window](https://user-images.githubusercontent.com/67165926/123548772-71eb3800-d723-11eb-80d0-6dfb225cd218.PNG)

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