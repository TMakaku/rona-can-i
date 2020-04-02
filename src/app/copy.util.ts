
export function copy() {
    try {
        if ((navigator as any).clipboard) {
            (navigator as any).clipboard.writeText(getUrl());
        } else if ((window as any).clipboardData) {  // IE
            (window as any).clipboardData.setData('text', this.couponCode);
        } else {  // other browsers, iOS, Mac OS
            this.copyToClipboard(this.inputEl.nativeElement);
        }
        window.alert("Link has been copied!");  // copy succeed.
    } catch (e) {
        window.alert("Copy failed, please copy URL manually");   // copy failed.
    }
}

function getUrl() {
    return window.location.href;
}

function copyToClipboard(el: HTMLInputElement) {
    const oldContentEditable = el.contentEditable;
    const oldReadOnly = el.readOnly;

    try {
        el.contentEditable = 'true';  // specific to iOS
        el.readOnly = false;
        this.copyNodeContentsToClipboard(el);
    } finally {
        el.contentEditable = oldContentEditable;
        el.readOnly = oldReadOnly;
    }
}

function copyNodeContentsToClipboard(el: HTMLInputElement) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(el);
    selection.removeAllRanges();

    selection.addRange(range);
    el.setSelectionRange(0, 999999);

    document.execCommand('copy');
}
