# StudioNet evidence

## Source-matched deployment

- Contract: `0xC4D5230B6181a53827e468deF03b555EeAF43633`
- Deployment transaction: `0xdd34e19e1163cbb713b2fa355be2b7a0abf02d58d41923ad7a61f3c4b1b4db5e`
- Consensus: `MAJORITY_AGREE`, `FINALIZED`
- Deployed/local source SHA-256: `0467ff7150f8719fe324be0571661b48f1e3fca8bb2e15335c311a369f8621f8`
- Exact source match: `true`

## Finalized behavioral proofs

### Security-audit success

- Commitment: `0x47c9795453f3a104fdd605dcd16237f51f9e3e01d74a923841f4cc76f6cd0eae`
- Assessment: `0x9a22f1a7b0ccae2883f8cf03dca75c245f7861094a7b0d1e54d19cddbce15104`
- Stored result: delivery `MATCH`, quality `MATCH`, communication `RELIABLE`, integrity `NONE`, outcome `SUCCESS`
- Record fingerprint: `13761b8a5c1d8716e228b723acbaf3b88f2018869d921b5a74740234e68b697e`

### Translation success and capability isolation

- Commitment: `0x5cc3cc5b10999a17f46bf9f9700e6febb7ef604c9d6ed9c041ce706245f9d63b`
- Assessment: `0x96f1c65f3978089d71cbc042afe83f7ade7b038e11865103be89da0ab5adf220`
- Stored result: delivery `MATCH`, quality `MATCH`, communication `RELIABLE`, integrity `NONE`, outcome `SUCCESS`
- Record fingerprint: `3fe2cb1d0262f45df4847ca602861ee66a386be597cde7f2fc05244fa35548aa`

### Stored unavailable-evidence outcome

- Commitment: `0x6dac3b9ec412dc6ee268f7127bd9478d94748a776383788bd20322fcec0733cb`
- Assessment: `0x3155e98fbd893e12de3a211732a6fd6ee41327d590405f8ef2c99b41430799f4`
- The independently fetched source returned HTTP 404.
- Stored result: evidence `UNAVAILABLE`, material fields `UNKNOWN`, outcome `INCONCLUSIVE`
- Record fingerprint: `2a5d604e24ab38e7ca2dffb581a9197a658f5c49d239e49ea0c294237150649b`

The resulting security-audit profile contains two finalized records: one success and one inconclusive. The unavailable result is the latest assessment, proving a failed fetch is stored and cannot leave an older positive result as the only current memory.
