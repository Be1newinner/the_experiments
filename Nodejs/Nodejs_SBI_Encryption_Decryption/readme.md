
# Extracting Public Key:
    openssl x509 -inform PEM -in certificate.pem -pubkey -noout > public_key.pem
    => openssl x509 -in LG_Cert.crt -pubkey -noout > public_key.pem


# Extracting Private Key:
    openssl x509 -inform PEM -in certificate.pem -out private_key.pem -outform PEM
    => openssl rsa -in LG_Cert.crt -out private_key.pem



<!-- Working Conversion Model -->

export const handler = async (event) => {
    try {

        const raw = JSON.stringify({
            "encData": "A9V9JmIYQZiN0d8a42Nrz4l1Q753RQ/BCLoo4TNGQNzHrKatqncPRC8nnoK2+yBH",
            "encToken": "LH3NNkJuJOzlb2/7M+vqfBvHE0cG6YCB8Winw/RD5Ni6qeYoPQoSSAJ0/WmBFciME90jO7llwCS9eBFwxGQibbf0l6n5hbp0AT2cumOk+MkGHmwEaIbYkKny4lrRovIT3nwXijULwnmWJlcDe4dYwKAkDCZjtlRctlG2MAZyLP9hMkitguYH/PnCbE/9GPdpbSPS3aS8mpGuNQR7/KxzHIM+bytgmuIEI8gI1coOcRddGioLJM6ByNWLIbFHjCGACIo3O/x7BeJ+8vpnCra6FIhV7M/lJnn5PJCZacTaN3FDeubQrZ7vzepBgtcC7frRmnE7S6W2bx1K2VVQpDA8eQ=="
        });

        const requestOptions = {
            method: "POST",
            headers: {  
                        'Content-Type': 'application/json' , 
                        'IDENTIFIER_1': 'LGRPA'
            },
            body: raw,
        };

        const resp = await fetch("https://sbi-uat2.sbicard.com/api-gateway/resource/oAuth/tokenGenPartner", requestOptions);

        if (!resp.ok) {
            throw new Error(`Failed to fetch: ${resp.status} ${resp.statusText}`);
        }

        const data = await resp.json();
        return data;
    } catch (error) {
        console.error("Error occurred:", error);
        throw error; // Rethrow the error for Lambda to handle
    }
};



