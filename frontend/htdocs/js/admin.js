export const adminPassword = ko.observable(localStorage.getItem('admin-auth-password') || '');

ko.applyBindings({
    password: ko.observable(adminPassword()),
    clearPassword: function () {
        adminPassword('');
        this.password('');
        localStorage.removeItem('admin-auth-password');
        UIkit.notification('Das Admin Passwort wurde entfernt!', { status: 'primary' });
    },
    setPassword: function () {
        if (this.password().length === 0) {
            return this.clearPassword();
        }
        adminPassword(this.password());
        localStorage.setItem('admin-auth-password', this.password());
        UIkit.notification('Das Admin Passwort wurde gespeichert!', { status: 'primary' });
    }
}, document.getElementById('provide-admin-secret'));
