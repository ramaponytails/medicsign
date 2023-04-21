# Create Forms

## Create Record
Below is the diagram of the Create Record process <br>
![](https://i.imgur.com/L1d4awh.png)

### [scanQRCode](https://github.com/ramaponytails/medicsign/blob/master/frontend/src/forms/CreateRecord.js#L90)
Scan QR Code uses the npm library [react-qr-scanner](https://www.npmjs.com/package/react-qr-reader) to scan the patient's qr code. The [Scan](https://github.com/ramaponytails/medicsign/blob/master/frontend/src/forms/CreateRecord.js#L11) component uses the library's [QrReader](https://github.com/ramaponytails/medicsign/blob/master/frontend/src/forms/CreateRecord.js#L32) component to get the patient id.

### [createRecord](https://github.com/ramaponytails/medicsign/blob/master/frontend/src/forms/CreateRecord.js#L87)
![](https://i.imgur.com/Hph6upJ.png)
The createRecord function is implemented as the recordForm react component. It uses the npm library [Formik](https://formik.org/) to validate, control, and save the input data. It needs 3 user inputs, patient ID (obtained through the QR), the disease, and the diagnosis as seen above. 

The full implementation of how it handles data can be seen in the [onSubmit](https://github.com/ramaponytails/medicsign/blob/master/frontend/src/forms/CreateRecord.js#L131) function.

### [signRSA](https://github.com/ramaponytails/medicsign/blob/master/frontend/src/forms/CreateRecord.js#L145)
The signRSA process uses the digital signing feature explained in the [App.js](https://github.com/ramaponytails/medicsign/tree/master/frontend/src/app) file.

### [sendRecord](https://github.com/ramaponytails/medicsign/blob/master/frontend/src/forms/CreateRecord.js#L68)
The sendRecord processes sends the data to the backend API `/record/create` using [axios](https://axios-http.com/docs/intro).

## Register User
### [Register Doctor](https://github.com/ramaponytails/medicsign/blob/frontend_documentation/frontend/src/forms/RegisterDoctor.js#L103)
![](https://i.imgur.com/DgufLwm.png)
[Register Doctor](https://github.com/ramaponytails/medicsign/blob/frontend_documentation/frontend/src/forms/RegisterDoctor.js#L103) uses [Formik](https://formik.org/) to create a doctor register form that will then send the form data to `/doctor/create` backend API using [axios](https://axios-http.com/docs/intro). Register doctor also uses the [createRSA](https://github.com/ramaponytails/medicsign/blob/master/frontend/src/app/App.js#L39) function and send the RSA key pairs with the form data.

### [Register Patient](https://github.com/ramaponytails/medicsign/blob/frontend_documentation/frontend/src/forms/RegisterPatient.js#L112)
![](https://i.imgur.com/l0AlUl5.png)
[Register Patient](https://github.com/ramaponytails/medicsign/blob/frontend_documentation/frontend/src/forms/RegisterPatient.js#L112) uses [Formik](https://formik.org/) to create a patient register form that will then send the form data to `/patient/create` backend API using [axios](https://axios-http.com/docs/intro). 
