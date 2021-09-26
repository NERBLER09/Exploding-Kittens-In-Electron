cd $PWD
electron-builder --linux
snapcraft upload --release stable ./dist/*.snap