```
brew install hugo
brew install sass/sass/sass
hugo mod get -u .

hugo --source prebuild --gc && hugo server --buildDrafts
```