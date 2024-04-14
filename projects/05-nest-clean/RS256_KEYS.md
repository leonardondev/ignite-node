
## Generate RSA 256-bit private and public keys

You can generate RSA 256-bit private and public keys using the OpenSSL command-line tool on Ubuntu. Here's how you can do it:

1. Open a terminal on your Ubuntu machine.
2. Use the following command to generate a private key:

```bash
openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048
```

This command generates an RSA private key with a key length of 256 bits and saves it to a file named `private_key.pem`.

3. Next, extract the public key from the private key:
```bash
openssl rsa -pubout -in private_key.pem -out public_key.pem
```
This command extracts the public key from the private key and saves it to a file named `public_key.pem`.

Now you have both the private and public keys generated and saved in the respective files (`private_key.pem` and `public_key.pem`). Make sure to keep your private key secure and never share it with anyone you don't trust.

## Convert RSA 256-bit private and public keys to base64

1. Open a terminal on your Ubuntu machine.
2. Use the following command to convert a key:
```bash
base64 private_key.pem > private_key.txt
base64 public_key.pem > public_key.txt
```

This command will write the Base64-encoded content to a file named output.txt
