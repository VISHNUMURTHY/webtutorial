import { AbstractControl, Validators, FormControl } from '@angular/forms';

export class ValidationMessages {
    public static login_validation_messages = {
        'username': [
            { type: 'required', message: 'Email/Mobile Number Required' },
            { type: 'validUsernameEmail', message: 'Username must be valid Email' },
            { type: 'validUsernameMobile', message: 'Username must be valid Mobile Number' }
        ],
        'password': [
            { type: 'required', message: 'Password Required' },
            { type: 'pattern', message: 'Username must be Email/Mobile Number' }
        ]
    };
}



export class UsernameValidator {


    static validUsername = (fc: FormControl) => {
        let emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
        let phonePattern = '^[0-9]+$';

        if (fc.value !== '') {
            if (isNaN(fc.value)) {
                if (fc.value.match(emailPattern)) {
                    return null;
                } else {
                    return {
                        validUsernameEmail: true
                    };
                }
            } else {
                if (fc.value.match(phonePattern) && fc.value.length === 10) {
                    return null;
                } else {
                    return {
                        validUsernameMobile: true
                    };
                }
            }
        } else {
            return null;
        }
    }
}
