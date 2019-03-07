
/* eslint-disable no-console */
import { JSO } from 'jso';

import store from './store';

const clientId = 'eb1362ce-0f30-4a38-81f1-cb289bd97f1f';
const authUrl = 'https://services.humanbrainproject.eu/oidc/authorize';

const client = new JSO({
  client_id: clientId,
  redirect_uri: `${window.location.href}/`,
  authorization: authUrl,
  response_type: 'id_token token',
});

function init() {
  try {
    client.callback();
  } catch (e) {
    console.warn('Issue decoding the token');
  }

  const authorization = client.getToken();
  authorization.then((session) => {
    store.setToken(session.access_token);
  });

  return authorization;
}

export default {
  init,
};
