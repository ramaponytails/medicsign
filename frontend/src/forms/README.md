# Create Forms

## Create Record
Below is the diagram of the Create Record process
![](https://i.imgur.com/L1d4awh.png)

### [scanQRCode](https://github.com/ramaponytails/medicsign/blob/master/frontend/src/forms/CreateRecord.js#L90)
Scan QR Code uses the npm library [react-qr-scanner](https://www.npmjs.com/package/react-qr-reader) to scan the patient's qr code. The [Scan](https://github.com/ramaponytails/medicsign/blob/master/frontend/src/forms/CreateRecord.js#L11) component uses the library's [QrReader](https://github.com/ramaponytails/medicsign/blob/master/frontend/src/forms/CreateRecord.js#L32) component to get the patient id.

### [createRecord](https://github.com/ramaponytails/medicsign/blob/master/frontend/src/forms/CreateRecord.js#L87)
The createRecord function is implemented as the recordForm react component. It uses the npm library [Formik](https://formik.org/) to validate, control, and save the input data. It needs 3 user inputs, patient ID (obtained through the QR), the disease, and the diagnosis. 

The full implementation of how it handles data can be seen in the [onSubmit](https://github.com/ramaponytails/medicsign/blob/master/frontend/src/forms/CreateRecord.js#L131) function.

### [signRSA](https://github.com/ramaponytails/medicsign/blob/master/frontend/src/forms/CreateRecord.js#L145)
The signRSA process uses the digital signing feature explained in the [App.js](https://github.com/ramaponytails/medicsign/tree/master/frontend/src/app) file.

### [sendRecord](https://github.com/ramaponytails/medicsign/blob/master/frontend/src/forms/CreateRecord.js#L68)
The sendRecord processes sends the data to the backend API `/record/create` using [axios](https://axios-http.com/docs/intro).

## Register User
