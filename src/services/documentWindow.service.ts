import { Injectable } from '@angular/core';

function _window(): any {
    return window;
}

function _document(): any {
    return document;
}

@Injectable({ providedIn: 'root' })
export class WindowDocumentRef {

    get nativeWindow(): Window {
        return _window();
    }

    get nativeDocument(): any {
        return _document();
    }
}
