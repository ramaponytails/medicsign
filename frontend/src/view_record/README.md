## View List
### [Doctor View List](https://github.com/ramaponytails/medicsign/blob/frontend_documentation/frontend/src/view_record/ViewList.js#L44)
The backend API at `/doctor/list` will be called to get the list of records of that doctor and is shown like below. `patient/view` and `/doctor/view ` will also be called to get the patient's and doctor's name from their respective id. <br>
<img src="https://i.imgur.com/t4l7Ufy.png" height=50% width=50%>

### [Patient View List](https://github.com/ramaponytails/medicsign/blob/frontend_documentation/frontend/src/view_record/PatientViewList.js#L44)
The backend API at `/patient/list` will be called to get the list of records of that doctor and is shown like below. `patient/view` and `/doctor/view ` will also be called to get the patient's and doctor's name from their respective id. <br>
<img src="https://i.imgur.com/0DTLuBk.png" height=50% width=50%>

## View Single
The view single component is similar for both the [doctor](https://github.com/ramaponytails/medicsign/blob/frontend_documentation/frontend/src/view_record/ViewSingle.js#L63) and [patient](https://github.com/ramaponytails/medicsign/blob/frontend_documentation/frontend/src/view_record/PatientViewSingle.js#L63) in that it both shows the details of the record and adds the [verify](https://github.com/ramaponytails/medicsign/blob/frontend_documentation/frontend/src/signing/Verify.js#L5) component. <br>
<img src="https://i.imgur.com/sApmjlW.png" height=50% width=50%>
