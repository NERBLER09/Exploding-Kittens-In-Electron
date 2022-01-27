# Exploding Kittens Fan Game - Svelte Rewrite
Exploding Kittens Fan Game is now Exploding Kittens Fan Game

This is where the the Exploding Kittens Fan Game Svelte rewrite is happening.

With the rewrite the Windows Store build will be discontinued, Exploding Kittens Fan Game will be available on the Snap Store on Linux.

The original jQuery will remain until the rewrite is complete, which then it will move to a separate repo.

The reason of the rewrite is to make the jQuery code base more manageable, as well and to convert the code base to something I have more experience with.

## Packaging
You can download the app from the Snap Store via `snap install exploding-kittens-fan-game`

If you want to compile a Flatpak build you can clone the repo and run `./release/release-flatpak.sh`, requires flatpak-builder amd flatpak installed on your system.
Once the script is ran successfully the app will be automatically installed on your system and can be launched with `flatpak run org.Nerbler09.exploding-kittens-fan-game`

## License

"Exploding Kittens" is a trademark of Exploding Kittens Inc.