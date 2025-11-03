export function isLightColor(hexColor) {
    if (hexColor.length == 7) {
      const rgb = [
        parseInt(hexColor.substring(1, 3), 16),
        parseInt(hexColor.substring(3, 5), 16),
        parseInt(hexColor.substring(5), 16),
      ];
      const luminance =
        (0.2126 * rgb[0]) / 255 +
        (0.7152 * rgb[1]) / 255 +
        (0.0722 * rgb[2]) / 255;
      return luminance > 0.5;
    }
    return false
}

// export function hidePopup(popupElement, transitionSpeed=300){
//     popupElement?.classList.toggle("translate-y-full", true);
//     setTimeout(() => {
//         popupElement?.classList.toggle("hidden", true);
//     }, transitionSpeed);
// }

// export function showPopup(popupElement){
//     popupElement?.classList.toggle("hidden", false);
//     setTimeout(() => {
//         popupElement?.classList.toggle("translate-y-full", false);
//     }, 0);
// }

export function addPopupEventListeners(openButton, closeButton, popupElement, onOpen, onClose) {
  /**
   * Create event listensers for a popup
   * 
   * @param openButton (HTMLElement) - opens popup onclick
   * @param closeButton (HTMLElement) - closes popup onclick
   * @param popupElement (HTMLElement) - element to show/hide, usually a div
   * @param onOpen (callableFunction) - callback function called when the menu is activated
   * @param onClose (callableFunction) - callback function called when the menu is closed
   */
  // Open popup
  const openFunc = (e) => {onOpen(e);/* showPopup(popupElement)*/}
  const closeFunc = (e) => {onClose(e);/* hidePopup(popupElement)*/}
  openButton?.addEventListener("click", openFunc);
  // Cancel popup
  closeButton?.addEventListener("click", closeFunc);
  popupElement?.addEventListener(
      "focusout", () => {
          popupElement.timer = setTimeout(closeFunc, 0);
  });
  popupElement?.addEventListener(
      "focusin", () => {
          clearTimeout(popupElement.timer);
  });
}