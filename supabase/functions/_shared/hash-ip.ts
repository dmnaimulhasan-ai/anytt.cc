// Hash IP addresses for privacy protection
// Uses SHA-256 to create a one-way hash that can still be used for rate limiting

export async function hashIP(ip: string): Promise<string> {
  // Use a salt to prevent rainbow table attacks
  const salt = Deno.env.get('SUPABASE_PROJECT_ID') || 'rate-limit-salt';
  const data = new TextEncoder().encode(ip + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  // Return first 32 chars for storage efficiency while maintaining uniqueness
  return hashHex.substring(0, 32);
}
