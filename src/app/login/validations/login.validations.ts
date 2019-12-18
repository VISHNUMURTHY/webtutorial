export class ValidationMessages {
    public static login_validation_messages = {
        'username': [
            { type: 'required', message: 'Email/Mobile Number Required' },
            { type: 'pattern', message: 'Username must contain only numbers and letters' },
        ]
    };
}