# simple-workadventure

A simplified workadveture-api with extra functions 

## installation 

install with:

```
npm install simple-workadventure
```

## setup 

paste this in your __empty__ map script:

```
/// <reference types="@workadventure/iframe-api-typings" />

import WAsimple from "simple-workadventure";

const WAs = new WAsimple()

WAs.init().then(() => {
    //your code here
})

export {};
```

## propertys

### buttons

#### close 

a simple popUp close Button:

```
WAs.buttons.close
```

## creator functions

### button creators

### createCloseButton

```
WAs.createCloseButton("label")
```
- this returns a close Button for PopUps
- __label__ can be left empty for the standard "close" - labeling but you can write somthing i there to change the label (maybe for your language)

### createLinkButton

```
WAs.createLinkButton("url","label")
```

- this returns a Link Button for a PopUp that opens the Website in a new Tab when clicked
- __url__ is the url you want to open in a new Tab
- __label__ is the text you want to be displayed on the button


## functions 

### popUp

```
WAs.popUp("display","text",[])
```

- __display__ is the area where you want your popup to be displayed 
- __text__ is the text you want to be shown
- __[]__ should be filled with ButtonDescriptors can be left empty (you can also fill it with ```WAs.buttons.close``` to add a close button or use one of the buttonCreators)

## depricated

### popUpOnArea (use popUp instead)

```
WAs.popUpOnArea("area","display","text",[])
```
- __area__ is the area where you have to walk over so that your popup shows up
- __display__ is the area where you want your popup to be displayed 
- __text__ is the text you want to be shown
- __[]__ should be filled with ButtonDescriptors can be left empty (you can also fill it with ```WAs.buttons.close``` to add a close button)

## todo 

- finish documentation
