# Digital Signature Method

## Description
For the digital signature methods, we use the [SubtleCrypto](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto) Web API that already provides us with many cryptographic functions.

### Digital Signature Functions
1. [Create RSA](https://github.com/ramaponytails/medicsign/blob/master/frontend/src/app/App.js#L39) <br>
   We use `crypto.subtle.generateKey` to generate RSA-PSS public and private key pairs for signing and verify.
2. [SaveRSA](https://github.com/ramaponytails/medicsign/blob/master/frontend/src/app/App.js#L57) <br>
   The RSA keys are exported with `crypto.subtle.exportKey` to string format (using spki for the [public key](https://github.com/ramaponytails/medicsign/blob/master/frontend/src/app/App.js#L24) and pkcs8 for the [private key](https://github.com/ramaponytails/medicsign/blob/master/frontend/src/app/App.js#L19)) and saved in session storage in base64 format.
3. [SignRSA](https://github.com/ramaponytails/medicsign/blob/master/frontend/src/app/App.js#L127) <br>
   The private key is imported with `crypto.subtle.importKey` from the session storage. The medical report data will be converted to JSON format and signed with `crypto.subtle.sign` with the RSA-PSS algorithm.
4. [VerifyRSA](https://github.com/ramaponytails/medicsign/blob/master/frontend/src/app/App.js#L156) <br>
   The public key is imported with `crypto.subtle.importKey` from the session storage if the verifier is the doctor and by querying from the database if the verifier is the patient. The medical report data in the same JSON format will be verified with `crypto.subtle.verify` with the RSA-PSS algorithm.
