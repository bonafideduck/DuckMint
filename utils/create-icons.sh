#!/bin/sh
PATH=$PATH:/Applications/Inkscape.app/contents/MacOS/

cd src/assets/img
inkscape --export-filename=icon-34.png -w 34 -h 34 logo.svg
inkscape --export-filename=icon-128.png -w 128 -h 128 logo.svg
