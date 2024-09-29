function focusEle(el) {
  if (el instanceof HTMLInputElement) {
    el.focus();
  } else if (el instanceof HTMLTextAreaElement) {
    el.focus();
  } else if (el instanceof HTMLDivElement) {
    const focusEles = ['input', 'textarea'];
    for (let i = 0; i < focusEles.length; i++) {
      let ele = el.querySelector(focusEles[i]);
      if (ele) {
        ele.focus();
        break;
      }
    }
  }
}
const Focus = {
  mounted(el) {
    focusEle(el);
  },
  // updated(el){
  //   focusEle(el);
  // }
};
export default Focus;
