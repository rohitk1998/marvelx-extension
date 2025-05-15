export class SecurityHelper {
  private static IV_SIZE = 12; // 96-bit
  private static SALT_SIZE = 16;
  private static ITERATIONS = 100000;
  private static KEY_SIZE = 256; // bits

  // Helper to convert between formats
  static bufferToBase64(buf: ArrayBuffer): string {
    return btoa(String.fromCharCode(...new Uint8Array(buf)));
  }

  static base64ToBuffer(base64: string): ArrayBuffer {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }

  private static async getKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const baseKey = await crypto.subtle.importKey(
      "raw",
      encoder.encode(password),
      "PBKDF2",
      false,
      ["deriveKey"]
    );
    return crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations: this.ITERATIONS,
        hash: "SHA-256",
      },
      baseKey,
      { name: "AES-GCM", length: this.KEY_SIZE },
      false,
      ["encrypt", "decrypt"]
    );
  }

  static async encrypt(payload: any, password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(JSON.stringify(payload));
    const salt = crypto.getRandomValues(new Uint8Array(this.SALT_SIZE));
    const iv = crypto.getRandomValues(new Uint8Array(this.IV_SIZE));

    const key = await this.getKey(password, salt);
    const encrypted = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      data
    );

    // Return base64(salt + iv + ciphertext)
    const result = new Uint8Array(
      salt.byteLength + iv.byteLength + encrypted.byteLength
    );
    result.set(salt, 0);
    result.set(iv, salt.length);
    result.set(new Uint8Array(encrypted), salt.length + iv.length);

    return this.bufferToBase64(result.buffer);
  }

  static async decrypt(payload: string, password: string): Promise<string | false> {
    try {
      const rawData = new Uint8Array(this.base64ToBuffer(payload));
      const salt = rawData.slice(0, this.SALT_SIZE);
      const iv = rawData.slice(this.SALT_SIZE, this.SALT_SIZE + this.IV_SIZE);
      const ciphertext = rawData.slice(this.SALT_SIZE + this.IV_SIZE);

      const key = await this.getKey(password, salt);
      const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        key,
        ciphertext
      );

      return new TextDecoder().decode(decrypted);
    } catch (e) {
      return false;
    }
  }
}
