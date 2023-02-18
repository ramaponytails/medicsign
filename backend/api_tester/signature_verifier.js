const crypto = require(`crypto`);

var data = [
  {
    _id: "63f054384a48782688bc04ee",
    patient_id: "63f04735bdcd98d77d995fc8",
    doctor_id: "63f0541a4a48782688bc04e8",
    disease: "kangen",
    diagnosis: "jangan",
    created_at: "1972-12-02T10:01:11.982Z",
    signature: "mat",
    __v: 0,
  },
  {
    _id: "63f054394a48782688bc04f2",
    patient_id: "63f04735bdcd98d77d995fc8",
    doctor_id: "63f0541a4a48782688bc04e8",
    disease: "kangen",
    diagnosis: "jangan",
    created_at: "1972-12-02T10:01:11.982Z",
    signature: "mat",
    __v: 0,
  },
  {
    _id: "63f0543a4a48782688bc04f6",
    patient_id: "63f04735bdcd98d77d995fc8",
    doctor_id: "63f0541a4a48782688bc04e8",
    disease: "kangen",
    diagnosis: "jangan",
    created_at: "1972-12-02T10:01:11.982Z",
    signature: "mat",
    __v: 0,
  },
  {
    _id: "63f0543b4a48782688bc04fa",
    patient_id: "63f04735bdcd98d77d995fc8",
    doctor_id: "63f0541a4a48782688bc04e8",
    disease: "kangen",
    diagnosis: "jangan",
    created_at: "1972-12-02T10:01:11.982Z",
    signature: "mat",
    __v: 0,
  },
  {
    _id: "63f0543c4a48782688bc04fe",
    patient_id: "63f04735bdcd98d77d995fc8",
    doctor_id: "63f0541a4a48782688bc04e8",
    disease: "kangen",
    diagnosis: "jangan",
    created_at: "1972-12-02T10:01:11.982Z",
    signature: "mat",
    __v: 0,
  },
  {
    _id: "63f0543d4a48782688bc0502",
    patient_id: "63f04735bdcd98d77d995fc8",
    doctor_id: "63f0541a4a48782688bc04e8",
    disease: "kangen",
    diagnosis: "jangan",
    created_at: "1972-12-02T10:01:11.982Z",
    signature: "mat",
    __v: 0,
  },
];

data = Buffer.from(JSON.stringify(data));

const key = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtkjQWlucxkWHq35xXaYcY37SkPTarHgCu6ad/83vCvLzHCiHote2QkXXXA43N4jXHS9BLLYyWY5XUC1oSwBbyhlG1t9rJS4UhW4+aMbnCsJYL65uFPwT9JQa56VW5SnEFiHrVThfBB0/vPs0HaLP8wFDVBzo4YJWxENg96ED3eT803zzDCrS8AzPPf1lmDSMAWeLG+Cvb0y0uySTsbq0Z6+W8DkoJJ8ocudM/eGUJwOFbtHqYE+1Q9RAJ9w9oQcugqSoWVJXRt/K8QR7YloP+acc4Kma/TicDltsQPSZJjmjOsLD73efIIrsgaFuTNOMmMZdr9lesIt2n6tGdfxmZQIDAQAB`;

const public_key = crypto.createPublicKey({
  key: Buffer.from(key, `base64`),
  type: `spki`,
  format: `der`,
});

const signature = Buffer.from(
  `Z22oITIZrL2Qa9aevu2hrVId6hAgbdQ10rtkyMq+MDmyi6r4i66TWkKWnpCENjJ5FjLeZktr8U2SR8lE53WI69ZiUb6Mr7LJkVgam8dkWOjvT9UcSYIxRsAp4aReFVV/geGRyQYqfn7GtDK/iq89+GEzvl6w2arMlBv1TDqMl/OScpHx6T09nwltXTbNiOMWGPPGC6TumYHMyE+UHaotI+rhpja3M1QZFBk4UNvzww2ed0bF+EBRyJYunbPZFipdUFsXRRe7GrqZ448PJOZa0aVa5cvPJJBMfuRZSDHpPNaJSzIjSRtg1jtiNX7cW2Dzxhk11rjBHjU4RmhDAWauwQ==`,
  `base64`
);

console.log(crypto.verify(`SHA256`, data, public_key, signature));
