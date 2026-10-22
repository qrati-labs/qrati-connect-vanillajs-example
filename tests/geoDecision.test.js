import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readGeoDecision } from '../src/geoDecision.js'

test('accepts and returns only successful boolean geo decisions', async () => {
  assert.equal(await readGeoDecision({ ok: true, json: async () => ({ required: true }) }), true)
  assert.equal(await readGeoDecision({ ok: true, json: async () => ({ required: false }) }), false)
})

test('rejects unsuccessful, missing, and non-boolean geo decisions', async () => {
  await assert.rejects(readGeoDecision({ ok: false, json: async () => ({ required: false }) }))
  await assert.rejects(readGeoDecision({ ok: true, json: async () => ({}) }))
  await assert.rejects(readGeoDecision({ ok: true, json: async () => ({ required: 'false' }) }))
})
