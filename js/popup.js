
function modalContent(trigger, item) {
 
    const btn = document.querySelectorAll(trigger),
        pop = document.querySelector(item),
        close = document.querySelectorAll('.popup-close'),
        closeBack = document.querySelectorAll('.popup'),
        activeClass = 'show',
        hideClass = 'hide'

    function showContent() {
        pop.classList.add(activeClass);
        pop.classList.remove(hideClass);
        document.body.style.overflow = 'hidden';
        window.dispatchEvent(new CustomEvent('resize'));
    }
 
 
    function hideContent() {
        pop.classList.remove(activeClass);
        pop.classList.add(hideClass);
        document.body.style.overflow = '';
    }
 
    function showHideContent(trigger, func) {
        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target && e.target.className === item.className) {
                    e.preventDefault();
                    func();
                }
            });
 
        });
    }
 
    showHideContent(btn, showContent);
    showHideContent(close, hideContent);
    showHideContent(closeBack, hideContent);
 
    function hideScroll() {
        const div = document.createElement('div');
        document.body.append(div);
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';
        const result = div.offsetWidth - div.clientWidth;
        return result;
    }
 
}
modalContent('.baloon-btn', '.popup_main-popup');