import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export class Icons{
    constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
        iconRegistry.addSvgIcon(
            'mic-sound',
            sanitizer.bypassSecurityTrustResourceUrl('../../assets/svg/mic-sound-icon.svg'));
      }
}