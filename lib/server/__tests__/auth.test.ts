import assert from "node:assert/strict"
import { createAuth } from "@/lib/server/auth"

function testRejectsWrongPassword() {
  const auth = createAuth({
    email: "admin@tdg-tea.com",
    password: "correct-horse",
    secret: "test-secret-at-least-32-characters-long!!",
  })
  const result = auth.verifyCredentials("admin@tdg-tea.com", "wrong")
  assert.equal(result.ok, false)
}

function testRejectsUnknownEmail() {
  const auth = createAuth({
    email: "admin@tdg-tea.com",
    password: "correct-horse",
    secret: "test-secret-at-least-32-characters-long!!",
  })
  const result = auth.verifyCredentials("other@tdg-tea.com", "correct-horse")
  assert.equal(result.ok, false)
}

function testAcceptsConfiguredCredentials() {
  const auth = createAuth({
    email: "admin@tdg-tea.com",
    password: "correct-horse",
    secret: "test-secret-at-least-32-characters-long!!",
  })
  const result = auth.verifyCredentials(" admin@tdg-tea.com ", "correct-horse")
  assert.equal(result.ok, true)
  if (result.ok) assert.equal(result.email, "admin@tdg-tea.com")
}

function testSessionRoundTrip() {
  const auth = createAuth({
    email: "admin@tdg-tea.com",
    password: "correct-horse",
    secret: "test-secret-at-least-32-characters-long!!",
  })
  const token = auth.signSession("admin@tdg-tea.com")
  const session = auth.readSession(token)
  assert.ok(session)
  assert.equal(session?.email, "admin@tdg-tea.com")
}

function testTamperedSessionRejected() {
  const auth = createAuth({
    email: "admin@tdg-tea.com",
    password: "correct-horse",
    secret: "test-secret-at-least-32-characters-long!!",
  })
  const token = auth.signSession("admin@tdg-tea.com")
  const broken = `${token.slice(0, -2)}aa`
  assert.equal(auth.readSession(broken), null)
}

function testExpiredSessionRejected() {
  const auth = createAuth({
    email: "admin@tdg-tea.com",
    password: "correct-horse",
    secret: "test-secret-at-least-32-characters-long!!",
    now: () => 1_000_000,
    ttlSeconds: 60,
  })
  const token = auth.signSession("admin@tdg-tea.com")
  const later = createAuth({
    email: "admin@tdg-tea.com",
    password: "correct-horse",
    secret: "test-secret-at-least-32-characters-long!!",
    now: () => 1_000_000 + 120,
    ttlSeconds: 60,
  })
  assert.equal(later.readSession(token), null)
}

function testDifferentSecretRejected() {
  const auth = createAuth({
    email: "admin@tdg-tea.com",
    password: "correct-horse",
    secret: "test-secret-at-least-32-characters-long!!",
  })
  const token = auth.signSession("admin@tdg-tea.com")
  const other = createAuth({
    email: "admin@tdg-tea.com",
    password: "correct-horse",
    secret: "a-completely-different-32-char-secret!!",
  })
  assert.equal(other.readSession(token), null)
}

function run() {
  const cases = [
    testRejectsWrongPassword,
    testRejectsUnknownEmail,
    testAcceptsConfiguredCredentials,
    testSessionRoundTrip,
    testTamperedSessionRejected,
    testExpiredSessionRejected,
    testDifferentSecretRejected,
  ]
  for (const test of cases) {
    test()
    process.stdout.write(`ok ${test.name}\n`)
  }
}

run()
