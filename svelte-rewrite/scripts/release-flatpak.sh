#!/bin/bash

# Builds a local Flatpak app
cd flatpak 
flatpak-builder build org.Nerbler09.exploding-kittens-fan-game.yml --force-clean --install --user --delele-build-dirs