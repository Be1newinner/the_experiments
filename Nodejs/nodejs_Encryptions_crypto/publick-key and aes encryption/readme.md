# Extracting Public Key:

    openssl x509 -inform PEM -in certificate.pem -pubkey -noout > public_key.pem
    => openssl x509 -in LG_Cert.crt -pubkey -noout > public_key.pem

# Extracting Private Key:

    openssl x509 -inform PEM -in certificate.pem -out private_key.pem -outform PEM
    => openssl rsa -in LG_Cert.crt -out private_key.pem
