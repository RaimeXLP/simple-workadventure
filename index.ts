/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { ButtonDescriptor } from "@workadventure/iframe-api-typings";
import { ActionBarActionButtonDescriptor } from "@workadventure/iframe-api-typings/front/Api/Iframe/Ui/ButtonActionBar";

class WAsimple {
    buttons: {
        close: ButtonDescriptor,
    } = {
        close: {
            label: "Schließen",
            className: "primary",
            callback: (popup) => {
                popup.close();
            }
        },
    }

    constructor (){
    }

    async init(){
        WA.onInit().then(() => {
            console.log('Scripting API ready');
            console.log('Player tags: ',WA.player.tags)
            
            // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
            bootstrapExtra().then(() => {
                console.log('Scripting API Extra ready');
            }).catch(e => console.error(e));
        
        }).catch(e => console.error(e));
    }

    popUpOnArea(area: string, display: string, text: string, buttons: ButtonDescriptor[]){
        let currentPopup: any = undefined;
        WA.room.area.onEnter(area).subscribe(() => {
            currentPopup = WA.ui.openPopup(display, text, buttons);
        });
    
        WA.room.area.onLeave(area).subscribe(closePopup);
        function closePopup(){
            if (currentPopup !== undefined) {
                currentPopup.close();
                currentPopup = undefined;
            }
        }
    }

    popUp(display: string, text: string, buttons: ButtonDescriptor[]){
        WA.ui.openPopup(display, text, buttons);
    }

    modal(title: string, src: string, api: boolean){
        WA.ui.modal.openModal({
            position: "right",
            title: title,
            src: src,
            allow: "fullscreen",
            allowApi: api
        });
    }

    modalOnArea(area: string, title: string, src: string, api: boolean){
        let currentModal: any = undefined;
        WA.room.area.onEnter(area).subscribe(() => {
            currentModal = WA.ui.modal.openModal({
                position: "right",
                title: title,
                src: src,
                allow: "fullscreen",
                allowApi: api
            });
        });
        WA.room.area.onLeave(area).subscribe(closeModal);
        function closeModal(){
            if (currentModal !== undefined) {
                currentModal.close();
                currentModal = undefined;
            }
        }
    }

    async cameraEvent(x: number, y: number, area: string){
        let base64image: string = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAAC4jAAAuIwF4pT92AAAEJUlEQVR4nO2dTUhUURiGHe84/mQpOjVk2ZT9RyZKLpqVUM4u0E0RgZsW0TaCFkERISSR0KpoEwQSzGaKdi6DXFQIEqkjKUmhTqWp+TvjMG3d+H7JYZrkfZ/tO2fuuXMfDnzfnHuvL5vNFgheCvM9AZFfJAA5EoAcCUCOBCBHApAjAcjx5foA0WgHzBua6mE+0P/RqVFRG66F5zg1mYTj6w4dgHliMOE0v7qD++H8xka/wPG9vc9dDq8VgB0JQI4EIEcCkCMByJEA5EgAcpz7ALmu87uf3IfjhwcSMH/6+BnMK6uDMJ+d/gnzXM9vX3gPvEaDn4bg+L6+lzDXCkCOBCBHApAjAciRAORIAHIkADnOfYCWloswDwSKc1rnDyWGYX786DGYW3V4vufX/eARzAuMa6g+gIBIAHIkADkSgBwJQI4EIEcCkJPzPkAqtQr7AE2nm+H4UE3V5ie1juTEDMz7P7yH+f8+P8/z4DXMZDJwvFYAciQAORKAHAlAjgQgRwKQIwHIce4DRCJtMK+orIT53OysU5/Awqqj94brYP5tfAzmrvMbGcb7CSwWFuZhfqL+JLzGWgHIkQDkSAByJAA5EoAcCUCOBCDHZ93fb1EUCMA8nU7jLzBeWGDVuRZWne+K1SewaG+/DPN4vAfmd7o6YX735i2YawUgRwKQIwHIkQDkSAByJAA5EoAcfyi0G34gmZyEdXo6lYLjXZ/Dd+XaVZjPTC3A3KqjXbH2A4Rrj+T0+A/vdcH8VGOj9gOIjZEA5EgAciQAORKAHAlAjgQgxxeNdsA6v7X1PPyC8a8jMM/1vvzy8h0wt7D6FBZWH8N1P4N1fplMBtb5nufB8VoByJEA5EgAciQAORKAHAlAjgQgRwKQ47c+YDV6LFxvXLA2XFgPWLAaPa43duQbz/NgI6+6eqc2hIiNkQDkSAByJAA5EoAcCUCOBCDHb21Y+P5j2ukA796+cRpvYdX59Q2HYX678wbM47FXMLde/Oj64shY7DXMm5vOwDwe74F9Aq0A5EgAciQAORKAHAlAjgQgRwKQ44tE2mCd6PqgRdf/211fyODax8g3rjeeBIO7tB9AbIwEIEcCkCMByJEA5EgAciQAOb6z5/ALC5aXFmGfwMLqI+T6AQtbHesBEX/x+6gPIDZGApAjAciRAORIAHIkADkSgBz/8tKi9RlYR5aWbYOD537N4C8vxA76/UUwX1tLwz6FtZ8gVFMFc4vkBD4/60GZJSWl8PddWVmC4wOBYpinUqsw1wpAjgQgRwKQIwHIkQDkSAByJAA5sAb9F1y4dB3mwWAFzD8nRmEfIN/7Caz9EDu2l8FrMP8b9wFiL7o3P6l1aAUgRwKQIwHIkQDkSAByJAA5EoAcXzbrtO1fbHG0ApAjAciRAORIAHIkADkSgJw/Zq0GlZfi/7wAAAAASUVORK5CYII="
        let b1: ActionBarActionButtonDescriptor = {
            "id":"kamera",
            "type":"action",
            "imageSrc":base64image,
            "toolTip":"Auf Bühne zoomen",
            "callback": () => {
                WA.camera.set(x,y,undefined,undefined,true,true);
                WA.ui.actionBar.removeButton("kamera");
                WA.ui.actionBar.addButton(b2);
            }
        }
        let b2: ActionBarActionButtonDescriptor = {
            "id":"kamera2",
            "type":"action",
            "imageSrc": await WA.player.getWokaPicture(),
            "toolTip":"Auf Spieler zoomen",
            "callback": () => {
                WA.camera.followPlayer(true);
                WA.ui.actionBar.removeButton("kamera2");
                WA.ui.actionBar.addButton(b1);
            }
        }

        
        WA.room.area.onEnter(area).subscribe(() => {
            WA.ui.actionBar.addButton(b1);
        });
        WA.room.area.onLeave(area).subscribe(() => {
            WA.camera.followPlayer(true);
            WA.ui.actionBar.removeButton("kamera");
            WA.ui.actionBar.removeButton("kamera2");
        });
    }
}

export default WAsimple;