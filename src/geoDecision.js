export async function readGeoDecision(response) {
  if (!response.ok) throw new Error('Geo policy request failed')
  const payload = await response.json()
  if (typeof payload?.required !== 'boolean') {
    throw new Error('Geo policy response must contain a boolean required value')
  }
  return payload.required
}
