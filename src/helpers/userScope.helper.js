'use strict';

class UserScopeHelper {
    constructor(scopes) {
        this.scopes = scopes ?? ['brief', 'detail'];
    }

    addNewScope(newScope) {
        this.scopes.push(newScope);
    }

    getScopes() {
        return this.scopes;
    }

    isValidScope(checkedScope) {
        if(!checkedScope) return true;

        const foundIndex = this.scopes.findIndex(scope => scope === checkedScope);
        return (foundIndex !== -1);
    }
}

module.exports = new UserScopeHelper();