import { authenticationService } from '@/_services';

export function authHeader() {
    // return authorization header with jwt token
    const { setAuthTokens } = useAuth();
    const currentUser = authenticationService.currentUserValue;
    if (currentUser && currentUser.token) {
        return { Authorization: `Bearer ${currentUser.token}` };
    } else {
        return {};
    }
}