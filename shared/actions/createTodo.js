import request from 'axios';

const BACKEND_URL = 'https://webtask.it.auth0.com/api/run/wt-milomord-gmail_com-0/redux-tutorial-backend?webtask_no_cache=1';

export function createTodo(text){
    return {
        type:'CREATE_TODO',
        promise:request.post(BACKEND_URL, { text })
    }
}