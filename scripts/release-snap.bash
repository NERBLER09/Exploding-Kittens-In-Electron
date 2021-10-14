cd $PWD
rm -rf $PWD/dist
electron-builder --linux
snapcraft upload --release stable ./dist/*.snap